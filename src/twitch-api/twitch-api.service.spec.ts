import { Test, TestingModule } from '@nestjs/testing';
import TwitchApiService from '@src/twitch-api/twitch-api.service';

describe('TwitchApiService', () => {
  let service: TwitchApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwitchApiService],
    }).compile();

    service = module.get<TwitchApiService>(TwitchApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
