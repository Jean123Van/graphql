import { Injectable } from '@nestjs/common';
import { FriendRepository } from 'src/friends/friends.repository';
import { PostRepository } from 'src/posts/posts.repository';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
    constructor(private readonly postRepository: PostRepository,
                private readonly friendRepository: FriendRepository,
                private readonly commentsRepository: CommentsRepository){}

    async createComment(postId:string,userId:string,comment:string){
        const [post] = await this.postRepository.find({id:postId})
        this.postRepository.postValidation(post)
        const [friend] = await this.friendRepository.find({userId:userId, friendId:post.user})
        this.commentsRepository.commentFilter(userId,post,friend)

        return this.commentsRepository.save({postId:postId, user:userId, comment:comment})
    }

    async getAllComments(postId:string){
        return this.commentsRepository.find({postId:postId})
    }

    async getComment(postId:string,userId:string,commentId:string){
        const[comments] = await this.commentsRepository.find({id:commentId})
        this.commentsRepository.commentValidation(comments,postId)
        const [friend] = await this.friendRepository.find({userId:userId, friendId:comments.user})
        return this.commentsRepository.getComment(friend, comments, userId)
    }

    async deleteComment(postId:string,userId:string,commentId:string){
        const [comment] = await this.commentsRepository.find({user:userId,postId:postId,id:commentId})
        this.commentsRepository.deleteComment(comment)
        this.commentsRepository.delete({id:commentId})
        return comment
    }
}
