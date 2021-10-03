import { Column, Entity, ManyToOne } from 'typeorm';

import PrivateChannel from 'src/module/channels/entities/private-channel.entity';
import Channel from '../../channels/entities/channel.entity';
import Base from '../../../database/common/base.entity';

@Entity()
export default class Message extends Base {
  @Column()
  message: string;

  @ManyToOne(() => Channel, channel => channel.messages, {
    onDelete: 'CASCADE',
  })
  channel: Channel;

  @ManyToOne(() => PrivateChannel, privateChannel => privateChannel.messages, {
    onDelete: 'CASCADE',
  })
  privateChannel: PrivateChannel;
}
