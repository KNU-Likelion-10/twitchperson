import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Badge } from '@badge/badge.entity';
import { User } from '@user/user.entity';
import { CreateCommentDto } from '@comment/create-comment.dto';
import { Comment } from '@comment/comment.entity';


@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>
    ){}

    async createComment(badge: Badge, user: User, createDTO: CreateCommentDto) {
        
        return await this.commentRepository.save({
            comment: createDTO.comment,
            author: user,
            badge: badge
        });
    }
    
    async addComment(commentId: number, user: User, createDTO: CreateCommentDto) {
        
        const parentComment: Comment = await this.commentRepository.findOne({
            where: { id: commentId }
        });

        if(parentComment === null) {
            return {
                status: 400,
                statusMsg: 'Comment Not Found',
            }
        }

        const comment: Comment = await this.commentRepository.save({
            comment: createDTO.comment,
            author: user,
            parentComment: parentComment
        });
                
        return this.commentRepository.findOne({
            where: { id: commentId },
            relations: ['author', 'badge', 'comments', 'parentComment']
        });
    }

    async updateComment(commentId: number, user: User, createDTO: CreateCommentDto) {
        
        try {
            await this.commentRepository.createQueryBuilder()
                .update(Comment)
                .set({ comment: createDTO.comment })
                .where( { id: commentId, author: { id: user.id } })
                .execute();

            return this.commentRepository.findOne({
                where: { id: commentId },
                relations: ['author', 'badge', 'comments', 'parentComment']
            });
        } catch (e) {
            return {
                status: 400,
                statusMsg: 'Comment Not Found',
            }
        }
        
    }

    async findOne(commentId: number) {
        const comment: Comment = await this.commentRepository.findOne({
            where: { id: commentId },
            relations: ['author', 'badge', 'comments', 'parentComment']
        });

        if(comment === null) {
            return {
                status: 400,
                statusMsg: 'Comment Not Found',
            }
        }

        return comment;
    }

    async delteOne(commentId: number, user: User) {
        try {
            await this.commentRepository.createQueryBuilder()
                .delete()
                .where( { id: commentId, author: { id: user.id } })
                .execute();

            return {
                data: { id: commentId },
                status: 201,
                statusMsg: 'deleted successfully',
            };
        } catch (e) {
            console.log(e);
            return {
                status: 400,
                statusMsg: 'Comment Not Found',
            }
        }
    }
}