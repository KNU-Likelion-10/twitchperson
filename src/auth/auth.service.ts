import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPaylodeValue } from '@auth/jwt.interface';
import { config } from 'dotenv';

config();

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  /**
     * AccessToken을 생산합니다.
     * @param user
     * @returns
     */
  async generateAccessToken(user: UserPaylodeValue): Promise<string> {
    const payload: UserPaylodeValue = { id: user.id };
    return this.jwtService.sign(payload);
  }
}
