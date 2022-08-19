import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@auth/guard/jwt-access-auth.guard';
import { UserService } from '@user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('take-badge/:id')
  async takeBadge(@Req() req, @Param('id') id: number) {
    const { user } = req;
    return await this.userService.takeBadge(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('like-badge/:id')
  async likeBadge(@Req() req, @Param('id') id: number, @Query('like') like: boolean) {
    const { user } = req;
    return await this.userService.likeBadge(id, user, like);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/findAll-Badge')
  async findAllBadge(@Req() req) {
    const { user } = req;

    return await this.userService.findAllBadge(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getInfo(@Req() req) {
    const { user } = req;
    return this.userService.getInfo(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('findAll')
  getStreamers(@Query('page') page: number, @Query('size') size: number) {
    return this.userService.findAllStreamer(page, size);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/most')
  addMost(@Req() req, @Query('num') num: 1 | 2 | 3, @Query('streamer') streamerNum: number) {
    const { user } = req;

    return this.userService.addMost(num, user, streamerNum);
  }

}
