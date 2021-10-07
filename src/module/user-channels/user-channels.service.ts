import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import CreateUserTextChannelDto from './dto/create-user-text-channel.dto';
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
    return this.userTextChannelsRepository
      .createQueryBuilder('private_channel')
      .leftJoin('private_channel.users', 'user')
      .where('user.id = :id', { id: userId })
      .getMany();
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


  async create(userId: string, createPrivateChannelDto: CreateUserTextChannelDto): Promise<PrivateChannel> {
    const users: User[] = await this.usersService.findByIds(createPrivateChannelDto.userIds);
    const userTextChannel: UserTextChannel = this.userTextChannelsRepository.create({
      ...createPrivateChannelDto,
      users,
      createdBy: userId,
      lastUpdatedBy: userId,
    });
    return this.userTextChannelsRepository.save(userTextChannel);
  }
}
