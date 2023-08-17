import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";

@ObjectType()
export class LoginResponse {
    @Field({ description: 'Access Token' })
    token: string;

    @Field({ description: 'Access Refresh Token' })
    refresh: string;
    
    @Field(() => User, { description: 'User' })
    user?: User;
}