import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import UserTextChannel from './entities/user-text-channel.entity';
import UserChannelsController from './user-channels.controller';
import UserChannelsService from './user-channels.service';
import MessagesModule from '../messages/messages.module';
import UsersModule from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTextChannel]),
    MessagesModule, // check si utilisé
    UsersModule,
  ],
  controllers: [UserChannelsController],
  providers: [UserChannelsService],
  exports: [UserChannelsService],
})
export default class UserChannelsModule { }
