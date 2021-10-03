import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import Server from 'src/module/servers/entities/server.entity';
import Base from 'src/database/common/base.entity';

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
