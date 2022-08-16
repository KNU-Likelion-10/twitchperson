import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { Badge } from '@badge/badge.entity';
import { UserController } from '@user/user.controller';
import { UserService } from '@user/user.service';
import { User } from '@user/user.entity';
import { UserToBadge } from '@user/user-badge';
import { UserToStreamer } from '@user/user-stremer';
import { UserConsumer } from '@user/user.consumer';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Badge, UserToBadge, UserToStreamer]),
        BullModule.registerQueue({
            name: 'streamer',
            redis: {
                host: 'localhost',
                port: 6379,
            },
        })
    ],
    controllers: [UserController],
    providers: [UserService, UserConsumer],
    exports: [UserService]
})
export class UserModule {}
