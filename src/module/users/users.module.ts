import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import FriendRequest from './entities/friend-request.entity';
import UsersController from './users.controller';
import UsersService from './users.service';
import User from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, FriendRequest])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export default class UsersModule { }
