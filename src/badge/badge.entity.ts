import {
  PrimaryGeneratedColumn, Column, Entity, OneToMany, OneToOne, JoinColumn,
} from 'typeorm';
import { BaseEntity } from '@src/baseEntity';
import { UserToBadge } from '@user/user-badge';
import { Image } from '@image/image.entity';
import { Comment } from '@comment/comment.entity';
import { User } from '@user/user.entity';

@Entity()
export class Badge extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ nullable: false })
    name: string;

  @Column({ nullable: false })
    desc: string;

  @Column({ nullable: false })
    condition: string;

  @Column({ default: 0, nullable: false })
    exp: number;

  @Column({ default: 0, nullable: false })
    like: number;

  @Column({ default: 0, nullable: false })
    unlike: number;

  @OneToOne((type) => Image, (Image) => Image.id)
  @JoinColumn()
    image: Image;

  @OneToMany((type) => UserToBadge, (badge) => badge.badge, {
    onDelete: 'CASCADE',
  })
    user: UserToBadge[];
  
  @OneToMany((type) => Comment, (comment) => comment.badge, {
    onDelete: 'CASCADE'
  })
    comments: Comment[];

}
