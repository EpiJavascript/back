import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';

import { CreateUserTextChannelDto, UpdateUserTextChannelDto } from './dto';
import JwtPayloadInterface from 'src/common/interfaces/jwt-payload';
import { Payload } from 'src/common/decorators/payload.decorator';
import ChannelsService from './user-channels.service';
import AuthGuard from 'src/common/guards/auth.guard';
import { UserTextChannel } from './entities';
import { CreateMessageDto } from '../messages/dto';
import { Message } from '../messages/entities';

@ApiTags('user-channels')
@Controller()
export default class UserChannelsController {
  constructor(
    private readonly userChannelsService: ChannelsService,
  ) { }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'findAll',
    summary: 'Find all user channels',
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
    summary: 'Create a user channel',
  })
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  create(@Payload() payload: JwtPayloadInterface, @Body() createUserTextChannelDto: CreateUserTextChannelDto): Promise<UserTextChannel> {
    return this.userChannelsService.create(payload.userId, createUserTextChannelDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'update',
    summary: 'Update a user channel',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  update(@Payload() payload: JwtPayloadInterface, @Param('id') id: string, @Body() updateUserTextChannelDto: UpdateUserTextChannelDto): Promise<UpdateResult> {
    return this.userChannelsService.update(payload.userId, id, updateUserTextChannelDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'delete',
    summary: 'Delete a user channel',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  delete(@Payload() payload: JwtPayloadInterface, @Param('id') id: string): Promise<DeleteResult> {
    return this.userChannelsService.remove(payload.userId, id);
  }

  @Get(':id/messages')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'listMessages',
    summary: 'Find all channel messages',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  findMessages(@Param('id') id: string, @Payload() payload: JwtPayloadInterface): Promise<Message[]> {
    return this.userChannelsService.findMessages(payload.userId, id);
  }

  @Post(':id/messages')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'postMessage',
    summary: 'Create a new message',
  })
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  postMessage(@Param('id') id: string, @Payload() payload: JwtPayloadInterface, @Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.userChannelsService.postMessage(payload.userId, id, createMessageDto);
  }
}
