import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisterOutput } from './dto/register.output';
import { RegisterInput } from './dto/register.input';
import { RegisterService } from './register.service';

@Resolver(() => RegisterOutput)
export class RegisterResolver {
    constructor(private readonly registerService:RegisterService){}

    @Mutation(() => RegisterOutput)
    register(@Args('input') input: RegisterInput){
        return this.registerService.register(input);
    }
}
