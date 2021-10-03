import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import CreateMessageDto from './dto/message.create.dto';
import Message from './entities/message.entity';
import Channel from '../channels/entities/channel.entity';
import ChannelsService from '../channels/channels.service';

@Injectable()
export default class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    private channelsService: ChannelsService,
  ) { }

  findAll(userId: string): Promise<Message[]> {
    console.log(userId);
    return this.messagesRepository.find({
      relations: ['channel'],
    });
  }

  findOne(id: string): Promise<Message> {
    return this.messagesRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.messagesRepository.delete(id);
  }

  async create(userId: string, createMessageDto: CreateMessageDto): Promise<Message> {
    const message: Message = this.messagesRepository.create(createMessageDto);
    const channel: Channel = await this.channelsService.findOneOrFail(createMessageDto.channelId);
    return this.messagesRepository.save({
      ...message,
      channel,
      createdBy: userId,
      lastUpdatedBy: userId,
    });
  }
}
