import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateStoryInput {
  @Field({ description: 'Story Title' })
  title: string;

  @Field({ description: 'Story Text' })
  text: string;
}
