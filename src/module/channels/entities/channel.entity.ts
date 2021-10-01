import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import Base from '../../../database/common/base.entity';
import Server from '../../servers/entities/server.entity';

@Entity()
export default class Channel extends Base {
  @Column()
  name: string;

  /**
   * Server relation
   */
  @ManyToOne(() => Server, server => server.channels, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  server: Server;

  @Column()
  serverId: number;
}
