import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CommentsOutput {
    @Field()
    id:string
    @Field()
    comment:string;
    @Field()
    user:string;
    @Field()
    postId: string;
    @Field()
    created_at: Date;
}