import { Module } from '@nestjs/common';
import { StreamerService } from '@src/streamer/streamer.service';
import { StreamerController } from '@src/streamer/streamer.controller';

@Module({
  providers: [StreamerService],
  controllers: [StreamerController],
})
export class StreamerModule {}
