import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ChannelsModule from '../channels/channels.module';
import MessagesController from './messages.controller';
import UserModule from 'src/module/users/users.module';
import MessagesService from './messages.service';
import Message from './entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    UserModule,
    ChannelsModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export default class MessagesModule { }