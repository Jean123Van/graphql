import { BadRequestException } from "@nestjs/common";
import { FriendEntity } from "src/friends/entity/friend.entity";
import { PostEntity } from "src/posts/entity/posts.entity";
import { EntityRepository, Repository } from "typeorm";
import { CommentsEntity } from "./entity/comments.entity";

@EntityRepository(CommentsEntity)
export class CommentsRepository extends Repository<CommentsEntity>{
    
    commentFilter(userId:string,post:PostEntity,friend: FriendEntity){
        if(userId!==post.user && !friend){
            throw new BadRequestException('You cannot comment on this post')
        }
    }

    commentValidation(comments:CommentsEntity,postId:string){
        if(comments.postId!==postId){
            throw new BadRequestException('Incorrect post ID')
        }
    }

    getComment(friend: FriendEntity, comments: CommentsEntity, user:string){
        if (!friend && comments.user!==user){
            throw new BadRequestException('Cannot access this comment')
        }
        return comments
    }

    deleteComment(comment:CommentsEntity){
        if (!comment){
            throw new BadRequestException('Cannot access this comment')
        } 
    }
}