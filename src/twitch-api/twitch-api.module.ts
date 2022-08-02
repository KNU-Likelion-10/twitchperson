import { Module } from '@nestjs/common';
import { TwitchApiService } from '@src/twitch-api/twitch-api.service';

@Module({
  providers: [TwitchApiService],
})
export class TwitchApiModule {}
