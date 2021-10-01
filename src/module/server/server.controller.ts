import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import AuthGuard from 'src/common/guards/auth.guard';
import server from './server.entity';
import ServerService from './server.service';
import { Payload } from '../../common/decorators/payload.decorator';
import JwtPayloadInterface from 'src/common/interfaces/jwt-payload';
import CreateServerDto from './dto/server.create.dto';
import Server from './server.entity';

@Controller('server')
export default class ServerController {
  constructor(private readonly serverService: ServerService) {
    this.serverService = serverService;
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('server')
  @ApiOperation({
    operationId: 'findAll',
    description: 'Find all your server',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  findAll(@Payload() payload: JwtPayloadInterface): Promise<server[]> {
    return this.serverService.findAll(payload.userId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('server')
  @ApiOperation({
    operationId: 'create',
    description: 'Create a new server',
  })
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.FORBIDDEN)
  create(@Payload() payload: JwtPayloadInterface, @Body() createServerDto: CreateServerDto): Promise<Server> {
    return this.serverService.create(payload.userId, createServerDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('server')
  @ApiOperation({
    operationId: 'delete',
    description: 'Delete a server (must be server\'s admin)',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  remove(@Payload() payload: JwtPayloadInterface, @Param('id') id: string): Promise<void> {
    return this.serverService.remove(payload.userId, id);
  }
}
