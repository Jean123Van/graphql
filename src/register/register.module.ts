import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { RegisterResolver } from './register.resolver';
import { RegisterService } from './register.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [RegisterResolver, RegisterService]
})
export class UserModule {}
