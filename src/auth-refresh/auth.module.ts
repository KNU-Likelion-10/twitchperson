import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RefreshService } from '@refresh/auth.service';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_RFRESH_TOKEN_SECRET_KEY,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  providers: [RefreshService],
  exports: [RefreshService],
})
export class RefreshModule {}
