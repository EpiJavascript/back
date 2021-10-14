import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import ServerChannelsController from './server-channels.controller';
import ServerChannelsService from './server-channels.service';
import ServersModule from '../servers/servers.module';
import UsersModule from '../users/users.module';
import { ServerTextChannel } from './entities';
import { Message } from '../messages/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServerTextChannel, Message]),
    ServersModule,
    UsersModule,
  ],
  controllers: [ServerChannelsController],
  providers: [ServerChannelsService],
  exports: [ServerChannelsService],
})
export default class ServerChannelsModule { }
