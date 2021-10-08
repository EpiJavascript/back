import { DeleteResult, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import UsersService from '../users/users.service';
import { CreateUserTextChannelDto } from './dto';
import { UserTextChannel } from './entities';
import { User } from '../users/entities';

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

  remove(id: string): Promise<DeleteResult> {
    return this.userTextChannelsRepository.delete(id);
  }

  async create(userId: string, createUserTextChannelDto: CreateUserTextChannelDto): Promise<UserTextChannel> {
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
