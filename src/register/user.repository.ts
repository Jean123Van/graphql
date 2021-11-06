import { BadRequestException } from "@nestjs/common";
import { isUUID } from "class-validator";
import { EntityRepository, Repository } from "typeorm";
import { RegisterOutput } from "./dto/register.output";
import { UserEntity } from "./entity/user.entity";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    registrationValidation(user:UserEntity,email: string,username: string){
        if(user){
            if (user.username===username){
                throw new BadRequestException('username already exists')
            }
            if(user.email===email){
                throw new BadRequestException('email already exists')
            }
        }
    }

    getOne(user:RegisterOutput){
        if(!user){
            throw new BadRequestException('user does not exist')
        }

        return user
    }

    validateUUID(userId:string){
        if(!isUUID(userId)){
            throw new BadRequestException('user does not exist')
        }
    }

    isUser(user:RegisterOutput){
        if(!user){
            throw new BadRequestException('user doesn\'t exist')
        }
    }
}