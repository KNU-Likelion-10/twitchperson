import {
  PrimaryGeneratedColumn, Entity, ManyToOne,
} from 'typeorm';
import { User } from '@user/user.entity';

@Entity()
export class UserToStreamer {
  @PrimaryGeneratedColumn()
    id: number;

  @ManyToOne((type) => User, { onDelete: 'CASCADE' })
    streamer: User;
  
  @ManyToOne((type) => User, { onDelete: 'CASCADE' })
    follow: User;
}
