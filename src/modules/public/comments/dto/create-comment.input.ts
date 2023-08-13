import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => Int, { description: 'Story id' })
  idStory: number;

  @Field({ description: 'Comment Text' })
  text: string;
}
