import { Column, Entity, JoinTable, ManyToMany, OneToMany, RelationId } from 'typeorm';
import Base from '../../database/base.entity';
import Channel from '../channel/channel.entity';
import User from '../user/user.entity';

@Entity()
export default class Server extends Base {
  @Column()
  name: string;

  @Column()
  adminUserId: number;

  /**
   * Users relation
   */
  @ManyToMany(() => User, user => user.servers)
  @JoinTable()
  users: User[];

  @RelationId((server: Server) => server.users)
  userIds: number[];

  /**
   * Channels relation
   */
  @OneToMany(() => Channel, channel => channel.server)
  channels: Channel[];

  @RelationId((server: Server) => server.channels)
  channelsIds: number[];
}
