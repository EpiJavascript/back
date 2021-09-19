import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ChannelService from './channel.service';
import Channel from './channel.entity';
import ChannelController from './channel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Channel])],
  controllers: [ChannelController],
  providers: [ChannelService],
  exports: [ChannelService],
})
export default class ChannelModule { }
