import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Badge } from '@badge/badge.entity';
import { UserToBadge } from '@user/user-badge';
import { User } from '@user/user.entity';

@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Badge)
        private readonly badgeRepository: Repository<Badge>,
        @InjectRepository(UserToBadge)
        private readonly userToBadgeRepository: Repository<UserToBadge>
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
}
