import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshService } from '@src/auth-refresh/auth.service';
import { User } from '@src/auth/user.entity';
import { twitchInfo } from '@src/auth/auth.controller';
import { UserPaylodeValue } from '@src/auth/jwt.interface';
import { config } from 'dotenv';

config();

/**
 * UserService는 유저의 정보를 이용하는 곳에 사용됩니다.
 *
 * JwtService, RefreshService, token 이용에 있어 사용됩니다.
 */
@Injectable()
export class AuthService {
  constructor(
        private readonly jwtService: JwtService,
        private readonly refreshService: RefreshService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
  ) {}

  async signUp(info: twitchInfo) {
    return await this.userRepository.save({
      userId: info.profile.id,
      email: info.profile.email,
      userName: info.profile.display_name,
      type: info.profile.type,
      broadcasterType: info.profile.broadcaster_type,
      description: info.profile.description,
      profileImage: info.profile.profile_image_url,
    });
  }

  /**
     * app controller의 login 함수에서 이용되는 함수입니다.
     *
     * 유저에게 서버에서 자체 생산한 jwt token를 반환합니다.
     * @param user Jwt 전략으로 인해 나온 값
     * @returns
     */
  async login(user: UserPaylodeValue): Promise<{ 'accessToken': string, 'refreshToken': string }> {
    const accessToken: string = await this.generateAccessToken(user);
    const refreshToken: string = await this.refreshService.generateRefreshToken(user);
    return {
      accessToken,
      refreshToken,
    };
  }

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
