import { Column, Entity, JoinTable, ManyToMany, RelationId } from 'typeorm';

import Server from '../../servers/entities/server.entity';
import Base from '../../../database/common/base.entity';

@Entity()
export default class User extends Base {
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  username: string;

  @Column({
    select: false,
  })
  password: string;

  /**
   * Servers relation
   */
  @ManyToMany(() => Server, server => server.users)
  servers: Server[];

  @RelationId((user: User) => user.servers)
  serverIds: string[];

  /**
   * Friends relation
   */
  @ManyToMany(() => User)
  @JoinTable()
  friends: User[];

  @RelationId((user: User) => user.friends)
  friendIds: string[];
}
