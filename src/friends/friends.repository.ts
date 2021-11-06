import { BadRequestException } from "@nestjs/common";
import { RegisterOutput } from "src/register/dto/register.output";
import { EntityRepository, Repository } from "typeorm";
import { FriendEntity } from "./entity/friend.entity";

@EntityRepository(FriendEntity)
export class FriendRepository extends Repository<FriendEntity>{

    isFriend(friend: FriendEntity,friendId: string,userId: string){
        if(friend){
            throw new BadRequestException('You are already friends')
        }
        if(friendId==userId){
            throw new BadRequestException('You cannot add yourself')
        }
    }

    deleteValidation(friend:FriendEntity){
        if(!friend){
            throw new BadRequestException('deletion request cannot be processed')
        }
    }

    friendValidation(friend:FriendEntity){
        if(!friend){
            throw new BadRequestException('You are not friends')
        }
    }
}