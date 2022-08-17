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
import { BadgeModule } from '@badge/badge.module';
import { ImageModule } from '@image/image.module';
import { TwitchApiModule } from '@twitch/twitch-api.module';
import { Badge } from '@badge/badge.entity';
import { Image } from '@image/image.entity';
import { User } from '@user/user.entity';
import { UserModule } from '@user/user.module';
import { UserToBadge } from '@user/user-badge';
import { UserToStreamer } from '@user/user-stremer';
import { config } from 'dotenv';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/comment.entity';


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
      port: +process.env.PORT,
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [Badge, Image, User, UserToBadge, UserToStreamer, Comment],
      synchronize: true,
    }),
    AuthModule,
    RefreshModule,
    BadgeModule,
    ImageModule,
    TwitchApiModule,
    UserModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
