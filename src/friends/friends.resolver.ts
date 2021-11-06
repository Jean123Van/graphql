import { Mutation, Resolver, Query, Args, ResolveField } from '@nestjs/graphql';
import { RegisterOutput } from 'src/register/dto/register.output';
import { FriendAdded } from './dto/friend.added';
import { FriendDeleted } from './dto/friend.deleted';
import { FriendsService } from './friends.service';

@Resolver(() => RegisterOutput)
export class FriendsResolver {
    constructor(private readonly friendsService: FriendsService){}

    @Mutation(() => FriendAdded)
    addFriend(@Args('userId') userId:string, @Args('friendId') friendId:string){
        return this.friendsService.addFriend(userId,friendId)
    }

    @Mutation(() => FriendDeleted)
    deleteFriend(@Args('userId') userId:string, @Args('friendId') friendId:string){
        return this.friendsService.deleteFriend(userId, friendId)
    }

    @Query(() => RegisterOutput)
    viewFriend(@Args('userId') userId:string, @Args('friendId') friendId:string){
        return this.friendsService.viewFriend(userId, friendId)
    }

    @ResolveField(() => [RegisterOutput])
    friends(user: RegisterOutput){
        return this.friendsService.friends(user.id)
    }
    
    @Query(() => RegisterOutput)
    listFriends(@Args('userId') userId:string){
       return this.friendsService.listFriends(userId)
   }
}
