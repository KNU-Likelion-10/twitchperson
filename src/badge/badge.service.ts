import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Badge } from '@badge/badge.entity';
import { CreateBadgeDto } from '@badge/create-badge.dto';
import { UpdateBadgeDto } from '@badge/update-badge.dto';
import { Image } from '@image/image.entity';
import { User } from '@user/user.entity';
import { UserToBadge } from '@user/user-badge';
import { Comment } from '@src/comment/comment.entity';

@Injectable()
export class BadgeService {
  
  constructor(
    @InjectRepository(Badge)
      private readonly badgeRepository: Repository<Badge>,
    @InjectRepository(Image)
      private readonly imageRepository: Repository<Image>,
    @InjectRepository(UserToBadge)
      private readonly userToBadgeRepository: Repository<UserToBadge>,
    @InjectRepository(Comment)
      private readonly commentRepository: Repository<Comment>
  ) {}

  findAll(page: number, size: number) {
    return this.badgeRepository.findAndCount({
      take: size,
      skip: size * page,
      relations: ['image']
    });
  }

  async findAllCreated(page: number, size: number, author: User) {
    return await this.badgeRepository.findAndCount({
      take: size,
      skip: size * page,
      relations: ['image', 'user'],
      where: { user: { user: { id: author.id }, isAuthor: true } }
    });
  }

  findOne(id: number) {
    return this.badgeRepository.findOne({
      where: { id },
      relations: ['image', 'comments', 'comments.author'],
      order: { comments: { createdAt: "ASC" } }
    });
  }

  getComments(badgeId: number) {
    return this.commentRepository.createQueryBuilder('comment')
      .where({ badge: { id: badgeId }})
      .orderBy('comment.createdAt', 'ASC')
      .leftJoinAndSelect('comment.author', 'authors')
      .getMany();
  }

  async createBadge(badgeDTO: CreateBadgeDto, file, user: User) {
    const image = await this.imageRepository.save({
      name: file.originalname,
      uuid: file.location.substring(44),
      url: file.location,
      mimetype: file.mimetype,
    });

    const badge = await this.badgeRepository.save({
      name: badgeDTO.name,
      desc: badgeDTO.desc,
      condition: badgeDTO.condition,
      exp: +badgeDTO.exp,
      image,
    });

    const isExit = await this.userToBadgeRepository.findOne({
      where: { user: { id: user.id }, badge: { id: badge.id }}
    });
    
    if(isExit) {
      return isExit;
    }
    await this.userToBadgeRepository.save({ user: user, badge: badge, isAuthor: true });

    return await this.badgeRepository.findOne({
      where: { id: badge.id},
      relations: ['user', 'comments']
    })
  }

  async updateBadge(id: number, badgeDTO: UpdateBadgeDto, file) {
    const data: Badge = await this.badgeRepository.findOne({
      where: { id },
    });

    if (data === null) {
      return {
        status: 400,
        statusMsg: '해당 뱃지는 없습니다.',
      };
    }

    if (file !== undefined) {
      const image = await this.imageRepository.save({
        name: file.originalname,
        uuid: file.location.substring(44),
        url: file.location,
        mimetype: file.mimetype,
      });

      data.image = image;
    }

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
