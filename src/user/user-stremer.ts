import {
  PrimaryGeneratedColumn, Entity, ManyToOne, Column,
} from 'typeorm';
import { User } from '@user/user.entity';

@Entity()
export class UserToStreamer {
  @PrimaryGeneratedColumn()
    id: number;
  
  @Column({default: false, nullable: true})
    most: boolean;
  
  @Column({default: -1, nullable: true})
    number: number;

  // 나를 구독한 사람
  @ManyToOne((type) => User, { onDelete: 'CASCADE' })
    follower: User;

  // 스트리머
  @ManyToOne((type) => User, { onDelete: 'CASCADE' })
    streamer: User;
}
