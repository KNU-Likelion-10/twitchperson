import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPaylodeValue } from '@auth/jwt.interface';
import { config } from 'dotenv';

config();

/**
 * 서버 자체에서 생성한 jwt 토큰을 이용하는 로그인 전략입니다.
 *
 * 자세한 내용은 NestJs 공식 문서를 참고하세요.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  /**
   * 발급했던 토큰 유효 검증, 이 결과값에 의존하여 user object를 만들고, 그것을 Request Object의 매개변수로 붙인다.
   * @param payload (id, class, iat, exp)
   * @returns
   */
  async validate(payload): Promise<UserPaylodeValue> {
    const user: UserPaylodeValue = { id: payload.id };
    return user;
  }
}
