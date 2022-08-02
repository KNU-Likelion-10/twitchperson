import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { RefreshModule } from '@refresh/auth.module';
import { AuthModule } from '@auth/auth.module';
import { LevelModule } from '@level/level.module';
import { BadgeModule } from '@badge/badge.module';
import { ImageModule } from '@image/image.module';
import { StreamerModule } from '@streamer/streamer.module';
import { TwitchApiModule } from '@twitch/twitch-api.module';
import { Badge } from '@badge/badge.entity';
import { Image } from '@image/image.entity';
import { User } from '@auth/user.entity';
import { config } from 'dotenv';

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
