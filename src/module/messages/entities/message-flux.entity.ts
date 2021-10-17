import { Entity, OneToMany } from 'typeorm';

import Base from '../../../database/common/base.entity';
import { Message } from '.';

@Entity()
export default class MessageFlux extends Base {
  @OneToMany(() => Message, message => message.messageFlux)
  messages: Message[];
}
