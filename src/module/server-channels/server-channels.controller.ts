import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import ServerTextChannel from './entities/server-text-channel.entity';
import JwtPayloadInterface from 'src/common/interfaces/jwt-payload';
import { Payload } from 'src/common/decorators/payload.decorator';
import ServerChannelsService from './server-channels.service';
import AuthGuard from 'src/common/guards/auth.guard';
import { CreateServerTextChannelDto } from './dto';

@Controller()
@ApiTags('serverChannels')
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
  createChannel(@Param('serverId') serverId: string, @Payload() payload: JwtPayloadInterface, @Body() createServerTextChannelDto: CreateServerTextChannelDto): Promise<ServerTextChannel> {
    return this.serverChannelsService.create(payload.userId, serverId, createServerTextChannelDto);
  }

  // delete + update
}
