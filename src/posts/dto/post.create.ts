import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PostCreate {

    @Field()
    title: string;

    @Field()
    description: string
}