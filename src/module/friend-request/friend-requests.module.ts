import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import FriendRequestsController from './friend-requests.controller';
import FriendRequestsService from './friend-requests.service';
import EventsModule from '../../websocket/events.module';
import UsersModule from '../users/users.module';
import { FriendRequest } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendRequest]),
    EventsModule,
    UsersModule,
  ],
  controllers: [FriendRequestsController],
  providers: [FriendRequestsService],
  exports: [FriendRequestsService],
})
export default class FriendRequestsModule { }
