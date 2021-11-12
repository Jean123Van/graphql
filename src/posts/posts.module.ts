import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';
import { FriendRepository } from 'src/friends/friends.repository';
import { PostRepository } from './posts.repository';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository]),
            TypeOrmModule.forFeature([FriendRepository])],
  providers: [PostsResolver, PostsService, PubSub],
  exports: [PostsService]
})
export class PostsModule {}
