import { Field, InputType } from "@nestjs/graphql";
import { IsAlpha, IsAlphanumeric, IsEmail, IsNotEmpty, Length, Matches } from "class-validator";

@InputType()
export class RegisterInput {

    @Field()
    @IsAlpha()
    @IsNotEmpty()
    @Length(0,60)
    first_name: string;

    @Field()
    @IsAlpha()
    @IsNotEmpty()
    @Length(0,60)
    last_name: string;

    @Field()
    @IsEmail()
    @IsNotEmpty()
    @Length(0,70)
    email: string;
    
    @Field()
    @IsAlphanumeric()
    @Length(4,20)
    @IsNotEmpty()
    username: string;

    @Field()
    @IsNotEmpty()
    @Length(8,32)
    @Matches(/[A-Z]/,{message:'password must contain at least one uppercase letter'})
    @Matches(/[a-z]/,{message:'password must contain at least one lowercase letter'} )
    @Matches(/[^a-zA-Z0-9]/,{message:'password must contain at least one special letter'})
    password: string;
}