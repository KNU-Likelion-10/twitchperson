import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { config } from 'dotenv';

config();

/**
 * 우리가 정의한 전략을 AuthGuard를 상속함으로 매핑합니다.
 *
 * jwt 또한 기본적으로 정의된 이름입니다.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
