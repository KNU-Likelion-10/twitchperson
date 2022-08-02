import { Module } from '@nestjs/common';
import { TwitchApiService } from '@twitch/twitch-api.service';

@Module({
  providers: [TwitchApiService],
})
export class TwitchApiModule {}
