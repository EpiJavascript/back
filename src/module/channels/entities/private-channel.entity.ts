import { Entity, JoinTable, ManyToMany, OneToMany, RelationId } from 'typeorm';

import Message from '../../messages/entities/message.entity';
import Base from '../../../database/common/base.entity';
import User from '../../users/entities/user.entity';

@Entity()
export default class PrivateChannel extends Base {
  /**
   * Messages relation
   */
  @OneToMany(() => Message, message => message.channel)
  messages: Message[];

  /**
   * Users relation
   */
  @ManyToMany(() => User, user => user.privateChannels)
  @JoinTable()
  users: User[];

  @RelationId((privateChannel: PrivateChannel) => privateChannel.users)
  userIds: string[];
}
