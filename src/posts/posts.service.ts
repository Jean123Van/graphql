import { Injectable } from '@nestjs/common';
import { FriendRepository } from 'src/friends/friends.repository';
import { PostCreate } from './dto/post.create';
import { PostRepository } from './posts.repository';

@Injectable()
export class PostsService {
    constructor(private readonly postRepository:PostRepository,
                private readonly friendRepository: FriendRepository){}

    createPost(postCreate:PostCreate, userId:string){
        return this.postRepository.save({...postCreate, user:userId})
    }

    async getPost(postId:string, userId:string){
        const [post] = await this.postRepository.find({id:postId})
        this.postRepository.postValidation(post)
        const [friend] = await this.friendRepository.find({userId:userId, friendId:post.user})
        return this.postRepository.getPost(post,friend,userId)
    }

    async deletePost(postId:string, userId:string){
        const [post] = await this.postRepository.find({id:postId, user:userId})
        this.postRepository.postVerification(post)
        this.postRepository.delete({id:postId})
        return post
    }
}
