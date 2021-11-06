import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/register/user.repository';
import { Like } from 'typeorm';
import { Filter } from './dto/users.filter';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository:UserRepository){}

    async getOne(userId:string){
        this.userRepository.validateUUID(userId)
        const [user] = await this.userRepository.find({id:userId})
        return this.userRepository.getOne(user)
    }

    async getList(filter:Filter){
        const {q, page=1, limit=10} = filter
        const paginate = {take: limit, skip: (page-1)*limit}
        const keyword = Like(`%${q}%`)

        const collection = await this.userRepository.find({where: [{first_name: keyword},
                                        {last_name: keyword},{username: keyword}]
                                        ,...paginate})

        return collection
    }
}
