import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import PrivateChannel from './entities/private-channel.entity';
import ChannelsController from './channels.controller';
import ServersModule from '../servers/servers.module';
import ChannelsService from './channels.service';
import Channel from './entities/channel.entity';
import UsersModule from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Channel]),
    TypeOrmModule.forFeature([PrivateChannel]),
    ServersModule,
    UsersModule,
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService],
  exports: [ChannelsService],
})
export default class ChannelsModule { }
