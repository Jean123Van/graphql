import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver, Query, Args, ResolveField, Subscription } from '@nestjs/graphql';
import { create } from 'domain';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUser } from 'src/login/current-user.decorator';
import { GqlAuthGuard } from 'src/login/gql-auth.guard';
import { PostOutput } from 'src/posts/dto/post.output';
import { PostsService } from 'src/posts/posts.service';
import { UserEntity } from 'src/register/entity/user.entity';
import { CommentsService } from './comments.service';
import { CommentsOutput } from './dto/comments.output';

@Resolver(() => PostOutput)
@UseGuards(GqlAuthGuard)
export class CommentsResolver {
    constructor(private readonly commentsService:CommentsService,
                private readonly postsService:PostsService,
                private readonly pubSub:PubSub){}

    @Mutation(() => CommentsOutput)
    createComment(@Args('postId') postId:string, @CurrentUser('user') user: UserEntity, @Args('comment') comment:string){
        const createdComment = this.commentsService.createComment(postId,user.id,comment)
        this.pubSub.publish('commentCreated', {createdComment:createdComment})
        return createdComment
    }

    @ResolveField(() => [CommentsOutput])
    allComments(post:PostOutput){
        return this.commentsService.getAllComments(post.id)
    }

    @Query(() => PostOutput)
    getAllComments(@Args('postId') postId:string, @CurrentUser('user') user: UserEntity){
        return this.postsService.getPost(postId, user.id)
    }

    @Query(() => CommentsOutput)
    getComment(@Args('postId') postId:string, @CurrentUser('user') user: UserEntity, @Args('commentId') commentId:string){
        return this.commentsService.getComment(postId,user.id,commentId)
    }

    @Mutation(() => CommentsOutput)
    deleteComment(@Args('postId') postId:string, @CurrentUser('user') user: UserEntity, @Args('commentId') commentId:string){
        return this.commentsService.deleteComment(postId,user.id,commentId)
    }

    @Subscription(() => CommentsOutput)
     async commentAdded(){
        return await (await this.pubSub.asyncIterator('commentCreated').next()).value.createdComment
    }
}
