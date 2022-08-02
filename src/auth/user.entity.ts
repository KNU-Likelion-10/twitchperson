import { Badge } from '@src/badge/badge.entity';
import {
  PrimaryGeneratedColumn, Column, Entity, OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    userId: string;

  @Column()
    email: string;

  @Column()
    userName: string;

  @Column()
    type: string;

  @Column()
    broadcasterType: string;

  @Column()
    description: string;

  @Column()
    profileImage: string;

  @OneToMany((type) => Badge, (badge) => badge.user)
    badges: Badge[];
}
