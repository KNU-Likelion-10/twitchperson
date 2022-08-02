import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitch-latest';
import { twitchInfo } from '@src/auth/auth.controller';
import { config } from 'dotenv';

config();

/**
 * 카카오 로그인 시 필요한 전략입니다.
 *
 * super 안에 정의된 것은 카카오 api가 변경되면 변경되어야합니다.
 *
 * ts로 정의된 passport-kakao로 사용하고 있습니다.
 */
@Injectable()
export class TwitchStrategy extends PassportStrategy(Strategy, 'twitch') {
  constructor() {
    super(
      {
        clientID: process.env.twitch_client_id,
        clientSecret: process.env.twitch_client_secret,
        callbackURL: process.env.twitch_callback_url,
        scope: ['user_read'],
      },
    );
  }

  //   abstract validate(...args: any[]): any;
  /**
     * 전략이 실행되면 이 함수가 실행되며, done 함수를 통해 카카오에서 발급된 profile이 넘어갑니다.
     *
     * accessToken, refreshToken은 카카오에서 발급해주는 값입니다. 추후 카카오 api 이용 시 필요할 수 있습니다.
     * @param accessToken
     * @param refreshToken
     * @param profile
     * @param done 함수
     */
  async validate(accessToken:string, refreshToken:string, profile:any, done) {
    const info: twitchInfo = {
      profile: {
        id: profile.id,
        login: profile.login,
        display_name: profile.display_name,
        type: profile.type,
        broadcaster_type: profile.broadcaster_type,
        description: profile.description,
        profile_image_url: profile.profile_image_url,
        offline_image_url: profile.offline_image_url,
        view_count: profile.view_count,
        email: profile.email,
        created_at: profile.created_at,
        provider: profile.provider,
      },
      accessToken,
      refreshToken,
    };
    done(null, info);
  }
}
