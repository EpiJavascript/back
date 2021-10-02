import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Any, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOneOrFail(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
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
  async createFriendRequest(userId: string, requestedUserId: string): Promise<FriendRequest> {
    const user: User = await this.findOneOrFail(requestedUserId);
    if (user.id == requestedUserId) {
      throw new HttpException('Cannot self request as friend', HttpStatus.BAD_REQUEST);
    }
    const friendRequest: FriendRequest = this.friendRequestsReposiroty.create({
      user,
      createdBy: userId,
      lastUpdatedBy: userId,
    });
    return this.friendRequestsReposiroty.save(friendRequest);
  }

  findAllFriendRequestReceived(userId: string, types: FriendRequestEnum[]): Promise<FriendRequest[]> {
    return this.friendRequestsReposiroty.find({
      where: {
        user: {
          id: userId,
        },
        type: Any(types),
      },
    });
  }

  findAllFriendRequestCreated(userId: string, types: FriendRequestEnum[]): Promise<FriendRequest[]> {
    return this.friendRequestsReposiroty.find({
      where: {
        createdBy: userId,
        type: Any(types),
      },
    });
  }
}