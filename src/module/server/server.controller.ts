import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
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
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  findAll(@Payload() payload: JwtPayloadInterface): Promise<server[]> {
    console.log(payload); // test purpose
    return this.serverService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('server')
  @ApiOperation({
    operationId: 'create',
  })
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.FORBIDDEN)
  create(@Payload() payload: JwtPayloadInterface, @Body() createServerDto: CreateServerDto): Promise<Server> {
    return this.serverService.create(payload.userId, createServerDto);
  }
}
