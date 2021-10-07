import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import MessagesController from './messages.controller';
import UserModule from 'src/module/users/users.module';
import MessagesService from './messages.service';
import Message from './entities/message.entity';
import MessageFlux from './entities/message-flux.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, MessageFlux]),
    UserModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export default class MessagesModule { }
