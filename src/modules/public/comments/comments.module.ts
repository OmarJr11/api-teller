import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoriesModule } from '../stories/stories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    StoriesModule,
  ],
  providers: [CommentsResolver, CommentsService],
})
export class CommentsModule {}
