import { Column, Entity, JoinTable, ManyToMany, RelationId } from 'typeorm';

import { UserTextChannel } from 'src/module/user-channels/entities';
import { classToPlain, Exclude } from 'class-transformer';
import Base from '../../../database/common/base.entity';
import { Server } from 'src/module/servers/entities';

@Entity()
export default class User extends Base {
  toJSON(): Record<string, unknown> {
    return classToPlain(this);
  }

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  username: string;

  @Column({
    select: false,
  })
  password: string;

  /**
   * Servers relation
   */
  @ManyToMany(() => Server, server => server.users)
  servers: Server[];

  @Exclude()
  @RelationId((user: User) => user.servers)
  serverIds: string[];

  /**
   * Friends relation
   */
  @ManyToMany(() => User)
  @JoinTable()
  friends: User[];

  @Exclude()
  @RelationId((user: User) => user.friends)
  friendIds: string[];

  /**
   * UserTextChannel relation
   */
  @ManyToMany(() => UserTextChannel, userTextChannel => userTextChannel.users)
  userTextChannels: UserTextChannel[];

  @Exclude()
  @RelationId((user: User) => user.userTextChannels)
  userTextChannelIds: string[];
}
