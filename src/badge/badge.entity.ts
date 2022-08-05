import {
  PrimaryGeneratedColumn, Column, Entity, OneToMany,
} from 'typeorm';
import { BaseEntity } from '@src/baseEntity';
import { UserToBadge } from '@user/user-badge';

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

  @Column({ default: 0 })
    like: number;

  @Column({ default: 0, nullable: false })
    unlike: number;

  @OneToMany((type) => UserToBadge, (badge) => badge.user)
    user: UserToBadge[];
}
