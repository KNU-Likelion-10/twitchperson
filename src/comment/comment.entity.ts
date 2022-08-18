import {
    PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany,
  } from 'typeorm';
import { BaseEntity } from '@src/baseEntity'
import { Badge } from '@badge/badge.entity';
import { User } from '@user/user.entity';
  
  @Entity()
  export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
      id: number;
  
    @Column()
      comment: string;
    
    @Column({ default: 0 })
      like: number;

    @Column({ default: 0, nullable: false })
      unlike: number;
      
    @ManyToOne((type) => User, (user) => user.id)
      author: User;

    @ManyToOne((type) => Badge, (badge) => badge.id)
      badge: Badge;
    
    @OneToMany((type) => Comment, (comment) => comment.parentComment, {
      cascade: true
    })
      comments: Comment[];
    
    @ManyToOne((type) => Comment, (comment) => comment.comments, {
      onDelete: 'CASCADE'
    })
      parentComment: Comment;

}
  