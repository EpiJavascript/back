import { Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { FriendRequestEnum } from './enums/friend-request.enum';
import { Payload } from '../../common/decorators/payload.decorator';
import JwtPayloadInterface from 'src/common/interfaces/jwt-payload';
import FriendRequest from './entities/friend-request.entity';
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
  createFriendRequest(@Payload() payload: JwtPayloadInterface, @Param(':userId') userId: string): Promise<FriendRequest> {
    return this.usersService.createFriendRequest(payload.userId, userId);
  }

  @Get('friend-request')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('friend-requests')
  @ApiOperation({
    operationId: 'findAllFriendRequestReceived',
    description: 'Find all received friend requests',
  })
  @ApiQuery({
    isArray: true,
    allowEmptyValue: true,
    enum: FriendRequestEnum,
    example: [FriendRequestEnum.ACCEPTED, FriendRequestEnum.PENDING, FriendRequestEnum.REFUSED],
    name: 'type',
  })
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.FORBIDDEN)
  findAllFriendRequestReceived(@Payload() payload: JwtPayloadInterface, @Query('type') types: FriendRequestEnum[]): Promise<FriendRequest[]> {
    if (!types) {
      types = Object.values(FriendRequestEnum);
    }
    types = types.filter((value) => {
      return Object.values(FriendRequestEnum).includes(value);
    });
    return this.usersService.findAllFriendRequestReceived(payload.userId, types);
  }

  @Get('friend-request-created')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('friend-requests')
  @ApiOperation({
    operationId: 'findAllFriendRequestCreated',
    description: 'Find all created friend requests',
  })
  @ApiQuery({
    isArray: true,
    allowEmptyValue: true,
    enum: FriendRequestEnum,
    example: [FriendRequestEnum.ACCEPTED, FriendRequestEnum.PENDING, FriendRequestEnum.REFUSED],
    name: 'type',
  })
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.FORBIDDEN)
  findAllFriendRequestCreated(@Payload() payload: JwtPayloadInterface, @Query('type') types: FriendRequestEnum[]): Promise<FriendRequest[]> {
    if (!types) {
      types = Object.values(FriendRequestEnum);
    }
    types = types.filter((value) => {
      return Object.values(FriendRequestEnum).includes(value);
    });
    return this.usersService.findAllFriendRequestCreated(payload.userId, types);
  }


  /**
   * TODO
   * GET /friend-request/:friendRequestId
   * DELETE /friend-request/:friendRequestId
   */
}
