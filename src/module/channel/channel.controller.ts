import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import AuthGuard from '../../common/guards/auth.guard';
import Channel from './channel.entity';
import ChannelService from './channel.service';

@Controller('channel')
export default class ChannelController {
  constructor(private readonly channelService: ChannelService) {
    this.channelService = channelService;
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('channel')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  findAll(): Promise<Channel[]> {
    return this.channelService.findAll();
  }
}
