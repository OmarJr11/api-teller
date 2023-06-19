import { Test, TestingModule } from '@nestjs/testing';
import { StoriesResolver } from './stories.resolver';
import { StoriesService } from './stories.service';

describe('StoriesResolver', () => {
  let resolver: StoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoriesResolver, StoriesService],
    }).compile();

    resolver = module.get<StoriesResolver>(StoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
