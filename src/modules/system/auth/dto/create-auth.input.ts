import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthInput {
  @Field({ description: 'Username' })
  username: string;

  @Field({ description: 'Password' })
  password: string;
}
