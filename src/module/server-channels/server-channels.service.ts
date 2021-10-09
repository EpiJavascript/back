import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateServerTextChannelDto, UpdateServerTextChannelDto } from './dto';
import ServersService from '../servers/servers.service';
import UsersService from '../users/users.service';
import { ServerTextChannel } from './entities';
import { Server } from '../servers/entities';

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
      throw new UnauthorizedException();
    }
    return this.serverTextChannelsRepository.find({ relations: ['messageFlux'] });
  }

  findOne(id: string): Promise<ServerTextChannel> {
    return this.serverTextChannelsRepository.findOne(id, { relations: ['messageFlux'] });
  }

  findOneOrFail(id: string): Promise<ServerTextChannel> {
    return this.serverTextChannelsRepository.findOneOrFail(id, { relations: ['messageFlux'] });
  }


  async update(userId: string, serverId: string, id: string, updateServerTextChannelDto: UpdateServerTextChannelDto): Promise<UpdateResult> {
    const server: Server = await this.serversService.findOneOrFail(serverId);
    if (!server.userIds.includes(userId)) {
      throw new UnauthorizedException();
    }
    return this.serverTextChannelsRepository.update(id, updateServerTextChannelDto);
  }


  async remove(userId: string, serverId: string, id: string): Promise<DeleteResult> {
    const server: Server = await this.serversService.findOneOrFail(serverId);
    if (!server.userIds.includes(userId)) {
      throw new UnauthorizedException();
    }
    return this.serverTextChannelsRepository.delete(id);
  }


  async create(userId: string, serverId: string, createServerTextChannelDto: CreateServerTextChannelDto): Promise<ServerTextChannel> {
    const server: Server = await this.serversService.findOneOrFail(serverId);
    if (!server.userIds.includes(userId)) {
      throw new UnauthorizedException();
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
