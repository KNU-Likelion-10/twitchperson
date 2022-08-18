import {
  PrimaryGeneratedColumn, Entity, ManyToOne, Column
} from 'typeorm';
import { Badge } from '@badge/badge.entity';
import { User } from '@user/user.entity';

@Entity()
export class UserToBadge {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ nullable: true})
    like: boolean;
  
  @Column({ default: false, nullable: false})
    isGain: boolean;
  
  @Column({ default: false, nullable: false})
    isAuthor: boolean;

  @ManyToOne((type) => Badge, { onDelete: 'CASCADE' })
    badge: Badge;

  @ManyToOne((type) => User, { onDelete: 'CASCADE' })
    user: User;
}
