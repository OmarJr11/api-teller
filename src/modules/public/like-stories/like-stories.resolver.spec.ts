import { Test, TestingModule } from '@nestjs/testing';
import { LikeStoriesResolver } from './like-stories.resolver';
import { LikeStoriesService } from './like-stories.service';

describe('LikeStoriesResolver', () => {
  let resolver: LikeStoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikeStoriesResolver, LikeStoriesService],
    }).compile();

    resolver = module.get<LikeStoriesResolver>(LikeStoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
