import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/system/auth/jwt-auth.guard';
import { UserDec } from 'src/common/decorators/user.decorator';
import { IUserReq } from 'src/common/interfaces/user-req.interface';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @UserDec() user: IUserReq
  ) {
    return await this.commentsService.create(createCommentInput, user);
  }

  @Query(() => [Comment], { name: 'comments' })
  async findAll() {
    return await this.commentsService.findAll();
  }

  @Query(() => Comment, { name: 'comment' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.commentsService.findOne(id);
  }

  @Mutation(() => Comment)
  async updateComment(@Args('updateCommentInput') updateCommentInput: UpdateCommentInput) {
    return await this.commentsService.update(updateCommentInput);
  }

  @Mutation(() => Comment)
  async removeComment(@Args('id', { type: () => Int }) id: number) {
    return await this.commentsService.remove(id);
  }
}
