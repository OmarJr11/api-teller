import { Test, TestingModule } from '@nestjs/testing';
import { LikeStoriesService } from './like-stories.service';

describe('LikeStoriesService', () => {
  let service: LikeStoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikeStoriesService],
    }).compile();

    service = module.get<LikeStoriesService>(LikeStoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
