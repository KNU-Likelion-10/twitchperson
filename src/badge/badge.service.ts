import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Badge } from '@badge/badge.entity';
import { CreateBadgeDto } from '@badge/create-badge.dto';
import { UpdateBadgeDto } from '@badge/update-badge.dto';

@Injectable()
export class BadgeService {
  constructor(
        @InjectRepository(Badge)
        private readonly badgeRepository: Repository<Badge>,
  ) {}

  findAll(page: number) {
    return this.badgeRepository.findAndCount({
      take: 5,
      skip: 5 * (page - 1),
    });
  }

  find(id: number) {
    return this.badgeRepository.findOne({
      where: { id },
    });
  }

  async createBadge(badgeDTO: CreateBadgeDto): Promise<Badge> {
    return await this.badgeRepository.save(badgeDTO);
  }

  async updateBadge(id: number, badgeDTO: UpdateBadgeDto): Promise<Badge> {
    const data: Badge = await this.badgeRepository.findOne({
      where: [{ id }],
    });

    if (badgeDTO.name) {
      data.name = badgeDTO.name;
    }

    if (badgeDTO.desc) {
      data.desc = badgeDTO.desc;
    }

    if (badgeDTO.codition) {
      data.codition = badgeDTO.codition;
    }

    if (badgeDTO.exp) {
      data.exp = badgeDTO.exp;
    }

    return await this.badgeRepository.save(data);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.badgeRepository.delete({ id });
  }
}
