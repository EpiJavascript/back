import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateServerTextChannelDto, UpdateServerTextChannelDto } from './dto';
import ServersService from '../servers/servers.service';
import UsersService from '../users/users.service';
import { ServerTextChannel } from './entities';
import { Message, MessageFlux } from '../messages/entities';
import { Server } from '../servers/entities';
import { CreateMessageDto } from '../messages/dto';

@Injectable()
export default class ServerChannelsService {
  constructor(
    @InjectRepository(ServerTextChannel)
    private serverTextChannelsRepository: Repository<ServerTextChannel>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(MessageFlux)
    private messagFluxRepository: Repository<MessageFlux>,
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
    const partialMessageFlux: MessageFlux = this.messagFluxRepository.create({
      createdBy: userId,
      lastUpdatedBy: userId,
    });
    const messageFlux: MessageFlux = await this.messagFluxRepository.save(partialMessageFlux);
    const serverTextChannel: ServerTextChannel = this.serverTextChannelsRepository.create({
      ...createServerTextChannelDto,
      messageFlux,
      server,
      createdBy: userId,
      lastUpdatedBy: userId,
    });
    return this.serverTextChannelsRepository.save(serverTextChannel);
  }

  // Messages
  async findMessages(userId: string, serverId: string, channelId: string): Promise<Message[]> {
    const server: Server = await this.serversService.findOneOrFail(serverId);
    const serverTextChannel: ServerTextChannel = await this.serverTextChannelsRepository.findOneOrFail(channelId, { relations: ['messageFlux', 'messageFlux.messages'] });
    if (!server.userIds.includes(userId)) {
      throw new UnauthorizedException();
    }
    if (!server.channelIds.includes(channelId)) {
      throw new UnauthorizedException();
    }
    return serverTextChannel.messageFlux.messages;
  }

  async postMessage(userId: string, serverId: string, channelId: string, createMessageDto: CreateMessageDto): Promise<Message> {
    const server: Server = await this.serversService.findOneOrFail(serverId);
    const serverTextChannel: ServerTextChannel = await this.serverTextChannelsRepository.findOneOrFail(channelId, { relations: ['messageFlux', 'messageFlux.messages'] });
    if (!server.userIds.includes(userId)) {
      throw new UnauthorizedException();
    }
    if (!server.channelIds.includes(channelId)) {
      throw new UnauthorizedException();
    }
    const message: Message = this.messageRepository.create({
      ...createMessageDto,
      messageFlux: serverTextChannel.messageFlux,
      createdBy: userId,
      lastUpdatedBy: userId,
    });
    return this.messageRepository.save(message);
  }
}
