import { Column, Entity, OneToMany } from 'typeorm';
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

  @OneToMany(() => Server, server => server.user)
  servers: Server[];
}
