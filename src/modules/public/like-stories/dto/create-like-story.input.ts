import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLikeStoryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
