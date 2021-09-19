import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Channel from './channel.entity';

@Injectable()
export default class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
  ) {
    this.channelRepository = channelRepository;
  }

  findAll(): Promise<Channel[]> {
    return this.channelRepository.find();
  }

  findOne(id: string): Promise<Channel> {
    return this.channelRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.channelRepository.delete(id);
  }
}
