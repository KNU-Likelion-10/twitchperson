import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@auth/auth.module';
import { BadgeController } from '@badge/badge.controller';
import { BadgeService } from '@badge/badge.service';
import { Badge } from '@badge/badge.entity';
import { User } from '@user/user.entity';
import { ImageModule } from '@image/image.module';
import { Image } from '@image/image.entity';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Badge, User, Image]),
    AuthModule,
    ImageModule,
    UserModule,
  ],
  providers: [BadgeService],
  controllers: [BadgeController],
  exports: [BadgeService]
})
export class BadgeModule {}
