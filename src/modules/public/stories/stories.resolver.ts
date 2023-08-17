import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { StoriesService } from './stories.service';
import { Story } from './entities/story.entity';
import { CreateStoryInput } from './dto/create-story.input';
import { UpdateStoryInput } from './dto/update-story.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../modules/system/auth/jwt-auth.guard';
import { UserDec } from '../../../common/decorators/user.decorator';
import { IUserReq } from '../../../common/interfaces/user-req.interface';

@Resolver(() => Story)
export class StoriesResolver {
  constructor(private readonly storiesService: StoriesService) {}

  @Mutation(() => Story)
  async createStory(@Args('createStoryInput') createStoryInput: CreateStoryInput) {
    return await this.storiesService.createStory(createStoryInput);
  }

  @Query(() => [Story], { name: 'stories' })
  async findAll() {
    return await this.storiesService.findAll();
  }

  @Query(() => Story, { name: 'story' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.storiesService.findOne(id);
  }

  @Mutation(() => Story)
  async updateStory(@Args('updateStoryInput') updateStoryInput: UpdateStoryInput) {
    return await this.storiesService.update(updateStoryInput);
  }

  @Mutation(() => Story)
  async removeStory(@Args('id', { type: () => Int }) id: number) {
    return await this.storiesService.remove(id);
  }
}
