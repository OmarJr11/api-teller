import { Module } from '@nestjs/common';
import { LikeStoriesService } from './like-stories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeStory } from './entities/like-story.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeStory])
  ],
  providers: [LikeStoriesService],
  exports: [LikeStoriesService],
})
export class LikeStoriesModule {}
