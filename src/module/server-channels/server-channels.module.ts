import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import ServerChannelsController from './server-channels.controller';
import ServerChannelsService from './server-channels.service';
import MessagesModule from '../messages/messages.module';
import ServersModule from '../servers/servers.module';
import UsersModule from '../users/users.module';
import { ServerTextChannel } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServerTextChannel]),
    MessagesModule,
    ServersModule,
    UsersModule,
  ],
  controllers: [ServerChannelsController],
  providers: [ServerChannelsService],
  exports: [ServerChannelsService],
})
export default class ServerChannelsModule { }
