import { Comment } from '@src/comment/comment.entity';
import {
  PrimaryGeneratedColumn, Column, Entity, OneToMany, JoinColumn,
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

  // @OneToMany((type) => UserToStreamer, (streamer) => streamer.streamer, {
  //   eager: true, cascade: true,
  // })
  //   streamer: UserToStreamer[];

  @OneToMany((type) => UserToStreamer, (follow) => follow.follow, {
    eager: true, cascade: true,
  })
    follows: UserToStreamer[];
  
  @OneToMany((type) => Comment, (comment) => comment.author, {
    eager: true, cascade: true,
  })
    comments: Comment[];
  
}
