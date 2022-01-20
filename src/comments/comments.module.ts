import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';
import { FriendRepository } from 'src/friends/friends.repository';
import { PostRepository } from 'src/posts/posts.repository';
import { PostsService } from 'src/posts/posts.service';
import { CommentsRepository } from './comments.repository';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository]),
            TypeOrmModule.forFeature([CommentsRepository]),
            TypeOrmModule.forFeature([FriendRepository])],
  providers: [CommentsResolver, CommentsService,PostsService, PubSub]
})
export class CommentsModule {}
