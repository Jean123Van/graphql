import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PostOutput{
    @Field()
    id:string;

    @Field()
    title:string;

    @Field()
    description: string;

    @Field()
    user: string;

    @Field()
    created_at: Date;

}