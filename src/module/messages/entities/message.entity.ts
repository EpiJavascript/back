import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import Channel from '../../channels/entities/channel.entity';
import Base from '../../../database/common/base.entity';

@Entity()
export default class Message extends Base {
  @Column()
  message: string;

  @ManyToOne(() => Channel, channel => channel.messages, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  channel: Channel;
}
