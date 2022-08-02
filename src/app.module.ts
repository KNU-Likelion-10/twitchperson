import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { RefreshModule } from '@src/auth-refresh/auth.module';
import { AuthModule } from '@src/auth/auth.module';
import { LevelModule } from '@src/level/level.module';
import { BadgeModule } from '@src/badge/badge.module';
import { ImageModule } from '@src/image/image.module';
import { StreamerModule } from '@src/streamer/streamer.module';
import { TwitchApiModule } from '@src/twitch-api/twitch-api.module';
import { Badge } from '@src/badge/badge.entity';
import { Image } from '@src/image/image.entity';
import { User } from '@src/auth/user.entity';
import { config } from 'dotenv';
import { ProcessCredentials } from 'aws-sdk';

config();

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', { prettyPrint: true }),
          ),
        }),
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: +process.env.PROT,
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [Badge, Image, User],
      synchronize: true,
    }),
    AuthModule,
    RefreshModule,
    LevelModule,
    BadgeModule,
    ImageModule,
    StreamerModule,
    TwitchApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
