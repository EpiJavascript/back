import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import ServerChannelsController from './server-channels.controller';
import ServerChannelsService from './server-channels.service';
import { Message, MessageFlux } from '../messages/entities';
import EventsModule from '../../websocket/events.module';
import ServersModule from '../servers/servers.module';
import UsersModule from '../users/users.module';
import { ServerTextChannel } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServerTextChannel, Message, MessageFlux]),
    ServersModule,
    EventsModule,
    UsersModule,
  ],
  controllers: [ServerChannelsController],
  providers: [ServerChannelsService],
  exports: [ServerChannelsService],
})
export default class ServerChannelsModule { }
