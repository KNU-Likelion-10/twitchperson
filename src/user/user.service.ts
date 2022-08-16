import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Queue } from 'bull';
import { twitchInfo } from '@auth/auth.controller';
import { Badge } from '@badge/badge.entity';
import { User } from '@user/user.entity';
import { UserToBadge } from '@user/user-badge';
import { UserToStreamer } from '@user/user-stremer';

type followInfo = {
    total: number,
        data: {
            from_id: string,
            from_login: string,
            from_name: string,
            to_id: string,
            to_login: string,
            to_name: string,
            followed_at: Date
        }[]
};

@Injectable()
export class UserService {
           
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Badge)
        private readonly badgeRepository: Repository<Badge>,
        @InjectRepository(UserToBadge)
        private readonly userToBadgeRepository: Repository<UserToBadge>,
        @InjectRepository(UserToStreamer)
        private readonly userToStreamerRepository: Repository<UserToStreamer>,
        @InjectQueue('streamer')
        private readonly streamerQueue: Queue
    ){}

    async getBadge(id: number, userInfo) {

        // 일단 id 값으로 뱃지가 있는지 조회를 해야함. Promise< >
        const badge: Badge = await this.badgeRepository.findOne({ where: { id } });
        // user를 조회해야합니다.
        const user: User = await this.userRepository.findOne({ 
            where: { userId: userInfo.id },
        });
        
        // 뱃지가 있으니, 이걸 User가지고 있어야합니다.
        if(badge && user) {
          
            await this.userToBadgeRepository.save({ user: user, badge: badge });

            // 경험치를 넣어줘야합니다.
            let exp = user.exp + badge.exp;
            let level = user.level;
            if(exp >= 50) {
                level += 1;
                exp -= 50;
            }
            
            await this.userRepository.createQueryBuilder()
                .update(User)
                .set({
                    exp: exp,
                    level: level
                })
                .where({ userId: userInfo.id})
                .execute();

            return await this.userRepository.findOne({ 
                where: { userId: userInfo.id },
                relations: ["follows", "follows.streamer", "badges", "badges.badge"]
            });
        }
        
    }

    async getInfo(userInfo: any) {
        const user = await this.userRepository.findOne({ 
            where: { userId: userInfo.id },
            relations: ["follows", "follows.streamer", "badges", "badges.badge"]
        });
        
        return user;
    }

    async signUp(info: twitchInfo) {
        const user = await this.userRepository.findOne({ where: { userId: info.profile.id} });

        if(user !== null) {
            return user;
        }

        return await this.userRepository.save({
          userId: info.profile.id,
          email: info.profile.email,
          userName: info.profile.display_name,
          type: info.profile.type,
          broadcasterType: info.profile.broadcaster_type,
          description: info.profile.description,
          profileImage: info.profile.profile_image_url,
        });
    }

    async registerStreamer(user: User, info: twitchInfo) {
        // axios로 follow 정보 조회
        const followInfo = await axios.get(`https://api.twitch.tv/helix/users/follows?from_id=${info.profile.id}&first=100`, {
            headers: {
                Authorization: 'Bearer ' + info.accessToken,
                'Client-Id': process.env.twitch_secret
            }
        });

        const infos: followInfo = followInfo.data;

        for(let i=0; i<infos.total; i++) {
            
            if(infos.data[i] === undefined) continue;

            const temp = await axios.get(`https://api.twitch.tv/helix/users?id=${infos.data[i]['to_id']}`, {
                headers: {
                    'Authorization': `Bearer ${info.accessToken}`,
                    'Client-Id': process.env.twitch_secret
                },
            });

            const streamerInfo: {
                'id': string,
                'login': string,
                'display_name': string,
                'type': string,
                'broadcaster_type': string,
                'description': string,
                'profile_image_url': string,
                'offline_image_url': string,
                'view_count': number,
                'email': string,
                'created_at': string,
                'provider': string
            } = temp.data.data[0];

            let streamer = await this.userRepository.findOne({
                where: { userId: streamerInfo.id }
            });

            if(streamer) continue;

            streamer = await this.userRepository.save({
                userId: streamerInfo.id,
                email: streamerInfo?.email,
                userName: streamerInfo.display_name,
                type: streamerInfo.type,
                broadcasterType: streamerInfo.broadcaster_type,
                description: '',
                profileImage: streamerInfo.profile_image_url,
                isStreamer: true
            });

            const temp2 = await this.userToStreamerRepository.save({
                streamer: streamer,
                follow: user
            });
        }
    }

    updateToken(accessToken: string, refreshToken: string) {
        throw new Error('Method not implemented.');
    }

    async addStreamer(user: User, info: twitchInfo) {
        await this.streamerQueue.add('create', {
            user: user,
            info: info
        });
    }

    findAllStreamer(page: number, size: number){
        return this.userRepository.findAndCount({
            where: { isStreamer: true },
            take: size,
            skip: size * (page - 1),
        });
    }
}
