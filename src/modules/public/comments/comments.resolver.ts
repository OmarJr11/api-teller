import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  async createComment(@Args('createCommentInput') createCommentInput: CreateCommentInput) {
    return await this.commentsService.create(createCommentInput);
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
