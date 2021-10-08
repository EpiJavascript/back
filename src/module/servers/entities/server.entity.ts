import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, RelationId } from 'typeorm';

import { ServerTextChannel } from 'src/module/server-channels/entities';
import Base from '../../../database/common/base.entity';
import { User } from 'src/module/users/entities';

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
  @OneToMany(() => ServerTextChannel, textChannel => textChannel.server)
  textChannels: ServerTextChannel[];

  @RelationId((server: Server) => server.textChannels)
  channelIds: string[];
}
