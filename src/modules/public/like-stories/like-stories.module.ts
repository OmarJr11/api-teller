import { Module } from '@nestjs/common';
import { LikeStoriesService } from './like-stories.service';
import { LikeStoriesResolver } from './like-stories.resolver';

@Module({
  providers: [LikeStoriesResolver, LikeStoriesService]
})
export class LikeStoriesModule {}
