import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LikeStoriesService } from './like-stories.service';
import { LikeStory } from './entities/like-story.entity';
import { CreateLikeStoryInput } from './dto/create-like-story.input';
import { UpdateLikeStoryInput } from './dto/update-like-story.input';

@Resolver(() => LikeStory)
export class LikeStoriesResolver {
  constructor(private readonly likeStoriesService: LikeStoriesService) {}

  @Mutation(() => LikeStory)
  createLikeStory(@Args('createLikeStoryInput') createLikeStoryInput: CreateLikeStoryInput) {
    return this.likeStoriesService.create(createLikeStoryInput);
  }

  @Query(() => [LikeStory], { name: 'likeStories' })
  findAll() {
    return this.likeStoriesService.findAll();
  }

  @Query(() => LikeStory, { name: 'likeStory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.likeStoriesService.findOne(id);
  }

  @Mutation(() => LikeStory)
  updateLikeStory(@Args('updateLikeStoryInput') updateLikeStoryInput: UpdateLikeStoryInput) {
    return this.likeStoriesService.update(updateLikeStoryInput.id, updateLikeStoryInput);
  }

  @Mutation(() => LikeStory)
  removeLikeStory(@Args('id', { type: () => Int }) id: number) {
    return this.likeStoriesService.remove(id);
  }
}
