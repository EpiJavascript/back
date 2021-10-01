import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import ChannelsController from './channels.controller';
import ChannelsService from './channels.service';
import Channel from './entities/channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channel])],
  controllers: [ChannelsController],
  providers: [ChannelsService],
  exports: [ChannelsService],
})
export default class ChannelsModule { }
