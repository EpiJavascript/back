import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ServerTextChannel from './entities/server-text-channel.entity';
import CreateChannelDto from './dto/create-server-text-channel.dto';
import ServersService from '../servers/servers.service';
import Server from '../servers/entities/server.entity';
import UsersService from '../users/users.service';
import Channel from './entities/server-text-channel.entity';

@Injectable()
export default class ServerChannelsService {
  constructor(
    @InjectRepository(ServerTextChannel)
    private serverTextChannelsRepository: Repository<ServerTextChannel>,
    private serversService: ServersService,
    private usersService: UsersService,
  ) { }

  async findAll(userId: string): Promise<ServerTextChannel[]> {
    return this.serverTextChannelsRepository
      .createQueryBuilder('channel')
      .leftJoin('channel.server', 'server')
      .leftJoin('server.users', 'user')
      .where('user.id = :id', { id: userId })
      .getMany();
  }

  findOne(id: string): Promise<Channel> {
    return this.serverTextChannelsRepository.findOne(id);
  }

  findOneOrFail(id: string): Promise<Channel> {
    return this.serverTextChannelsRepository.findOneOrFail(id);
  }

  async remove(id: string): Promise<void> {
    await this.serverTextChannelsRepository.delete(id);
  }

  async create(userId: string, createChannelDto: CreateChannelDto): Promise<Channel> {
    const server: Server = await this.serversService.findOneOrFail(createChannelDto.serverId);
    if (!server.userIds.includes(userId)) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const serverTextChannel: ServerTextChannel = this.serverTextChannelsRepository.create({
      ...createChannelDto,
      server,
      createdBy: userId,
      lastUpdatedBy: userId,
    });
    return this.serverTextChannelsRepository.save(serverTextChannel);
  }
}
