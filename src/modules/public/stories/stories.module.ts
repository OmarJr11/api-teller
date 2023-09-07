import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesResolver } from './stories.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { LikeStoriesModule } from '../like-stories/like-stories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Story]),
    LikeStoriesModule,
  ],
  providers: [StoriesResolver, StoriesService],
  exports: [StoriesService],
})
export class StoriesModule {}
