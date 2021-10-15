import { Column, Entity, JoinTable, ManyToMany, ManyToOne, RelationId } from 'typeorm';

import { MessageFlux } from 'src/module/messages/entities';
import Base from '../../../database/common/base.entity';
import { User } from 'src/module/users/entities';
import { classToPlain, Exclude } from 'class-transformer';

@Entity()
export default class UserTextChannel extends Base {
  toJSON(): Record<string, unknown> {
    return classToPlain(this);
  }

  @Column({
    nullable: true,
  })
  name: string;

  /**
   * MessageFlux relation
   */
  @ManyToOne(() => MessageFlux, {
    nullable: false,
  })
  messageFlux: MessageFlux;

  /**
   * Users relation
   */
  @ManyToMany(() => User, user => user.userTextChannels)
  @JoinTable()
  users: User[];

  @Exclude()
  @RelationId((userTextChannel: UserTextChannel) => userTextChannel.users)
  userIds: string[];
}
