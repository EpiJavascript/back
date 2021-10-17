import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';

import JwtPayloadInterface from '../../common/interfaces/jwt-payload';
import { Payload } from '../../common/decorators/payload.decorator';
import { CreateServerDto, UpdateServerDto } from './dto';
import AuthGuard from '../../common/guards/auth.guard';
import ServersService from './servers.service';
import { Server } from './entities';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
@ApiTags('servers')
export default class ServersController {
  constructor(private readonly serversService: ServersService) { }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'findAll',
    summary: 'Find all your server',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  findAll(@Payload() payload: JwtPayloadInterface): Promise<Server[]> {
    return this.serversService.findAll(payload.userId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'create',
    summary: 'Create a new server',
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
    summary: 'Update a server (must be server\'s admin)',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  update(@Payload() payload: JwtPayloadInterface, @Param('id') id: string, @Body() updateServerDto: UpdateServerDto, @UploadedFile() image: Express.Multer.File): Promise<UpdateResult> {
    updateServerDto.image = image;
    return this.serversService.update(payload.userId, id, updateServerDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'delete',
    summary: 'Delete a server (must be server\'s admin)',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  remove(@Payload() payload: JwtPayloadInterface, @Param('id') id: string): Promise<DeleteResult> {
    return this.serversService.remove(payload.userId, id);
  }

  @Put(':id/join')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'join',
    summary: 'Join a server',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  join(@Payload() payload: JwtPayloadInterface, @Param('id') id: string): Promise<Server> {
    return this.serversService.join(payload.userId, id);
  }

  @Delete(':id/leave')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'leave',
    summary: 'Leave a server',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  leave(@Payload() payload: JwtPayloadInterface, @Param('id') id: string): Promise<void> {
    return this.serversService.leave(payload.userId, id);
  }
}
