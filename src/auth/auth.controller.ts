import {
  Controller, Get, Req, Res, UseGuards,
} from '@nestjs/common';
import { RefreshService } from '@refresh/auth.service';
import { AuthService } from '@auth/auth.service';
import { TwitchAuthGuard } from '@auth/guard/twitch-auth.guard';

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
  ) {}

  @Get('/twitch')
  @UseGuards(TwitchAuthGuard)
  async twitchAuth(@Req() req) {}

  @Get('/twitch/callback')
  @UseGuards(TwitchAuthGuard)
  async twitchAuthRedirect(@Req() req, @Res() res) {
    const info: twitchInfo = req.user;

    this.authService.signUp(info);
    // if((await this.authService.existSnsUser(req.user.id)) == false){
    //     this.authService.createUserSNS(req.user.id);
    //     //res.redirect(`https://codeduri.saintdev.kr/oauth/callback?id=${req.user.id}`)
    //     res.redirect(`http://localhost:53214/oauth/callback?id=${req.user.id}`)
    // }

    // const user = await this.authService.findUser(req.user.id);

    // TODO token 생성 시 User 정보를 넣어줘야 합니다.
    const accessToken = await this.authService.generateAccessToken({ id: '1' });
    const refreshToken = await this.refreshService.generateRefreshToken({ id: '1' });

    // return res.redirect(`http://codeduri.saintdev.kr/oauth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`);
    // return res.redirect(`http://localhost:53214/oauth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`);
    // res.setHeader("accessToken", accessToken);
    return res.redirect(`/oauth?/hi?accessToken=${accessToken}`);
  }

  @Get('/hi')
  hello() {
    return 'hi';
  }
}
