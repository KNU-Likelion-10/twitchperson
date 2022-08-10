import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RefreshModule } from '@refresh/auth.module';
import { RefreshService } from '@refresh/auth.service';
import { TwitchStrategy } from '@auth/strategy/twitch.strategy';
import { JwtStrategy } from '@auth/strategy/jwt-access.strategy';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { UserModule } from '@user/user.module';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'twitch' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '5h' },
    }),
    RefreshModule,
    UserModule,
  ],
  providers: [TwitchStrategy, AuthService, RefreshService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
