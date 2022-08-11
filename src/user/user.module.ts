import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Badge } from '@badge/badge.entity';
import { User } from '@user/user.entity';
import { UserController } from '@user/user.controller';
import { UserService } from '@user/user.service';
import { UserToBadge } from '@user/user-badge';
import { UserToStreamer } from './user-stremer';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Badge, UserToBadge, UserToStreamer]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
