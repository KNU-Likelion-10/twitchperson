import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@auth/guard/jwt-access-auth.guard';
import { BadgeService } from '@badge/badge.service';
import { UserService } from '@user/user.service';
import { CommentService } from '@comment/comment.service';
import { CreateCommentDto } from '@comment/create-comment.dto';

@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
        private readonly userService: UserService,
        private readonly badgeService: BadgeService
    ){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createComment(@Req() req, @Query('badge') badgeId: number, @Body() createDTO: CreateCommentDto){

        const user = await this.userService.findOne(req.user.id);
        if(user === null) {
            return {
                status: 400,
                statusMsg: 'User Not Found',
            }
        }

        const badge = await this.badgeService.findOne(badgeId);
        if(badge === null) {
            return {
                status: 400,
                statusMsg: 'Badge Not Found',
            }
        }

        return this.commentService.createComment(badge, user, createDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id')
    async addComment(@Req() req, @Param('id') commentId: number, @Body() createDTO: CreateCommentDto){

        const user = await this.userService.findOne(req.user.id);
        if(user === null) {
            return {
                status: 400,
                statusMsg: 'User Not Found',
            }
        }

        return this.commentService.addComment(commentId, user, createDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateComment(@Req() req, @Param('id') commentId: number, @Body() createDTO: CreateCommentDto){

        const user = await this.userService.findOne(req.user.id);
        if(user === null) {
            return {
                status: 400,
                statusMsg: 'User Not Found',
            }
        }

        return this.commentService.updateComment(commentId, user, createDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Req() req, @Param('id') commentId: number){
        return this.commentService.findOne(commentId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delteOne(@Req() req, @Param('id') commentId: number){
        const user = await this.userService.findOne(req.user.id);
        
        if(user === null) {
            return {
                status: 400,
                statusMsg: 'User Not Found',
            }
        }

        return this.commentService.delteOne(commentId, user);
    }
}
