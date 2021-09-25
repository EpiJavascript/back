import { Column, Entity, ManyToOne } from 'typeorm';
import Base from '../../database/base.entity';
import Server from '../server/server.entity';

@Entity()
export default class Channel extends Base {
  @Column()
  name: string;

  @ManyToOne(() => Server, server => server.channels)
  server: Server;
}
