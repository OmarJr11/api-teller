import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesResolver } from './stories.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Story])
  ],
  providers: [StoriesResolver, StoriesService],
  exports: [StoriesService],
})
export class StoriesModule {}
