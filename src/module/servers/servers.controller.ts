import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';

import JwtPayloadInterface from '../../common/interfaces/jwt-payload';
import { Payload } from '../../common/decorators/payload.decorator';
import { CreateServerDto, UpdateServerDto } from './dto';
import AuthGuard from '../../common/guards/auth.guard';
import ServersService from './servers.service';
import server from './entities/server.entity';
import Server from './entities/server.entity';

@Controller()
@ApiTags('servers')
export default class ServersController {
  constructor(private readonly serversService: ServersService) { }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'findAll',
    description: 'Find all your server',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  findAll(@Payload() payload: JwtPayloadInterface): Promise<server[]> {
    return this.serversService.findAll(payload.userId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'create',
    description: 'Create a new server',
  })
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.FORBIDDEN)
  create(@Payload() payload: JwtPayloadInterface, @Body() createServerDto: CreateServerDto): Promise<Server> {
    return this.serversService.create(payload.userId, createServerDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'update',
    description: 'Update a server (must be server\'s admin)',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  update(@Payload() payload: JwtPayloadInterface, @Param('id') id: string, updateServerDto: UpdateServerDto): Promise<UpdateResult> {
    return this.serversService.update(payload.userId, id, updateServerDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'delete',
    description: 'Delete a server (must be server\'s admin)',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  remove(@Payload() payload: JwtPayloadInterface, @Param('id') id: string): Promise<void> {
    return this.serversService.remove(payload.userId, id);
  }
}
