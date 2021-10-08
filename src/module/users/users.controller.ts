import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';

import JwtPayloadInterface from '../../common/interfaces/jwt-payload';
import { Payload } from '../../common/decorators/payload.decorator';
import AuthGuard from '../../common/guards/auth.guard';
import UsersService from './users.service';
import { UpdateUserDto } from './dto';
import { User } from './entities';

@Controller()
export default class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('users')
  @ApiOperation({
    operationId: 'findAll',
    description: 'Find all the users',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  findAll(@Payload() payload: JwtPayloadInterface): Promise<User[]> {
    console.log(payload); // test purpose
    return this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('users')
  @ApiOperation({
    operationId: 'findSelf',
    description: 'Find all the users',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  findSelf(@Payload() payload: JwtPayloadInterface): Promise<User> {
    return this.usersService.findOne(payload.userId);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('users')
  @ApiOperation({
    operationId: 'update',
    description: 'Update a user',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  update(@Payload() payload: JwtPayloadInterface, @Param('id') id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersService.update(payload.userId, id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('users')
  @ApiOperation({
    operationId: 'delete',
    description: 'Delete a user',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  delete(@Payload() payload: JwtPayloadInterface, @Param('id') id: string): Promise<DeleteResult> {
    return this.usersService.remove(payload.userId, id);
  }

  @Get('friends')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('friends')
  @ApiOperation({
    operationId: 'findAllFriends',
    description: 'Find all friends',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  findAllFriends(@Payload() payload: JwtPayloadInterface): Promise<User[]> {
    return this.usersService.findAllFriends(payload.userId);
  }

  @Delete('friend/:friendUserId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('friends')
  @ApiOperation({
    operationId: 'removeFriend',
    description: 'Remove a friend',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  removeFriend(@Payload() payload: JwtPayloadInterface, @Param('friendUserId') friendUserId: string): Promise<void> {
    return this.usersService.removeFriend(payload.userId, friendUserId);
  }
}
