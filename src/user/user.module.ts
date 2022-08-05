import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Badge } from '@badge/badge.entity';
import { User } from '@user/user.entity';
import { UserController } from '@user/user.controller';
import { UserService } from '@user/user.service';
import { UserToBadge } from '@user/user-badge';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Badge, UserToBadge]),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
