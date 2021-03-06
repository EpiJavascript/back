import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import UserChannelsController from './user-channels.controller';
import { Message, MessageFlux } from '../messages/entities';
import UserChannelsService from './user-channels.service';
import EventsModule from '../../websocket/events.module';
import UsersModule from '../users/users.module';
import { UserTextChannel } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTextChannel, Message, MessageFlux]),
    EventsModule,
    UsersModule,
  ],
  controllers: [UserChannelsController],
  providers: [UserChannelsService],
  exports: [UserChannelsService],
})
export default class UserChannelsModule { }
