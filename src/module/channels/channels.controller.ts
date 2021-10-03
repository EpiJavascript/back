import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import JwtPayloadInterface from '../../common/interfaces/jwt-payload';
import { Payload } from '../../common/decorators/payload.decorator';
import CreateChannelDto from './dto/channel.create.dto';
import AuthGuard from '../../common/guards/auth.guard';
import ChannelsService from './channels.service';
import Channel from './entities/channel.entity';
import PrivateChannel from './entities/private-channel.entity';
import CreatePrivateChannelDto from './dto/private-channel.dto';

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
    description: 'Find all channels',
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
    description: 'Create a new channel',
  })
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.FORBIDDEN)
  create(@Payload() payload: JwtPayloadInterface, @Body() createChannelDto: CreateChannelDto): Promise<Channel> {
    return this.channelsService.create(payload.userId, createChannelDto);
  }


  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('channels')
  @ApiOperation({
    operationId: 'findAllPrivate',
    description: 'Find all private channels',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  findAllPrivate(@Payload() payload: JwtPayloadInterface): Promise<PrivateChannel[]> {
    return this.channelsService.findAllPrivate(payload.userId);
  }

  @Post('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('channels')
  @ApiOperation({
    operationId: 'createPrivate',
    description: 'Create a new private channel',
  })
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.FORBIDDEN)
  createPrivate(@Payload() payload: JwtPayloadInterface, @Body() createPrivateChannelDto: CreatePrivateChannelDto): Promise<PrivateChannel> {
    return this.channelsService.createPrivate(payload.userId, createPrivateChannelDto);
  }

}
