import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import Message from '../../messages/entities/message.entity';
import Server from '../../servers/entities/server.entity';
import Base from '../../../database/common/base.entity';

@Entity()
export default class Channel extends Base {
  @Column()
  name: string;

  /**
   * Messages relation
   */
  @OneToMany(() => Message, message => message.channel)
  messages: Message[];

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
