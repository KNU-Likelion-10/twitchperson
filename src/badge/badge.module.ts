import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgeService } from '@badge/badge.service';
import { BadgeController } from '@badge/badge.controller';
import { Badge } from '@badge/badge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Badge])],
  providers: [BadgeService],
  controllers: [BadgeController],
})
export class BadgeModule {}
