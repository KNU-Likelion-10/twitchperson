import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@auth/auth.module';
import { BadgeController } from '@badge/badge.controller';
import { BadgeService } from '@badge/badge.service';
import { Badge } from '@badge/badge.entity';
import { User } from '@user/user.entity';
import { ImageModule } from '@image/image.module';
import { Image } from '@image/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Badge, User, Image]),
    AuthModule,
    ImageModule,
  ],
  providers: [BadgeService],
  controllers: [BadgeController],
})
export class BadgeModule {}
