import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPaylodeValue } from '@src/auth/jwt.interface';
import { config } from 'dotenv';

config();

/**
 * UserService는 유저의 정보를 이용하는 곳에 사용됩니다.
 *
 * JwtService, RefreshService, token 이용에 있어 사용됩니다.
 */
@Injectable()
export class RefreshService {
  constructor(
        private readonly jwtService: JwtService,
  ) {}

  /**
     * Refresh Token을 생산합니다.
     * @param user
     * @returns
     */
  async generateRefreshToken(user: UserPaylodeValue): Promise<string> {
    const payload: UserPaylodeValue = { id: user.id };
    return this.jwtService.sign(payload);
  }
}
