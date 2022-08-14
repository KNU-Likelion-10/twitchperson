import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgeService } from '@badge/badge.service';
import { BadgeController } from '@badge/badge.controller';
import { Badge } from '@badge/badge.entity';
import { AuthModule } from '@auth/auth.module';
import { User } from '@user/user.entity';
import { ImageModule } from '@image/image.module';
import { Image } from '@image/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Badge, User, Image]),
    AuthModule,
    ImageModule
  ],
  providers: [BadgeService],
  controllers: [BadgeController],
})
export class BadgeModule {}
