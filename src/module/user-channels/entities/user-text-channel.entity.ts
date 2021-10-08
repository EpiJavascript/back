import { Column, Entity, JoinTable, ManyToMany, ManyToOne, RelationId } from 'typeorm';

import { MessageFlux } from 'src/module/messages/entities';
import Base from '../../../database/common/base.entity';
import { User } from 'src/module/users/entities';

@Entity()
export default class UserTextChannel extends Base {
  @Column()
  name: string;

  /**
   * MessageFlux relation
   */
  @ManyToOne(() => MessageFlux)
  messageFlux: MessageFlux;

  /**
   * Users relation
   */
  @ManyToMany(() => User, user => user.userTextChannels)
  @JoinTable()
  users: User[];

  @RelationId((userTextChannel: UserTextChannel) => userTextChannel.users)
  userIds: string[];
}
