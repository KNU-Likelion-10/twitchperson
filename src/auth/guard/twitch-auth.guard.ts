import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * 우리가 정의한 전략을 AuthGuard를 상속함으로 매핑합니다.
 *
 * kakao는 전략에서 정의한 이름입니다.
 */
@Injectable()
export class TwitchAuthGuard extends AuthGuard('twitch') {}
