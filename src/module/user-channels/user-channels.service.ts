import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserTextChannelDto, UpdateUserTextChannelDto } from './dto';
import { CreateMessageDto } from '../messages/dto';
import UsersService from '../users/users.service';
import { Message, MessageFlux } from '../messages/entities';
import { UserTextChannel } from './entities';
import { User } from '../users/entities';

@Injectable()
export default class UserChannelsService {
  constructor(
    @InjectRepository(UserTextChannel)
    private userTextChannelsRepository: Repository<UserTextChannel>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(MessageFlux)
    private messagFluxRepository: Repository<MessageFlux>,
    private usersService: UsersService,
  ) { }

  async findAll(userId: string): Promise<UserTextChannel[]> {
    const userTextChannel = await this.userTextChannelsRepository.find({
      join: {
        alias: 'user_text_channel',
        innerJoinAndSelect: {
          users: 'user_text_channel.users',
        },
      },
    });
    return userTextChannel.filter((value: UserTextChannel) => {
      return value.userIds.includes(userId);
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
    const partialMessageFlux: MessageFlux = this.messagFluxRepository.create({
      createdBy: userId,
      lastUpdatedBy: userId,
    });
    const messageFlux: MessageFlux = await this.messagFluxRepository.save(partialMessageFlux);
    const userTextChannel: UserTextChannel = this.userTextChannelsRepository.create({
      ...createUserTextChannelDto,
      messageFlux,
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

  // Messages
  async findMessages(userId: string, channelId: string): Promise<Message[]> {
    const user: User = await this.usersService.findOneOrFail(userId);
    const userTextChannel: UserTextChannel = await this.userTextChannelsRepository.findOneOrFail(channelId, { relations: ['messageFlux', 'messageFlux.messages'] });
    if (!user.userTextChannelIds.includes(channelId)) {
      throw new UnauthorizedException();
    }
    return userTextChannel.messageFlux.messages;
  }

  async postMessage(userId: string, channelId: string, createMessageDto: CreateMessageDto): Promise<Message> {
    const user: User = await this.usersService.findOneOrFail(userId);
    const userTextChannel: UserTextChannel = await this.userTextChannelsRepository.findOneOrFail(channelId, { relations: ['messageFlux', 'messageFlux.messages'] });
    if (!user.userTextChannelIds.includes(channelId)) {
      throw new UnauthorizedException();
    }
    const message: Message = this.messageRepository.create({
      ...createMessageDto,
      messageFlux: userTextChannel.messageFlux,
      createdBy: userId,
      lastUpdatedBy: userId,
    });
    // save message
    return this.messageRepository.save(message);
  }
}
