import { BadRequestException } from "@nestjs/common";
import { FriendEntity } from "src/friends/entity/friend.entity";
import { EntityRepository, Repository } from "typeorm";
import { PostEntity } from "./entity/posts.entity";

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity>{

    getPost(post: PostEntity,friend:FriendEntity,userId:string){
        if(!friend && post.user!==userId){
            throw new BadRequestException('You cannot access this post')
        }
        return post
    }

    postValidation(post:PostEntity){
        if(!post){
            throw new BadRequestException('Post does not exist')
        }
    }

    postVerification(post:PostEntity){
        if (!post){
            throw new BadRequestException('Cannot access this post')
        } 
    }
}
