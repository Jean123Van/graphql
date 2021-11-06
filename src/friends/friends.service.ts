import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/register/user.repository';
import { FriendRepository } from './friends.repository';

@Injectable()
export class FriendsService {
    constructor(private readonly friendRepository: FriendRepository,
                private readonly userRepository: UserRepository){}

    async addFriend(userId:string, friendId:string){
        this.userRepository.validateUUID(friendId)
        const [user] = await this.userRepository.find({id:friendId})
        const [friend] = await this.friendRepository.find({where: [{userId:userId,friendId:friendId}, {userId:friendId,friendId:userId}]})
        const [id] = await this.userRepository.find({id:userId})

        this.userRepository.isUser(user)
        this.friendRepository.isFriend(friend,friendId,userId)

        this.friendRepository.save({friendId:friendId, userId:userId})

        return {...id, Added_friend: user}
    }

    async deleteFriend(userId:string, friendId:string){
        this.userRepository.validateUUID(friendId)
        const [friend] = await this.friendRepository.find({where: [{friendId:friendId, userId:userId},{friendId:userId, userId:friendId}]})
        const [userIdentitiy] = await this.userRepository.find({id: userId})
        const [friendIdentity] = await this.userRepository.find({id: friendId})

        this.friendRepository.deleteValidation(friend)

        this.friendRepository.delete({friendId:friendId, userId:userId})
        this.friendRepository.delete({friendId:userId, userId:friendId})

        return {...userIdentitiy, Deleted_friend: friendIdentity}
    }

    async viewFriend(userId:string, friendId:string){
        this.userRepository.validateUUID(friendId)
        const [friend] = await this.friendRepository.find({friendId:friendId, userId:userId})
        const [friendIdentity] = await this.userRepository.find({id:friendId})
        this.friendRepository.friendValidation(friend)
        return friendIdentity
    }

    async friends(userId:string){
        const list = await this.friendRepository.find({userId:userId})
  
        let friends = []

        for(let i=0; list.length>i; i++){
            const [friend] = await this.userRepository.find({id:list[i].friendId})
            friends.push(friend)
        }
        return friends
    }

    async listFriends(userId:string){
        const [identity] = await this.userRepository.find({id:userId})
        return identity
    }
}
