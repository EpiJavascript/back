import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import JwtPayloadInterface from '../../common/interfaces/jwt-payload';
import { Payload } from '../../common/decorators/payload.decorator';
import AuthGuard from '../../common/guards/auth.guard';
import CreateServerDto from './dto/server.create.dto';
import ServersService from './servers.service';
import server from './entities/server.entity';
import Server from './entities/server.entity';

@Controller()
@ApiTags('servers')
export default class ServersController {
  constructor(private readonly serversService: ServersService) {
    this.serversService = serversService;
  }

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
