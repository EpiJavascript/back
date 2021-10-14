import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateServerTextChannelDto, UpdateServerTextChannelDto } from './dto';
import JwtPayloadInterface from 'src/common/interfaces/jwt-payload';
import { Payload } from 'src/common/decorators/payload.decorator';
import ServerChannelsService from './server-channels.service';
import AuthGuard from 'src/common/guards/auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateMessageDto } from '../messages/dto';
import { ServerTextChannel } from './entities';
import { Message } from '../messages/entities';

@Controller()
@ApiTags('server-channels')
export default class UserChannelsController {
  constructor(
    private readonly serverChannelsService: ServerChannelsService,
  ) { }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'findAll',
    description: 'Find all server channels',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  findAll(@Param('serverId') serverId: string, @Payload() payload: JwtPayloadInterface): Promise<ServerTextChannel[]> {
    return this.serverChannelsService.findAll(serverId, payload.userId);
  }


  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'create',
    description: 'Create a server channel',
  })
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  create(@Param('serverId') serverId: string, @Payload() payload: JwtPayloadInterface, @Body() createServerTextChannelDto: CreateServerTextChannelDto): Promise<ServerTextChannel> {
    return this.serverChannelsService.create(payload.userId, serverId, createServerTextChannelDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'update',
    description: 'Update a server channel',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  update(@Param('serverId') serverId: string, @Param('id') id: string, @Payload() payload: JwtPayloadInterface, @Body() updateServerTextChannelDto: UpdateServerTextChannelDto): Promise<UpdateResult> {
    return this.serverChannelsService.update(payload.userId, serverId, id, updateServerTextChannelDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'delete',
    description: 'Delete a server channel',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  delete(@Param('serverId') serverId: string, @Param('id') id: string, @Payload() payload: JwtPayloadInterface): Promise<DeleteResult> {
    return this.serverChannelsService.remove(payload.userId, serverId, id);
  }

  @Get(':id/messages')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'listMessages',
    description: 'Find all channel messages',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  findMessages(@Param('serverId') serverId: string, @Param('id') id: string, @Payload() payload: JwtPayloadInterface): Promise<Message[]> {
    return this.serverChannelsService.findMessages(payload.userId, serverId, id);
  }

  @Post(':id/messages')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'postMessage',
    description: 'Create a new message',
  })
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  postMessage(@Param('serverId') serverId: string, @Param('id') id: string, @Payload() payload: JwtPayloadInterface, @Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.serverChannelsService.postMessage(payload.userId, serverId, id, createMessageDto);
  }
}
