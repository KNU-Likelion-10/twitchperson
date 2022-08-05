import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgeService } from '@badge/badge.service';
import { BadgeController } from '@badge/badge.controller';
import { Badge } from '@badge/badge.entity';
import { AuthModule } from '@src/auth/auth.module';
import { User } from '@src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Badge, User]), AuthModule],
  providers: [BadgeService],
  controllers: [BadgeController],
})
export class BadgeModule {}
