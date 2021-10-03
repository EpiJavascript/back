import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import JwtPayloadInterface from '../../common/interfaces/jwt-payload';
import { Payload } from '../../common/decorators/payload.decorator';
import { FriendRequestEnum } from './enums/friend-request.enum';
import FriendRequest from './entities/friend-request.entity';
import AuthGuard from '../../common/guards/auth.guard';
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
  createFriendRequest(@Payload() payload: JwtPayloadInterface, @Param('userId') userId: string): Promise<FriendRequest> {
    return this.usersService.createFriendRequest(payload.userId, userId);
  }

  @Get('friend-requests')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('friend-requests')
  @ApiOperation({
    operationId: 'findAllFriendRequestsReceived',
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
  findAllFriendRequestsReceived(@Payload() payload: JwtPayloadInterface, @Query('type') types: FriendRequestEnum[]): Promise<FriendRequest[]> {
    if (!types) {
      types = Object.values(FriendRequestEnum);
    }
    if (typeof types == 'string') {
      types = [types];
    }
    types = types.filter((value) => {
      return Object.values(FriendRequestEnum).includes(value);
    });
    return this.usersService.findAllFriendRequestsReceived(payload.userId, types);
  }

  @Get('friend-requests-created')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('friend-requests')
  @ApiOperation({
    operationId: 'findAllFriendRequestsCreated',
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
    return this.usersService.findAllFriendRequestsCreated(payload.userId, types);
  }

  @Get('friend-request/:friendRequestId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('friend-requests')
  @ApiOperation({
    operationId: 'acceptFriendRequest',
    description: 'Accept a friend request',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  acceptFriendRequest(@Payload() payload: JwtPayloadInterface, @Param('friendRequestId') friendRequestId: string): Promise<User> {
    console.log(friendRequestId);
    return this.usersService.acceptFriendRequest(payload.userId, friendRequestId);
  }

  @Delete('friend-request/:friendRequestId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('friend-requests')
  @ApiOperation({
    operationId: 'refuseFriendRequest',
    description: 'Refuse a friend request',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  refuseFriendRequest(@Payload() payload: JwtPayloadInterface, @Param('friendRequestId') friendRequestId: string): Promise<void> {
    return this.usersService.refuseFriendRequest(payload.userId, friendRequestId);
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
