import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { PostCreate } from './dto/post.create';
import { PostOutput } from './dto/post.output';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {
    constructor(private readonly postsService:PostsService){}

    @Mutation(() => PostOutput)
    createPost(@Args('postCreate') postCreate: PostCreate, @Args('userId') userId:string){
        return this.postsService.createPost(postCreate, userId)
    }

    @Query(() => PostOutput)
    getPost(@Args('postId') postId: string, @Args('userId') userId: string){
        return this.postsService.getPost(postId,userId)
    }

    @Mutation(() => PostOutput)
    deletePost(@Args('postId') postId: string, @Args('userId') userId: string){
        return this.postsService.deletePost(postId,userId)
    }
}
