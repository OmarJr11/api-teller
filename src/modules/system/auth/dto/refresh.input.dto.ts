import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class RefreshInputDto {
    @Field(() => Int, { description: 'User id' })
    idUser: number;

    @Field({ description: 'Token' })
    token: string;

    @Field({ description: 'Refresh' })
    refresh: string;
}
