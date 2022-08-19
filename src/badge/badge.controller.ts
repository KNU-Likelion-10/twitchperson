import {
  Body, Controller, Get, Query, Post, Param, Delete, Patch, UseGuards, Req, UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@auth/guard/jwt-access-auth.guard';
import { BadgeService } from '@badge/badge.service';
import { UserService } from '@user/user.service';
import { CreateBadgeDto } from '@badge/create-badge.dto';
import { UpdateBadgeDto } from '@badge/update-badge.dto';
import { multerOptions } from '@image/multerOption';

@Controller('badge')
export class BadgeController {
  constructor(
    private readonly badgeservice: BadgeService,
    private readonly userService: UserService
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @Post()
  async createBadge(@Req() req, @UploadedFile() file, @Body() badgeDTO: CreateBadgeDto) {
    
    const author = await this.userService.findOne(req.user.id);
    if(author === null) {
        return {
            status: 400,
            statusMsg: 'User Not Found',
        }
    }

    return this.badgeservice.createBadge(badgeDTO, file, author);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @Patch('/:id')
  updateBadge(@Param('id') id: number, @UploadedFile() file, @Body() badgeDTO: UpdateBadgeDto) {
    return this.badgeservice.updateBadge(id, badgeDTO, file);
  }

  @Get('findAll')
  findAll(@Query('page') page: number, @Query('size') size: number) {
    return this.badgeservice.findAll(page, size);
  }

  @UseGuards(JwtAuthGuard)
  @Get('findAll-created')
  async findAllCreated(@Req() req, @Query('page') page: number, @Query('size') size: number) {
    const author = await this.userService.findOne(req.user.id);
    if(author === null) {
        return {
            status: 400,
            statusMsg: 'User Not Found',
        }
    }
    return this.badgeservice.findAllCreated(page, size, author);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.badgeservice.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async remove(@Param('id') id: number) {
    const response = await this.badgeservice.remove(id);

    return {
        data: { id },
        status: 201,
        statusMsg: 'deleted successfully',
    };
    
  }
  
  @Get(':badge/comment')
  getComments(@Param('badge') badgeId: number) {
    return this.badgeservice.getComments(badgeId);
  }

}
