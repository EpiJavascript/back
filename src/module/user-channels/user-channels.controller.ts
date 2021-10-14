import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';

import { CreateUserTextChannelDto, UpdateUserTextChannelDto } from './dto';
import JwtPayloadInterface from 'src/common/interfaces/jwt-payload';
import { Payload } from 'src/common/decorators/payload.decorator';
import ChannelsService from './user-channels.service';
import AuthGuard from 'src/common/guards/auth.guard';
import { UserTextChannel } from './entities';

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
  create(@Payload() payload: JwtPayloadInterface, @Body() createUserTextChannelDto: CreateUserTextChannelDto): Promise<UserTextChannel> {
    return this.userChannelsService.create(payload.userId, createUserTextChannelDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'update',
    description: 'Update a user channel',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  update(@Payload() payload: JwtPayloadInterface, @Param('id') id: string, updateUserTextChannelDto: UpdateUserTextChannelDto): Promise<UpdateResult> {
    return this.userChannelsService.update(payload.userId, id, updateUserTextChannelDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'delete',
    description: 'Delete a user channel',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  delete(@Payload() payload: JwtPayloadInterface, @Param('id') id: string): Promise<DeleteResult> {
    return this.userChannelsService.remove(payload.userId, id);
  }
}
