
import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { LoginCred } from './dto/login.input';
import { LoginService } from './login.service';

@Resolver()
export class LoginResolver {
    constructor(private readonly loginService:LoginService){}

    @Query(() => String)
    login(@Args('loginCred') loginCred:LoginCred){
        return this.loginService.login(loginCred)
    }
}
