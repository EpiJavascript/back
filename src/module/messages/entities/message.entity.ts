import { Column, Entity, ManyToOne } from 'typeorm';

import Base from '../../../database/common/base.entity';
import MessageFlux from './message-flux.entity';

@Entity()
export default class Message extends Base {
  @Column()
  message: string;

  @ManyToOne(() => MessageFlux, messageFlux => messageFlux.messages, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  messageFlux: MessageFlux;
}
