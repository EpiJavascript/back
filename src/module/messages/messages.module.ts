import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import MessagesController from './messages.controller';
import UserModule from 'src/module/users/users.module';
import { Message, MessageFlux } from './entities';
import MessagesService from './messages.service';

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
