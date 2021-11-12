import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/register/user.repository';
import { LoginCred } from './dto/login.input';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
    constructor(private readonly userRepository:UserRepository,
                private readonly jwtService: JwtService){}

    async login(loginCred:LoginCred){
        const {username, password} = loginCred
        const [user] = await this.userRepository.find({username})

        this.userRepository.userValidation(user)
        
        const valid = await bcrypt.compare(password,user.password)

        this.userRepository.passwordValidation(valid)

        const {first_name, last_name} = user

        const payload = {username, first_name, last_name}
        const accessToken: string = await this.jwtService.sign(payload)

        return accessToken
    }
}
