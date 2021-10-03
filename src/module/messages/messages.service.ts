import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import CreateMessageDto from './dto/message.create.dto';
import Message from './entities/message.entity';

@Injectable()
export default class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
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

  create(userId: string, createMessageDto: CreateMessageDto): Promise<Message> {
    const message: Message = this.messagesRepository.create(createMessageDto);
    return this.messagesRepository.save({
      ...message,
      createdBy: userId,
      lastUpdatedBy: userId,
    });
  }
}
