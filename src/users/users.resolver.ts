import { Args, Query, Resolver } from '@nestjs/graphql';
import { RegisterOutput } from 'src/register/dto/register.output';
import { Filter } from './dto/users.filter';
import { UsersService } from './users.service';

@Resolver(() => RegisterOutput)
export class UsersResolver {
    constructor(private readonly usersService: UsersService){}

    @Query(() => RegisterOutput)
    getOne(@Args('userId') userId:string){
        return this.usersService.getOne(userId)
    }

    @Query(() => [RegisterOutput])
    getList(@Args('filter') filter: Filter){
        return this.usersService.getList(filter)
    }
}
