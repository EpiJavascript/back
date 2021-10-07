import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import ServerChannel from './entities/server-text-channel.entity';
import MessagesModule from '../messages/messages.module';
import ServerChannelsController from './server-channels.controller';
import ServersModule from '../servers/servers.module';
import ServerChannelsService from './server-channels.service';
import UsersModule from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServerChannel]),
    MessagesModule,
    ServersModule,
    UsersModule,
  ],
  controllers: [ServerChannelsController],
  providers: [ServerChannelsService],
  exports: [ServerChannelsService],
})
export default class ServerChannelsModule { }
