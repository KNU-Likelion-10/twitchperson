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
  async getBadge(@Req() req, @Param('id') id: number) {
    const { user } = req;
    return await this.userService.getBadge(id, user);
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
}
