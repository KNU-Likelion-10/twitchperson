import { Badge } from '@badge/badge.entity';
import {
  PrimaryGeneratedColumn, Entity, ManyToOne,
} from 'typeorm';
import { User } from '@user/user.entity';

@Entity()
export class UserToBadge {
  @PrimaryGeneratedColumn()
    id: number;

  @ManyToOne((type) => Badge)
    badge: Badge;
  
  @ManyToOne((type) => User)
    user: User;
}
