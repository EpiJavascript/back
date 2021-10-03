import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import CreatePrivateChannelDto from './dto/private-channel.dto';
import PrivateChannel from './entities/private-channel.entity';
import CreateChannelDto from './dto/channel.create.dto';
import ServersService from '../servers/servers.service';
import Server from '../servers/entities/server.entity';
import UsersService from '../users/users.service';
import User from '../users/entities/user.entity';
import Channel from './entities/channel.entity';

@Injectable()
export default class ChannelsService {
  constructor(
    @InjectRepository(Channel)
    private channelsRepository: Repository<Channel>,
    @InjectRepository(PrivateChannel)
    private privateChannelsRepository: Repository<PrivateChannel>,
    private serversService: ServersService,
    private usersService: UsersService,
  ) { }

  async findAll(userId: string): Promise<Channel[]> {
    return this.channelsRepository
      .createQueryBuilder('channel')
      .leftJoin('channel.server', 'server')
      .leftJoin('server.users', 'user')
      .where('user.id = :id', { id: userId })
      .getMany();
  }

  findOne(id: string): Promise<Channel> {
    return this.channelsRepository.findOne(id);
  }

  findOneOrFail(id: string): Promise<Channel> {
    return this.channelsRepository.findOneOrFail(id);
  }

  async remove(id: string): Promise<void> {
    await this.channelsRepository.delete(id);
  }

  async findAllPrivate(userId: string): Promise<PrivateChannel[]> {
    return this.privateChannelsRepository
      .createQueryBuilder('private_channel')
      .leftJoin('private_channel.users', 'user')
      .where('user.id = :id', { id: userId })
      .getMany();
  }

  async createPrivate(userId: string, createPrivateChannelDto: CreatePrivateChannelDto): Promise<PrivateChannel> {
    const users: User[] = await this.usersService.findByIds(createPrivateChannelDto.userIds);
    const privateChannel: PrivateChannel = this.privateChannelsRepository.create({
      ...createPrivateChannelDto,
      users,
      createdBy: userId,
      lastUpdatedBy: userId,
    });
    return this.privateChannelsRepository.save(privateChannel);
  }

  async create(userId: string, createChannelDto: CreateChannelDto): Promise<Channel> {
    const server: Server = await this.serversService.findOneOrFail(createChannelDto.serverId);
    if (!server.userIds.includes(userId)) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    if (createChannelDto.name === undefined) {
      throw new HttpException('Need to specify a channel name', HttpStatus.BAD_REQUEST);
    }
    const channel: Channel = this.channelsRepository.create({
      ...createChannelDto,
      server,
      createdBy: userId,
      lastUpdatedBy: userId,
    });
    return this.channelsRepository.save(channel);
  }
}
