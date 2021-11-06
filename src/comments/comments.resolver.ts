import { Mutation, Resolver, Query, Args, ResolveField } from '@nestjs/graphql';
import { PostOutput } from 'src/posts/dto/post.output';
import { PostsService } from 'src/posts/posts.service';
import { CommentsService } from './comments.service';
import { CommentsOutput } from './dto/comments.output';

@Resolver(() => PostOutput)
export class CommentsResolver {
    constructor(private readonly commentsService:CommentsService,
                private readonly postsService:PostsService){}

    @Mutation(() => CommentsOutput)
    createComment(@Args('postId') postId:string, @Args('userId') userId:string, @Args('comment') comment:string){
        return this.commentsService.createComment(postId,userId,comment)
    }

    @ResolveField(() => [CommentsOutput])
    allComments(post:PostOutput){
        return this.commentsService.getAllComments(post.id)
    }

    @Query(() => PostOutput)
    getAllComments(@Args('postId') postId:string, @Args('userId') userId: string){
        return this.postsService.getPost(postId, userId)
    }

    @Query(() => CommentsOutput)
    getComment(@Args('postId') postId:string, @Args('userId') userId:string, @Args('commentId') commentId:string){
        return this.commentsService.getComment(postId,userId,commentId)
    }

    @Mutation(() => CommentsOutput)
    deleteComment(@Args('postId') postId:string, @Args('userId') userId:string, @Args('commentId') commentId:string){
        return this.commentsService.deleteComment(postId,userId,commentId)
    }
}
