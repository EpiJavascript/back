import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateUserTextChannelDto } from './dto';
import UserTextChannel from './entities/user-text-channel.entity';
import PrivateChannel from './entities/user-text-channel.entity';
import UsersService from '../users/users.service';
import User from '../users/entities/user.entity';

@Injectable()
export default class UserChannelsService {
  constructor(
    @InjectRepository(UserTextChannel)
    private userTextChannelsRepository: Repository<UserTextChannel>,
    private usersService: UsersService,
  ) { }
  
  async findAll(userId: string): Promise<PrivateChannel[]> {
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

  async remove(id: string): Promise<void> {
    await this.userTextChannelsRepository.delete(id);
  }


  async create(userId: string, createUserTextChannelDto: CreateUserTextChannelDto): Promise<PrivateChannel> {
    const users: User[] = await this.usersService.findByIds(createUserTextChannelDto.userIds);
    const userTextChannel: UserTextChannel = this.userTextChannelsRepository.create({
      ...createUserTextChannelDto,
      users,
      createdBy: userId,
      lastUpdatedBy: userId,
    });
    return this.userTextChannelsRepository.save(userTextChannel);
  }
}
