import { Column, Entity, ManyToMany, RelationId } from 'typeorm';
import Base from '../../database/base.entity';
import Server from '../server/server.entity';

@Entity()
export default class User extends Base {
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  /**
   * Servers relation
   */
  @ManyToMany(() => Server, server => server.users)
  servers: Server[];

  @RelationId((user: User) => user.servers)
  serverIds: number[];
}
