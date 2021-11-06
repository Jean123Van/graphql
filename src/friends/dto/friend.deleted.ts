import { Field, ObjectType } from "@nestjs/graphql";
import { RegisterOutput } from "src/register/dto/register.output";

@ObjectType()
export class FriendDeleted {
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

    @Field()
    Deleted_friend: RegisterOutput
}