import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, RelationId } from 'typeorm';

import Channel from 'src/module/channels/entities/channel.entity';
import User from 'src/module/users/entities/user.entity';
import Base from 'src/database/common/base.entity';

@Entity()
export default class Server extends Base {
  @Column()
  name: string;

  /**
   * AdminUser relation
   */
  @OneToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  adminUser: User;

  @Column()
  adminUserId: string;

  /**
   * Users relation
   */
  @ManyToMany(() => User, user => user.servers)
  @JoinTable()
  users: User[];

  @RelationId((server: Server) => server.users)
  userIds: string[];

  /**
   * Channels relation
   */
  @OneToMany(() => Channel, channel => channel.server)
  channels: Channel[];

  @RelationId((server: Server) => server.channels)
  channelIds: string[];
}
