import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Badge } from '@badge/badge.entity';
import { CreateBadgeDto } from '@badge/create-badge.dto';
import { UpdateBadgeDto } from '@badge/update-badge.dto';
import { Image } from '@image/image.entity';

@Injectable()
export class BadgeService {
  
  constructor(
    @InjectRepository(Badge)
      private readonly badgeRepository: Repository<Badge>,
    @InjectRepository(Image)
      private readonly imageRepository: Repository<Image>
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

  async createBadge(badgeDTO: CreateBadgeDto, file): Promise<Badge> {
    const image = await this.imageRepository.save({
      name: file.originalname,
      uuid: file.location.substring(44),
      url: file.location,
      mimetype: file.mimetype
    })
    return await this.badgeRepository.save({
      name: badgeDTO.name,
      desc: badgeDTO.desc,
      condition: badgeDTO.condition,
      exp: +badgeDTO.exp,
      image: image
    });
  }

  async updateBadge(id: number, badgeDTO: UpdateBadgeDto): Promise<Badge> {
    const data: Badge = await this.badgeRepository.findOne({
      where: { id },
    });

    if (badgeDTO.name) {
      data.name = badgeDTO.name;
    }

    if (badgeDTO.desc) {
      data.desc = badgeDTO.desc;
    }

    if (badgeDTO.condition) {
      data.condition = badgeDTO.condition;
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
