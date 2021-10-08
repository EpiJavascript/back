import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ServerTextChannel from './entities/server-text-channel.entity';
import ServersService from '../servers/servers.service';
import Server from '../servers/entities/server.entity';
import UsersService from '../users/users.service';
import Channel from './entities/server-text-channel.entity';
import { CreateServerTextChannelDto } from './dto';

const baseFindOptions = {
  relations: ['messageFlux'],
};
@Injectable()
export default class ServerChannelsService {
  constructor(
    @InjectRepository(ServerTextChannel)
    private serverTextChannelsRepository: Repository<ServerTextChannel>,
    private serversService: ServersService,
    private usersService: UsersService,
  ) { }

  async findAll(serverId: string, userId: string): Promise<ServerTextChannel[]> {
    const server: Server = await this.serversService.findOneOrFail(serverId);
    if (!server.userIds.includes(userId)) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.serverTextChannelsRepository.find(baseFindOptions);
  }

  findOne(id: string): Promise<Channel> {
    return this.serverTextChannelsRepository.findOne(id, baseFindOptions);
  }

  findOneOrFail(id: string): Promise<Channel> {
    return this.serverTextChannelsRepository.findOneOrFail(id, baseFindOptions);
  }

  async remove(id: string): Promise<void> {
    await this.serverTextChannelsRepository.delete(id);
  }

  async create(userId: string, serverId: string, createServerTextChannelDto: CreateServerTextChannelDto): Promise<ServerTextChannel> {
    const server: Server = await this.serversService.findOneOrFail(serverId);
    if (!server.userIds.includes(userId)) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const serverTextChannel: ServerTextChannel = this.serverTextChannelsRepository.create({
      ...createServerTextChannelDto,
      server,
      createdBy: userId,
      lastUpdatedBy: userId,
    });
    return this.serverTextChannelsRepository.save(serverTextChannel);
  }
}
