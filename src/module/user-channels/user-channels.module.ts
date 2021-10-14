import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import UserChannelsController from './user-channels.controller';
import UserChannelsService from './user-channels.service';
import MessagesModule from '../messages/messages.module';
import UsersModule from '../users/users.module';
import { UserTextChannel } from './entities';
import { Message, MessageFlux } from '../messages/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTextChannel, Message, MessageFlux]),
    MessagesModule, // check si utilisé
    UsersModule,
  ],
  controllers: [UserChannelsController],
  providers: [UserChannelsService],
  exports: [UserChannelsService],
})
export default class UserChannelsModule { }
