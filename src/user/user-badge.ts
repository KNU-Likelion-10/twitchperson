import {
  PrimaryGeneratedColumn, Entity, ManyToOne,
} from 'typeorm';
import { Badge } from '@badge/badge.entity';
import { User } from '@user/user.entity';

@Entity()
export class UserToBadge {
  @PrimaryGeneratedColumn()
    id: number;

  @ManyToOne((type) => Badge, { onDelete: 'CASCADE' })
    badge: Badge;

  @ManyToOne((type) => User, { onDelete: 'CASCADE' })
    user: User;
}
