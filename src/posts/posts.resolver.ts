
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Subscription } from '@nestjs/graphql';
import { CurrentUser } from 'src/login/current-user.decorator';
import { GqlAuthGuard } from 'src/login/gql-auth.guard';
import { UserEntity } from 'src/register/entity/user.entity';
import { PostCreate } from './dto/post.create';
import { PostOutput } from './dto/post.output';
import { PostsService } from './posts.service';
import { PubSub } from 'graphql-subscriptions'
import { UserRepository } from 'src/register/user.repository';

@Resolver()
export class PostsResolver {
    constructor(private readonly postsService:PostsService,
                private readonly pubSub: PubSub,){}

    @Mutation(() => PostOutput)
    @UseGuards(GqlAuthGuard)
    async createPost(@Args('postCreate') postCreate: PostCreate, @CurrentUser('user') user: UserEntity){
        const post = await this.postsService.createPost(postCreate, user.id)
        this.pubSub.publish('postCreated', {postAdded:post})
        return post 
    }

    @Query(() => PostOutput)
    @UseGuards(GqlAuthGuard)
    getPost(@Args('postId') postId: string, @CurrentUser('user') user: UserEntity){
        return this.postsService.getPost(postId,user.id)
    }

    @Mutation(() => PostOutput)
    @UseGuards(GqlAuthGuard)
    deletePost(@Args('postId') postId: string, @CurrentUser('user') user: UserEntity){
        return this.postsService.deletePost(postId,user.id)
    }

    @Subscription(() => PostOutput)
     postAdded(){
        return this.pubSub.asyncIterator(['postCreated'])
    }
}
