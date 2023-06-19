import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRefreshTokenInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
