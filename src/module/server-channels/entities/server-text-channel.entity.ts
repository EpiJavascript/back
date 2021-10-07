import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import MessageFlux from 'src/module/messages/entities/message-flux.entity';
import Server from '../../servers/entities/server.entity';
import Base from '../../../database/common/base.entity';

@Entity()
export default class ServerTextChannel extends Base {
  @Column()
  name: string;

  /**
   * MessageFlux relation
   */
  @ManyToOne(() => MessageFlux)
  messageFlux: MessageFlux;
 
  /**
   * Server relation
   */
  @ManyToOne(() => Server, server => server.channels, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  server: Server;

  // Can implemente channel permissions here
}
