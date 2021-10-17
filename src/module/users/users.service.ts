import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';

import HttpCustomStatus from '../../common/enums/http-custom-status.enum';
import { EventsGateway } from '../../websocket/events.gateway';
import hashPassword from '../../common/helpers/hash-password';
import WsEmitMessage from '../../common/enums/ws.enum';
import { CreateUserDto, UpdateUserDto } from './dto';
import ImgurService from '../imgur/imgur.service';
import { User } from './entities';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private eventsGateway: EventsGateway,
    private imgurService: ImgurService,
  ) { }

  // Users
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id, {
      relations: ['friends', 'servers', 'userTextChannels'],
    });
  }

  public findOneOrFail(id: string): Promise<User> {
    return this.usersRepository.findOne(id, {
      relations: ['friends', 'servers'],
    });
  }

  findByIds(ids: string[], relations = []): Promise<User[]> {
    return this.usersRepository.findByIds(ids, {
      relations,
    });
  }

  findByEmail(email: string, includePassword = false): Promise<User> {
    return this.usersRepository.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect(includePassword ? 'user.password' : undefined)
      .getOne();
  }

  remove(userId: string, id: string): Promise<DeleteResult> {
    if (userId != id) {
      throw new UnauthorizedException();
    }
    return this.usersRepository.delete(id);
  }

  async update(userId: string, id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    if (userId != id) {
      throw new UnauthorizedException();
    }
    const imageUrl = await this.imgurService.uploadImage(updateUserDto.image);
    delete updateUserDto.image;
    updateUserDto.password = updateUserDto.password ? hashPassword(updateUserDto.password) : undefined;
    return this.usersRepository.update(id, {
      ...updateUserDto,
      imageUrl,
      lastUpdatedBy: userId,
    });
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
      throw new HttpException('email_already_taken', HttpCustomStatus.EMAIL_ALREADY_TAKEN);
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

  // Friends
  async findAllFriends(userId: string): Promise<User[]> {
    const user: User = await this.usersRepository.findOneOrFail(userId, {
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

    // check if user is friend with other user
    if (!user.friendIds.includes(otherId)) {
      throw new HttpException('not_friend_with_user', HttpCustomStatus.NOT_FRIEND_WITH_USER);
    }

    user.friends = user.friends.filter((val: User) => {
      return val.id != otherId;
    });
    otherUser.friends = otherUser.friends.filter((val: User) => {
      return val.id != userId;
    });

    // send notification
    const connected: Map<string, Socket> = this.eventsGateway.getConnected();
    const socket: Socket = connected.get(otherUser.id);
    if (socket !== undefined) {
      this.eventsGateway.send(socket, WsEmitMessage.FRIEND_LIST_UPDATED, {});
    }

    await this.usersRepository.save(otherUser);
    await this.usersRepository.save(user);
  }
}