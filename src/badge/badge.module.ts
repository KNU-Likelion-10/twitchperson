import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgeService } from '@src/badge/badge.service';
import { BadgeController } from '@src/badge/badge.controller';
import { Badge } from '@src/badge/badge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Badge])],
  providers: [BadgeService],
  controllers: [BadgeController],
})
export class BadgeModule {}
