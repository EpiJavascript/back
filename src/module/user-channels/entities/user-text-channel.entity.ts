import { Entity, JoinTable, ManyToMany, ManyToOne, RelationId } from 'typeorm';

import MessageFlux from 'src/module/messages/entities/message-flux.entity';
import Base from '../../../database/common/base.entity';
import User from '../../users/entities/user.entity';

@Entity()
export default class UserTextChannel extends Base {
  /**
   * MessageFlux relation
   */
  @ManyToOne(() => MessageFlux)
  messageFlux: MessageFlux;

  /**
   * Users relation
   */
  @ManyToMany(() => User, user => user.userTextChannel)
  @JoinTable()
  users: User[];

  @RelationId((userTextChannel: UserTextChannel) => userTextChannel.users)
  userIds: string[];
}
