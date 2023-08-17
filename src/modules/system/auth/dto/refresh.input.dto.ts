import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RefreshInputDto {
    @Field({ description: 'User id' })
    idUser: number;

    @Field({ description: 'Token' })
    token: string;

    @Field({ description: 'Refresh' })
    refresh: string;
}