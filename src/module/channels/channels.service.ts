import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Any, Repository } from 'typeorm';

import CreateChannelDto from './dto/channel.create.dto';
import Channel from './entities/channel.entity';

@Injectable()
export default class ChannelsService {
  constructor(
    @InjectRepository(Channel)
    private channelsRepository: Repository<Channel>,
  ) { }

  findAll(userId: string): Promise<Channel[]> {
    return this.channelsRepository.find({
      where: {
        server: {
          userIds: Any([userId]),
        },
      },
      relations: ['server'],
      loadRelationIds: true,
    });
  }

  findOne(id: string): Promise<Channel> {
    return this.channelsRepository.findOne(id);
  }

  findOneOrFail(id: string): Promise<Channel> {
    return this.channelsRepository.findOneOrFail(id);
  }

  async remove(id: string): Promise<void> {
    await this.channelsRepository.delete(id);
  }

  create(userId: string, createChannelDto: CreateChannelDto): Promise<Channel> {
    // Need to check if user is in server
    const channel: Channel = this.channelsRepository.create(createChannelDto);
    return this.channelsRepository.save({
      ...channel,
      createdBy: userId,
      lastUpdatedBy: userId,
    });
  }
}
