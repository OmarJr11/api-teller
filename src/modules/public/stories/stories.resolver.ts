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
  @UseGuards(JwtAuthGuard)
  async createStory(
    @Args('createStoryInput') createStoryInput: CreateStoryInput, 
    @UserDec() user: IUserReq
  ) {
    return await this.storiesService.createStory(createStoryInput, user);
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
  @UseGuards(JwtAuthGuard)
  async updateStory(
    @Args('updateStoryInput') updateStoryInput: UpdateStoryInput,
    @UserDec() user: IUserReq
  ) {
    return await this.storiesService.update(updateStoryInput, user);
  }

  @Mutation(() => Story)
  @UseGuards(JwtAuthGuard)
  async removeStory(
    @Args('id', { type: () => Int }) id: number,
    @UserDec() user: IUserReq
  ) {
    return await this.storiesService.remove(id, user);
  }
}
