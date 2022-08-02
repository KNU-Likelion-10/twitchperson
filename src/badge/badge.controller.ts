import {
  Body, Controller, Get, Query, Post, Param, Delete, Patch, UseGuards, Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '@src/auth/guard/jwt-access-auth.guard';
import { BadgeService } from '@src/badge/badge.service';
import { CreateBadgeDto } from '@src/badge/create-badge.dto';
import { UpdateBadgeDto } from '@src/badge/update-badge.dto';

@Controller('badge')
export class BadgeController {
  constructor(private readonly badgeservice: BadgeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createBadge(@Req() req, @Body() badgeDTO: CreateBadgeDto) {
    return this.badgeservice.createBadge(badgeDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateBadge(@Param('id') id: number, @Body() badgeDTO: UpdateBadgeDto) {
    return this.badgeservice.updateBadge(id, badgeDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('findAll')
  findAll(@Query('page') page: number) {
    return this.badgeservice.findAll(page);
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
