import {
  Controller, Get, Req, Res, UseGuards,
} from '@nestjs/common';
import { RefreshService } from '@refresh/auth.service';
import { AuthService } from '@auth/auth.service';
import { TwitchAuthGuard } from '@auth/guard/twitch-auth.guard';
import { JwtRefreshGuard } from '@src/auth-refresh/guard/jwt-refresh-auth.guard';
import { User } from '@user/user.entity';
import { UserService } from '@user/user.service';
import { TwitchLocalAuthGuard } from '@auth/guard/twitch-auth-local.guard';

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
  async twitchAuth() {}

  @Get('/twitch/callback')
  @UseGuards(TwitchAuthGuard)
  async twitchAuthRedirect(@Req() req, @Res() res) {
    const info: twitchInfo = req.user;

    const user: User = await this.userService.signUp(info);

    const accessToken = await this.authService.generateAccessToken({ id: info.profile.id });
    const refreshToken = await this.refreshService.generateRefreshToken({ id: info.profile.id });

    // await this.userService.getStreamer(user, info);
    
    return res.redirect(`/oauth?accessToken=${accessToken}&refreshToken=${refreshToken}`);
  }

  @Get('/twitch-local')
  @UseGuards(TwitchLocalAuthGuard)
  async twitchAuthLocal() {}

  @Get('/twitch-local/callback')
  @UseGuards(TwitchLocalAuthGuard)
  async twitchAuthLocalRedirect(@Req() req, @Res() res) {
    const info: twitchInfo = req.user;

    const user: User = await this.userService.signUp(info);

    const accessToken = await this.authService.generateAccessToken({ id: user.userId });
    const refreshToken = await this.refreshService.generateRefreshToken({ id: user.userId });

    // await this.userService.getStreamer(user, info);
    
    return res.redirect(`http://${process.env.local_redirect_url}?accessToken=${accessToken}&refreshToken=${refreshToken}`);
  }

  @Get('')
  hello() {
    return 'hi';
  }
  
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refreshToken(@Req() req, @Res() res) {
        
    const accessToken = await this.authService.generateAccessToken({ id: req.user });
    res.header('accessToken', accessToken);
  }
}
