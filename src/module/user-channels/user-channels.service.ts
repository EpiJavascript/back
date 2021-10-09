import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import UsersService from '../users/users.service';
import { CreateUserTextChannelDto, UpdateUserTextChannelDto } from './dto';
import { UserTextChannel } from './entities';
import { User } from '../users/entities';

function generateChannelName(users: User[]): string {
  return users.map((value: User) => {return value.username;}).join(', ');
}
@Injectable()
export default class UserChannelsService {
  constructor(
    @InjectRepository(UserTextChannel)
    private userTextChannelsRepository: Repository<UserTextChannel>,
    private usersService: UsersService,
  ) { }
  
  findAll(userId: string): Promise<UserTextChannel[]> {
    return this.userTextChannelsRepository.find({
      where: {
        users: {
          id: In([userId]),
        },
      },
      relations: ['users'],
    });
  }

  findOne(id: string): Promise<UserTextChannel> {
    return this.userTextChannelsRepository.findOne(id);
  }

  findOneOrFail(id: string): Promise<UserTextChannel> {
    return this.userTextChannelsRepository.findOneOrFail(id);
  }

  async create(userId: string, createUserTextChannelDto: CreateUserTextChannelDto): Promise<UserTextChannel> {
    const users: User[] = await this.usersService.findByIds(createUserTextChannelDto.userIds);
    const userTextChannel: UserTextChannel = this.userTextChannelsRepository.create({
      ...createUserTextChannelDto,
      name: generateChannelName(users),
      users,
      createdBy: userId,
      lastUpdatedBy: userId,
    });
    return this.userTextChannelsRepository.save(userTextChannel);
  }

  async remove(userId: string, id: string): Promise<DeleteResult> {
    const userTextChannel: UserTextChannel = await this.userTextChannelsRepository.findOneOrFail(id);
    if (!userTextChannel.userIds.includes(userId)) {
      throw new UnauthorizedException();
    }
    return this.userTextChannelsRepository.delete(id);
  }

  async update(userId: string, id: string, updateUserTextChannelDto: UpdateUserTextChannelDto): Promise<UpdateResult> {
    const users: User[] = await this.usersService.findByIds(updateUserTextChannelDto.userIds);
    const userTextChannel: UserTextChannel = await this.userTextChannelsRepository.findOneOrFail(id);
    if (!userTextChannel.userIds.includes(userId)) {
      throw new UnauthorizedException();
    }
    return this.userTextChannelsRepository.update(id, {
      ...updateUserTextChannelDto,
      users,
      lastUpdatedBy: userId,
    });
  }
}
