import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import JwtPayloadInterface from '../../common/interfaces/jwt-payload';
import { Payload } from '../../common/decorators/payload.decorator';
import { FriendRequestEnum } from './enums/friend-request.enum';
import FriendRequest from './entities/friend-request.entity';
import AuthGuard from '../../common/guards/auth.guard';
import User from '../users/entities/user.entity';
import FriendRequestsService from './friend-requests.service';

@Controller()
@ApiTags('friend-requests')
export default class FriendRequestsController {
  constructor(private readonly friendRequestsService: FriendRequestsService) { }

  @Post(':userId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'create',
    description: 'Create a friend request',
  })
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.FORBIDDEN)
  create(@Payload() payload: JwtPayloadInterface, @Param('userId') userId: string): Promise<FriendRequest> {
    return this.friendRequestsService.create(payload.userId, userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'findAllReceived',
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
  findAllReceived(@Payload() payload: JwtPayloadInterface, @Query('type') types: FriendRequestEnum[]): Promise<FriendRequest[]> {
    if (!types) {
      types = Object.values(FriendRequestEnum);
    }
    if (typeof types == 'string') {
      types = [types];
    }
    types = types.filter((value) => {
      return Object.values(FriendRequestEnum).includes(value);
    });
    return this.friendRequestsService.findAllReceived(payload.userId, types);
  }

  @Get('created')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('friend-requests')
  @ApiOperation({
    operationId: 'findAllCreated',
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
  findAllFriendRequestsCreated(@Payload() payload: JwtPayloadInterface, @Query('type') types: FriendRequestEnum[]): Promise<FriendRequest[]> {
    if (!types) {
      types = Object.values(FriendRequestEnum);
    }
    if (typeof types == 'string') {
      types = [types];
    }
    types = types.filter((value) => {
      return Object.values(FriendRequestEnum).includes(value);
    });
    return this.friendRequestsService.findAllCreated(payload.userId, types);
  }

  @Get(':friendRequestId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'accept',
    description: 'Accept a friend request',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  acceptFriendRequest(@Payload() payload: JwtPayloadInterface, @Param('friendRequestId') friendRequestId: string): Promise<User> {
    console.log(friendRequestId);
    return this.friendRequestsService.accept(payload.userId, friendRequestId);
  }

  @Delete(':friendRequestId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'refuse',
    description: 'Refuse a friend request',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  refuseFriendRequest(@Payload() payload: JwtPayloadInterface, @Param('friendRequestId') friendRequestId: string): Promise<void> {
    return this.friendRequestsService.refuse(payload.userId, friendRequestId);
  }
}
