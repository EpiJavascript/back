import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import ChannelsService from './user-channels.service';
import MessagesService from '../messages/messages.service';
import AuthGuard from 'src/common/guards/auth.guard';
import JwtPayloadInterface from 'src/common/interfaces/jwt-payload';
import { Payload } from 'src/common/decorators/payload.decorator';
import UserTextChannel from './entities/user-text-channel.entity';
import { CreateUserTextChannelDto } from './dto';

@ApiTags()
@Controller()
export default class UserChannelsController {
  constructor(
    private readonly userChannelsService: ChannelsService,
    private readonly userMessagesService: MessagesService) { }


  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'findAll',
    description: 'Find all user channels',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  findAll(@Payload() payload: JwtPayloadInterface): Promise<UserTextChannel[]> {
    return this.userChannelsService.findAll(payload.userId);
  }


  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'create',
    description: 'Create a user channel',
  })
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  createChannel(@Payload() payload: JwtPayloadInterface, @Body() createUserTextChannelDto: CreateUserTextChannelDto): Promise<UserTextChannel> {
    return this.userChannelsService.create(payload.userId, createUserTextChannelDto);
  }

}
