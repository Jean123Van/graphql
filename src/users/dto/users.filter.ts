import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class Filter{
    @Field({nullable:true})
    q: string;

    @Field({nullable:true})
    page: number;

    @Field({nullable:true})
    limit: number;
}