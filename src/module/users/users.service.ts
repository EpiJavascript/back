import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Repository } from 'typeorm';

import { FriendRequestEnum } from './enums/friend-request.enum';
import FriendRequest from './entities/friend-request.entity';
import CreateUserDto from './dto/user.create.dto';
import User from './entities/user.entity';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(FriendRequest)
    private readonly friendRequestsReposiroty: Repository<FriendRequest>,
  ) { }

  // Users
  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['friends', 'servers'],
    });
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id, {
      relations: ['friends', 'servers'],
    });
  }

  findOneOrFail(id: string): Promise<User> {
    return this.usersRepository.findOne(id, {
      relations: ['friends', 'servers'],
    });
  }

  findByEmail(email: string, includePassword = false): Promise<User> {
    return this.usersRepository.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect(includePassword ? 'user.password' : undefined)
      .getOne();
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(userId: string | null, createUserDto: CreateUserDto): Promise<User> {
    const user: User = this.usersRepository.create({
      ...createUserDto,
      createdBy: userId,
      lastUpdatedBy: userId,
    });
    // Check if email is already taken
    const duplicateUser: User = await this.usersRepository.findOne({ email: createUserDto.email });
    if (duplicateUser) {
      throw new HttpException('email already taken', HttpStatus.CONFLICT);
    }

    // Set createBy and lastUpdatedBy properly
    const newUser: User = await this.usersRepository.save(user);
    if (newUser.createdBy == null) {
      newUser.createdBy = newUser.id;
      newUser.lastUpdatedBy = newUser.id;
      return this.usersRepository.save({
        id: newUser.id,
        ...newUser,
      });
    }
    return newUser;
  }

  // Friend requests
  async createFriendRequest(userId: string, otherUserId: string): Promise<FriendRequest> {
    // TODO check if users are already friends
    const user: User = await this.usersRepository.findOneOrFail(otherUserId);
    if (userId == otherUserId) {
      throw new HttpException('Cannot self request as friend', HttpStatus.BAD_REQUEST);
    }

    // Check if a friend request is already pending
    const tmp: FriendRequest[] = await this.friendRequestsReposiroty.find({
      relations: ['user'],
      where: {
        createdBy: userId,
        user: {
          id: otherUserId,
        },
        type: FriendRequestEnum.PENDING,
      },
    });
    if (tmp.length) {
      throw new HttpException('Friend request already pending', HttpStatus.BAD_REQUEST);
    }

    const friendRequest: FriendRequest = this.friendRequestsReposiroty.create({
      user,
      createdBy: userId,
      lastUpdatedBy: userId,
    });
    return this.friendRequestsReposiroty.save(friendRequest);
  }

  findAllFriendRequestsReceived(userId: string, types: FriendRequestEnum[]): Promise<FriendRequest[]> {
    return this.friendRequestsReposiroty.find({
      where: {
        user: {
          id: userId,
        },
        type: Any(types),
      },
      relations: ['user'],
    });
  }

  findAllFriendRequestsCreated(userId: string, types: FriendRequestEnum[]): Promise<FriendRequest[]> {
    return this.friendRequestsReposiroty.find({
      where: {
        createdBy: userId,
        type: Any(types),
      },
      relations: ['user'],
    });
  }

  async acceptFriendRequest(userId: string, friendRequestId: string): Promise<User> {
    const friendRequest: FriendRequest = await this.friendRequestsReposiroty.findOneOrFail(friendRequestId, {
      relations: ['user'],
    });
    const actualUser: User = await this.usersRepository.findOneOrFail(userId, {
      relations: ['friends'],
    });
    const otherUser: User = await this.usersRepository.findOneOrFail(friendRequest.createdBy, {
      relations: ['friends'],
    });

    console.log('otherUser', otherUser);
    // Check if friendRequest has been resolved and targeted user is the actual user
    if (friendRequest.type != FriendRequestEnum.PENDING || friendRequest.user.id != userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    // update friend request (might delete it)
    friendRequest.type = FriendRequestEnum.ACCEPTED;
    await this.friendRequestsReposiroty.save(friendRequest);

    // update users
    actualUser.friends.push(otherUser);
    otherUser.friends.push(actualUser);
    await this.usersRepository.save(otherUser);
    await this.usersRepository.save(actualUser);
    return this.usersRepository.findOneOrFail(userId, {
      relations: ['friends'],
    });
  }

  async refuseFriendRequest(userId: string, friendRequestId: string): Promise<void> {
    const friendRequest: FriendRequest = await this.friendRequestsReposiroty.findOneOrFail(friendRequestId, {
      relations: ['user'],
    });

    // Check if friendRequest has been resolved and targeted user is the actual user
    if (friendRequest.type != FriendRequestEnum.PENDING || friendRequest.user.id != userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    // update friend request (might delete it)
    friendRequest.type = FriendRequestEnum.REFUSED;
    await this.friendRequestsReposiroty.save(friendRequest);
  }

  // Friends
  async findAllFriends(userId: string) : Promise<User[]> {
    const user : User = await this.usersRepository.findOneOrFail(userId, {
      relations: ['friends'],
    });
    return user.friends;
  }

  async removeFriend(userId: string, otherId: string): Promise<void> {
    const otherUser: User = await this.usersRepository.findOneOrFail(otherId, {
      relations: ['friends'],
    });
    const user: User = await this.usersRepository.findOneOrFail(userId, {
      relations: ['friends'],
    });

    // checkf if user is friend with other user
    if (!user.friendIds.includes(otherId)) {
      throw new HttpException('You are not friend with this user', HttpStatus.BAD_REQUEST);
    }

    user.friends = user.friends.filter((val: User) => {
      return val.id != otherId;
    });
    otherUser.friends = otherUser.friends.filter((val: User) => {
      return val.id != userId;
    });

    await this.usersRepository.save(otherUser);
    await this.usersRepository.save(user);
  }
}