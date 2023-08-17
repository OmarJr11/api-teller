import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  id: number;

  @Field({ description: 'Username' })
  username?: string;

  @Field({ description: 'Email' })
  email?: string;
}
