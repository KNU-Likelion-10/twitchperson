import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Badge } from '@badge/badge.entity';
import { User } from '@user/user.entity';
import { UserToBadge } from '@user/user-badge';
import { UserToStreamer } from '@user/user-stremer';
import { twitchInfo } from '@auth/auth.controller';
import axios from 'axios';

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
        private readonly userToStreamerRepository: Repository<UserToStreamer>
    ){}

    async getBadge(id: number, userInfo) {

        // 일단 id 값으로 뱃지가 있는지 조회를 해야함. Promise< >
        const badge = await this.badgeRepository.findOne({ where: { id } });
        // user를 조회해야합니다.
        const user = await this.userRepository.findOne({ 
            where: { id: userInfo.id },
        });
        
        // 뱃지가 있으니, 이걸 User가지고 있어야합니다.
        if(badge && user) {
          
            const userToBadge = await this.userToBadgeRepository.save({ user: user, badge: badge});

            if(user.badges == undefined) {
                user.badges = [userToBadge];
            } else {
                user.badges.push(userToBadge);
            }
            // 경험치를 넣어줘야합니다.
            user.exp += badge.exp;
            if(user.exp >= 50) {
                user.level += 1;
                user.exp -= 50;
            }

            if(user.badges == undefined){
                user.badges = [ userToBadge ];
            } else {
                user.badges.push(userToBadge);
            }
            
            this.userRepository.save(user);

        }
        
    }

    async getInfo(userInfo: any) {
        return await this.userRepository.findOne({ 
            where: { id: userInfo.id },
        });
    }

    async signUp(info: twitchInfo) {
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

    async getStreamer(user: User, info: twitchInfo) {
        // axios로 follow 정보 조회
        const followInfo = await axios.get(`https://api.twitch.tv/helix/users/follows?from_id=${info.profile.id}`, {
            headers: {
                Authorization: 'Bearer ' + info.accessToken,
                'Client-Id': 'rfwqkkm4uyvmmh0koult0arbpmfbcu'
            }
        });

        const infos: followInfo = followInfo.data;

        console.log(infos.total, infos.data[0]);

        const follows: UserToStreamer[] = [];

        for(let i=0; i<infos.total; i++) {
            const temp = await axios.get(`https://api.twitch.tv/helix/users?id=${infos.data[i]['to_id']}`, {
                headers: {
                    'Authorization': `Bearer ${info.accessToken}`,
                    'Client-Id': 'rfwqkkm4uyvmmh0koult0arbpmfbcu'
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
            console.log(streamerInfo);

            const streamer = await this.userRepository.save({
                userId: streamerInfo.id,
                email: streamerInfo?.email,
                userName: streamerInfo.display_name,
                type: streamerInfo.type,
                broadcasterType: streamerInfo.broadcaster_type,
                description: streamerInfo.description,
                profileImage: streamerInfo.profile_image_url,
            });

            console.log(streamer)

            const userToStremer = await this.userToStreamerRepository.save({
                streamer: streamer,
                follow: user
            });
            
            follows.push(userToStremer);
        }
        user.streamer = follows;
    }
}
