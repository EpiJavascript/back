import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Repository } from 'typeorm';

import UsersService from '../users/users.service';
import { FriendRequestEnum } from './enums';
import { FriendRequest } from './entities';
import { User } from '../users/entities';
import HttpCustomStatus from 'src/common/enums/http-custom-status.enum';

@Injectable()
export default class FriendRequestsService {
  constructor(
    @InjectRepository(FriendRequest)
    private readonly friendRequestsReposiroty: Repository<FriendRequest>,
    private readonly usersService: UsersService,
  ) { }

  // Friend requests
  async create(userId: string, otherUserId: string): Promise<FriendRequest> {
    // TODO check if users are already friends
    const otherUser: User = await this.usersService.findOneOrFail(otherUserId);
    const user: User = await this.usersService.findOneOrFail(userId);
    if (userId == otherUserId) {
      throw new HttpException('self_friend_request', HttpCustomStatus.CANNOT_SELF_FRIEND_REQUEST);
    }

    // Check if a friend request is already pending
    const tmp: FriendRequest[] = await this.friendRequestsReposiroty.find({
      relations: ['requestedUser'],
      where: {
        createdBy: userId,
        requestedUser: {
          id: otherUserId,
        },
        type: FriendRequestEnum.PENDING,
      },
    });
    if (tmp.length) {
      throw new HttpException('friend_request_already_pending', HttpCustomStatus.FRIEND_REQUEST_ALREADY_PENDING);
    }

    const friendRequest: FriendRequest = this.friendRequestsReposiroty.create({
      requestedUser: otherUser,
      createdByUser: user,
      createdBy: userId,
      lastUpdatedBy: userId,
    });
    return this.friendRequestsReposiroty.save(friendRequest);
  }

  findAllReceived(userId: string, types: FriendRequestEnum[]): Promise<FriendRequest[]> {
    // Should left join user on createdBy
    return this.friendRequestsReposiroty.find({
      where: {
        requestedUser: {
          id: userId,
        },
        type: Any(types),
      },
      relations: ['requestedUser', 'createdByUser'],
    });
  }

  findAllCreated(userId: string, types: FriendRequestEnum[]): Promise<FriendRequest[]> {
    return this.friendRequestsReposiroty.find({
      where: {
        createdBy: userId,
        type: Any(types),
      },
      relations: ['requestedUser'],
    });
  }

  async accept(userId: string, friendRequestId: string): Promise<User> {
    const friendRequest: FriendRequest = await this.friendRequestsReposiroty.findOneOrFail(friendRequestId, {
      relations: ['requestedUser'],
    });
    const actualUser: User = await this.usersService.findOneOrFail(userId);
    const otherUser: User = await this.usersService.findOneOrFail(friendRequest.createdBy);

    // Check if friendRequest has been resolved and targeted user is the actual user
    if (friendRequest.type != FriendRequestEnum.PENDING || friendRequest.requestedUser.id != userId) {
      throw new UnauthorizedException();
    }

    // update friend request (might delete it)
    friendRequest.type = FriendRequestEnum.ACCEPTED;
    await this.friendRequestsReposiroty.save(friendRequest);

    // update users
    actualUser.friends.push(otherUser);
    otherUser.friends.push(actualUser);
    await this.usersService.update(otherUser.id, otherUser.id, otherUser);
    await this.usersService.update(actualUser.id, actualUser.id, actualUser);
    return this.usersService.findOneOrFail(userId);
  }

  async refuse(userId: string, friendRequestId: string): Promise<void> {
    const friendRequest: FriendRequest = await this.friendRequestsReposiroty.findOneOrFail(friendRequestId, {
      relations: ['user'],
    });

    // Check if friendRequest has been resolved and targeted user is the actual user
    if (friendRequest.type != FriendRequestEnum.PENDING || friendRequest.requestedUser.id != userId) {
      throw new UnauthorizedException();
    }

    // update friend request (might delete it)
    friendRequest.type = FriendRequestEnum.REFUSED;
    await this.friendRequestsReposiroty.save(friendRequest);
  }
}