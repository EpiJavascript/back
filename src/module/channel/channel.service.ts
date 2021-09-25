import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Repository } from 'typeorm';
import Channel from './channel.entity';
import CreateChannelDto from './dto/channel.create.dto';

@Injectable()
export default class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
  ) {
    this.channelRepository = channelRepository;
  }

  findAll(userId: number): Promise<Channel[]> {
    return this.channelRepository.find({
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
    return this.channelRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.channelRepository.delete(id);
  }

  create(createChannelDto: CreateChannelDto): Promise<Channel> {
    // Need to check if user is in server
    const channel: Channel = this.channelRepository.create(createChannelDto);
    return this.channelRepository.save(channel);
  }
}
