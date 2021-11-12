import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginCred {
    @Field()
    username: string;

    @Field()
    password: string;
}