import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver, Query, Args, ResolveField } from '@nestjs/graphql';
import { CurrentUser } from 'src/login/current-user.decorator';
import { GqlAuthGuard } from 'src/login/gql-auth.guard';
import { RegisterOutput } from 'src/register/dto/register.output';
import { UserEntity } from 'src/register/entity/user.entity';
import { FriendAdded } from './dto/friend.added';
import { FriendDeleted } from './dto/friend.deleted';
import { FriendsService } from './friends.service';

@Resolver(() => RegisterOutput)
@UseGuards(GqlAuthGuard)
export class FriendsResolver {
    constructor(private readonly friendsService: FriendsService){}

    @Mutation(() => FriendAdded)
    addFriend(@CurrentUser('user') user: UserEntity, @Args('friendId') friendId:string){
        return this.friendsService.addFriend(user.id,friendId)
    }

    @Mutation(() => FriendDeleted)
    deleteFriend(@CurrentUser('user') user: UserEntity, @Args('friendId') friendId:string){
        return this.friendsService.deleteFriend(user.id, friendId)
    }

    @Query(() => RegisterOutput)
    viewFriend(@CurrentUser('user') user: UserEntity, @Args('friendId') friendId:string){
        return this.friendsService.viewFriend(user.id, friendId)
    }

    @ResolveField(() => [RegisterOutput])
    friends(user: RegisterOutput){
        return this.friendsService.friends(user.id)
    }
    
    @Query(() => RegisterOutput)
    listFriends(@CurrentUser('user') user: UserEntity){
       return this.friendsService.listFriends(user.id)
   }
}
