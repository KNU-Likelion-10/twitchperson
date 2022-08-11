import {
  Controller, Get, Req, Res, UseGuards,
} from '@nestjs/common';
import { RefreshService } from '@refresh/auth.service';
import { AuthService } from '@auth/auth.service';
import { TwitchAuthGuard } from '@auth/guard/twitch-auth.guard';
import { JwtRefreshGuard } from '@src/auth-refresh/guard/jwt-refresh-auth.guard';
import { User } from '@src/user/user.entity';
import { UserService } from '@src/user/user.service';

export type twitchInfo = {
    accessToken: string,
    refreshToken: string,
    profile: {
        'id': string,
        'login': string,
        'display_name': string,
        'type': string,
        'broadcaster_type': string,
        'description': string,
        'profile_image_url': string,
        'offline_image_url': string,
        'view_count': number,
        'email': string,
        'created_at': string,
        'provider': string
    }
};

@Controller('oauth')
export class AuthController {
  constructor(
        private readonly authService: AuthService,
        private readonly refreshService: RefreshService,
        private readonly userService: UserService,
  ) {}

  @Get('/twitch')
  @UseGuards(TwitchAuthGuard)
  async twitchAuth(@Req() req) {}

  @Get('/twitch/callback')
  @UseGuards(TwitchAuthGuard)
  async twitchAuthRedirect(@Req() req, @Res() res) {
    const info: twitchInfo = req.user;
    
    const user: User = await this.userService.signUp(info);

    await this.userService.getStreamer(user, info);

    const accessToken = await this.authService.generateAccessToken({ id: user.userId });
    const refreshToken = await this.refreshService.generateRefreshToken({ id: user.userId });

    return res.redirect(`/oauth?accessToken=${accessToken}?refreshToken=${refreshToken}`);
  }

  @Get('')
  hello() {
    return 'hi';
  }
  
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refreshToken(@Req() req, @Res() res) {
        
    const accessToken = await this.authService.generateAccessToken({ id: req.user });
    return res.redirect(`/oauth?accessToken=${accessToken}`);
  }
}
