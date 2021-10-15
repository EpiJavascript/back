import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { MessageFlux } from 'src/module/messages/entities';
import { classToPlain, Exclude } from 'class-transformer';
import Base from '../../../database/common/base.entity';
import { Server } from 'src/module/servers/entities';

@Entity()
export default class ServerTextChannel extends Base {
  toJSON(): Record<string, unknown> {
    return classToPlain(this);
  }

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

  @Exclude()
  @Column()
  serverId: string;

  // Can implemente channel permissions here
}
