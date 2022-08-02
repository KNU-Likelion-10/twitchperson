import { Module } from '@nestjs/common';
import { StreamerService } from '@streamer/streamer.service';
import { StreamerController } from '@streamer/streamer.controller';

@Module({
  providers: [StreamerService],
  controllers: [StreamerController],
})
export class StreamerModule {}
