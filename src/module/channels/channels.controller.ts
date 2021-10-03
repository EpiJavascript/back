import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import JwtPayloadInterface from 'src/common/interfaces/jwt-payload';
import { Payload } from 'src/common/decorators/payload.decorator';
import CreateChannelDto from './dto/channel.create.dto';
import AuthGuard from 'src/common/guards/auth.guard';
import ChannelsService from './channels.service';
import Channel from './entities/channel.entity';

@Controller('channels')
export default class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {
    this.channelsService = channelsService;
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('channels')
  @ApiOperation({
    operationId: 'findAll',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  findAll(@Payload() payload: JwtPayloadInterface): Promise<Channel[]> {
    return this.channelsService.findAll(payload.userId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('channels')
  @ApiOperation({
    operationId: 'post',
  })
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.FORBIDDEN)
  create(@Body() createChannelDto: CreateChannelDto): Promise<Channel> {
    return this.channelsService.create(createChannelDto);
  }
}
