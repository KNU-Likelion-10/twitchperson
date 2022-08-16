import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Badge } from '@badge/badge.entity';
import { User } from '@user/user.entity';
import { UserController } from '@user/user.controller';
import { UserService } from '@user/user.service';
import { UserToBadge } from '@user/user-badge';
import { UserToStreamer } from './user-stremer';
import { BullModule } from '@nestjs/bull';
import { UserConsumer } from './user.consumer';
import { config } from 'dotenv';

config();
@Module({
    imports: [
        TypeOrmModule.forFeature([User, Badge, UserToBadge, UserToStreamer]),
        BullModule.registerQueue({
            name: 'streamer',
            redis: {
                host: process.env.redis_address,
                port: +process.env.redis_port,
            },
        })
    ],
    controllers: [UserController],
    providers: [UserService, UserConsumer],
    exports: [UserService]
})
export class UserModule {}
