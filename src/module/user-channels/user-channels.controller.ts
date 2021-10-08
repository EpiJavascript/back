import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import JwtPayloadInterface from 'src/common/interfaces/jwt-payload';
import { Payload } from 'src/common/decorators/payload.decorator';
import ChannelsService from './user-channels.service';
import AuthGuard from 'src/common/guards/auth.guard';
import { CreateUserTextChannelDto } from './dto';
import { UserTextChannel } from './entities';

@ApiTags()
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
