import { Comment } from '@src/comment/comment.entity';
import {
  PrimaryGeneratedColumn, Column, Entity, OneToMany, JoinColumn, OneToOne,
} from 'typeorm';
import { UserToBadge } from './user-badge';
import { UserToStreamer } from './user-stremer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    userId: string;

  @Column({ default: '' })
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

  @Column({ default: 0, nullable: false })
    exp: number;

  @Column({ default: 1, nullable: false })
    level: number;

  @Column({ default: false, nullable: false })
    isStreamer: boolean;

  @OneToMany((type) => UserToBadge, (badge) => badge.user, {
    eager: true, cascade: true,
  })
    badges: UserToBadge[];

  // 내 입장에서의 구독한 사람들
  @OneToMany((type) => UserToStreamer, (userToStreamer) => userToStreamer.follower, {
    eager: true, cascade: true,
  })
    follows: UserToStreamer[];
  
  // 스트리머 입장에서 나를 구독한 사람들
  @OneToMany((type) => UserToStreamer, (userToStreamer) => userToStreamer.streamer, {
    eager: true, cascade: true,
  })
    followers: UserToStreamer[];
  
  @OneToMany((type) => Comment, (comment) => comment.author, {
    eager: true, cascade: true,
  })
    comments: Comment[];

}
