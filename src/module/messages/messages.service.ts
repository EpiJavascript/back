import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import MessageFlux from './entities/message-flux.entity';
import CreateMessageDto from './dto/create-message.dto';
import Message from './entities/message.entity';

@Injectable()
export default class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    @InjectRepository(MessageFlux)
    private readonly messageFluxesRepository: Repository<MessageFlux>,
  ) { }

  findAll(userId: string): Promise<Message[]> {
    console.log(userId);
    return this.messagesRepository.find();
  }

  findOne(id: string): Promise<Message> {
    return this.messagesRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.messagesRepository.delete(id);
  }

  async create(userId: string, createMessageDto: CreateMessageDto): Promise<Message> {
    const message: Message = this.messagesRepository.create(createMessageDto);
    return this.messagesRepository.save({
      ...message,
      createdBy: userId,
      lastUpdatedBy: userId,
    });
  }

  async createFlux(userId: string): Promise<MessageFlux> {
    return this.messageFluxesRepository.save({
      createdBy: userId,
      lastUpdatedBy: userId,
    });
  }
}
