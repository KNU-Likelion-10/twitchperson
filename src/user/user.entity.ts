import {
  PrimaryGeneratedColumn, Column, Entity, OneToMany, JoinColumn,
} from 'typeorm';
import { UserToBadge } from './user-badge';

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
  
  @Column({ default: 0, nullable: false})
    exp: number;
  
  @Column({ default: 1, nullable: false})
    level: number;

  @Column({ default: false, nullable: false})
    streamer: boolean;

  @OneToMany((type) => UserToBadge, (badge) => badge.badge, {
    eager: true
  })
  @JoinColumn()
    badges: UserToBadge[];
}
