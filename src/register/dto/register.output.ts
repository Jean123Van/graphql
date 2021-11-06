import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RegisterOutput {

    @Field()
    id:string;

    @Field()
    first_name: string;

    @Field()
    last_name: string;

    @Field()
    email: string;

    @Field()
    username: string;

}