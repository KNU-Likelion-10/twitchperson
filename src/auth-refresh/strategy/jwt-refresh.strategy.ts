import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPaylodeValue } from '@auth/jwt.interface';
import { config } from 'dotenv';

config();

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_RFRESH_TOKEN_SECRET_KEY,
    });
  }

  // 발급했던 토큰 유효 검증, 이 결과값에 의존하여 user object를 만들고,
  // 그것을 Request Object의 매개변수로 붙인다.
  // (id, class, iat, exp)
  async validate(payload) {
    const user: UserPaylodeValue = { id: payload.id };
    return user;
  }
}
