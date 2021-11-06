import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/register/user.repository';
import { FriendRepository } from './friends.repository';
import { FriendsResolver } from './friends.resolver';
import { FriendsService } from './friends.service';

@Module({
  imports: [TypeOrmModule.forFeature([FriendRepository]),
            TypeOrmModule.forFeature([UserRepository])],
  providers: [FriendsResolver, FriendsService]
})
export class FriendsModule {}
