import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RefreshService } from '@refresh/auth.service';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    PassportModule.register({}),
    JwtModule.register({
      secret: process.env.JWT_RFRESH_TOKEN_SECRET_KEY,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [RefreshService],
  exports: [RefreshService],
})
export class RefreshModule {}
