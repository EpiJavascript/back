import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';

import { ServerTextChannel } from '../../server-channels/entities';
import Base from '../../../database/common/base.entity';
import { User } from '../../users/entities';

@Entity()
export default class Server extends Base {
  toJSON(): Record<string, unknown> {
    return classToPlain(this);
  }

  @Column()
  name: string;

  /**
   * AdminUser relation
   */
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  adminUser: User;

  @Exclude()
  @Column()
  adminUserId: string;

  /**
   * Users relation
   */
  @ManyToMany(() => User, user => user.servers)
  @JoinTable()
  users: User[];

  @Exclude()
  @RelationId((server: Server) => server.users)
  userIds: string[];

  /**
   * Channels relation
   */
  @OneToMany(() => ServerTextChannel, textChannel => textChannel.server)
  textChannels: ServerTextChannel[];

  @Exclude()
  @RelationId((server: Server) => server.textChannels)
  channelIds: string[];
}
