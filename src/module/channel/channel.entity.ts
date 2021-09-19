import { Entity, ManyToOne } from 'typeorm';
import Base from '../../database/base.entity';
import Server from '../server/server.entity';

@Entity()
export default class Channel extends Base {
  @ManyToOne(() => Server, server => server.id)
  server: Server;
}
