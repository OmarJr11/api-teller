import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLikeStoryInput {
  @Field(() => Int, { description: 'Story id' })
  idStory: number;
}
