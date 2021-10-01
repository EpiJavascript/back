import { Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Payload } from '../../common/decorators/payload.decorator';
import JwtPayloadInterface from 'src/common/interfaces/jwt-payload';
import AuthGuard from 'src/common/guards/auth.guard';
import UsersService from './users.service';
import User from './entities/user.entity';

@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {
    this.usersService = usersService;
  }

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

  @Post(':userId/friend-request')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('friend-requests')
  @ApiOperation({
    operationId: 'create',
    description: 'Create a friend request',
  })
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.FORBIDDEN)
  createFriendRequest(@Payload() payload: JwtPayloadInterface, @Param(':userId') userId: string): Promise<User[]> {
    console.log(payload); // test purpose
    console.log(userId);
    return this.usersService.findAll();
  }
}
