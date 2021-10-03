import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

import Message from '../../messages/entities/message.entity';
import Server from '../../servers/entities/server.entity';
import Base from '../../../database/common/base.entity';
import User from '../../users/entities/user.entity';

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
   * Users relation
   */
  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  /**
   * Server relation
   */
  @ManyToOne(() => Server, server => server.channels, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  server: Server;

  @Column({
    nullable: true,
  })
  serverId: number;
}
