import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgeModule } from '@badge/badge.module';
import { UserModule } from '@user/user.module';
import { CommentController } from '@comment/comment.controller';
import { CommentService } from '@comment/comment.service';
import { Comment } from '@comment/comment.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Comment]),
        UserModule,
        BadgeModule
    ],
    providers: [CommentService],
    exports: [CommentService],
    controllers: [CommentController]
})
export class CommentModule {}
