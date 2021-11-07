import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';

import { CreateServerTextChannelDto, UpdateServerTextChannelDto } from './dto';
import { EventsGateway } from '../../websocket/events.gateway';
import { Message, MessageFlux } from '../messages/entities';
import ServersService from '../servers/servers.service';
import WsEmitMessage from '../../common/enums/ws.enum';
import { CreateMessageDto } from '../messages/dto';
import UsersService from '../users/users.service';
import { ServerTextChannel } from './entities';
import { Server } from '../servers/entities';
import { User } from '../users/entities';

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
    private eventsGateway: EventsGateway,
  ) { }

  async findAll(serverId: string, userId: string): Promise<ServerTextChannel[]> {
    const server: Server = await this.serversService.findOneOrFail(serverId);
    if (!server.userIds.includes(userId)) {
      throw new UnauthorizedException();
    }
    return this.serverTextChannelsRepository.find({
      where: {
        serverId,
      },
      relations: ['messageFlux'],
    });
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
    return this.serverTextChannelsRepository.update(id, {
      ...updateServerTextChannelDto,
      lastUpdatedBy: userId,
    });
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
    const serverTextChannel: ServerTextChannel = await this.serverTextChannelsRepository
      .createQueryBuilder('serverTextChannel')
      .leftJoinAndSelect('serverTextChannel.messageFlux', 'messageFlux')
      .leftJoinAndSelect('messageFlux.messages', 'messages')
      .leftJoinAndMapOne('messages.user', User, 'user', 'messages.createdBy = user.id')
      .where('serverTextChannel.id = :id', { id: channelId })
      .getOne();

    const messages: Message[] = serverTextChannel.messageFlux.messages;

    if (!server.userIds.includes(userId)) {
      throw new UnauthorizedException();
    }
    if (!server.channelIds.includes(channelId)) {
      throw new UnauthorizedException();
    }
    return messages;
  }

  async postMessage(userId: string, serverId: string, channelId: string, createMessageDto: CreateMessageDto): Promise<Message> {
    const server: Server = await this.serversService.findOneOrFail(serverId);
    const user: User = await this.usersService.findOneOrFail(userId);
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

    // send notification
    const connected: Map<string, Socket> = this.eventsGateway.getConnected();
    server.users.forEach((value: User) => {
      const socket: Socket = connected.get(value.id);
      // skip if user is not connected or if user is the function caller
      if (socket === undefined || value.id === userId) {
        return;
      }
      this.eventsGateway.send(socket, WsEmitMessage.SERVER_CHANNEL_MESSAGE, { id: serverTextChannel.id, message: message.message, serverId, createdBy: user });
    });

    return this.messageRepository.save(message);
  }
}
