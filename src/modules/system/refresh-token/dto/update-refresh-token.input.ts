import { CreateRefreshTokenInput } from './create-refresh-token.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRefreshTokenInput extends PartialType(CreateRefreshTokenInput) {
  @Field(() => Int)
  id: number;
}
