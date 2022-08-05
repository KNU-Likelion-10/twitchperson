import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@auth/guard/jwt-access-auth.guard';
import { UserService } from '@user/user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userServcie: UserService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('/:id')
    getBadge(@Req() req, @Param('id') id: number) {
      const user = req.user;
      this.userServcie.getBadge(id, user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getInfo(@Req() req) {
      const user = req.user;
      return this.userServcie.getInfo(user);
    }

}
