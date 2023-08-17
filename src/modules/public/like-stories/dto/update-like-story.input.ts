import { CreateLikeStoryInput } from './create-like-story.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLikeStoryInput extends PartialType(CreateLikeStoryInput) {
  @Field(() => Int)
  id: number;
}
