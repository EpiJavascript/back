import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { MessageFlux } from 'src/module/messages/entities';
import Base from '../../../database/common/base.entity';
import { Server } from 'src/module/servers/entities';

@Entity()
export default class ServerTextChannel extends Base {
  @Column()
  name: string;

  /**
   * MessageFlux relation
   */
  @ManyToOne(() => MessageFlux, {
    nullable: false,
  })
  messageFlux: MessageFlux;
 
  /**
   * Server relation
   */
  @ManyToOne(() => Server, server => server.textChannels, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  server: Server;

  // Can implemente channel permissions here
}
