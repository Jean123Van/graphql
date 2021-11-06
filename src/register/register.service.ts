import { Injectable } from '@nestjs/common';
import { RegisterInput } from './dto/register.input';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt'

@Injectable()
export class RegisterService {
    constructor(private readonly userRepository:UserRepository){}

    async register(input: RegisterInput){
        const {password, username, email} = input

        const user = await this.userRepository.findOne({where: [{username},{email}]})
        
        this.userRepository.registrationValidation(user,email,username)

        const salt = await bcrypt.genSalt()

        const hashedPassword = await bcrypt.hash(password,salt)

        return this.userRepository.save({...input, password:hashedPassword})
    }
}
