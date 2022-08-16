import {
  Body, Controller, Get, Query, Post, Param, Delete, Patch, UseGuards, Req, UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@auth/guard/jwt-access-auth.guard';
import { BadgeService } from '@badge/badge.service';
import { CreateBadgeDto } from '@badge/create-badge.dto';
import { UpdateBadgeDto } from '@badge/update-badge.dto';
import { multerOptions } from '@image/multerOption';

@Controller('badge')
export class BadgeController {
  constructor(
    private readonly badgeservice: BadgeService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @Post()
  async createBadge(@Req() req, @UploadedFile() file, @Body() badgeDTO: CreateBadgeDto) {
    return this.badgeservice.createBadge(badgeDTO, file);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @Patch('/:id')
  updateBadge(@Param('id') id: number, @UploadedFile() file, @Body() badgeDTO: UpdateBadgeDto) {
    return this.badgeservice.updateBadge(id, badgeDTO, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get('findAll')
  findAll(@Query('page') page: number, @Query('size') size: number) {
    return this.badgeservice.findAll(page, size);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  find(@Param('id') id: number) {
    return this.badgeservice.find(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async remove(@Param('id') id: number) {
    const response = await this.badgeservice.remove(id);

    if (response.affected === 1) {
      return {
        data: { id },
        status: 201,
        statusMsg: 'deleted successfully',
      };
    }
    return {
      data: { id },
      status: 400,
      statusMsg: 'deleted failed',
    };
  }
  
}
