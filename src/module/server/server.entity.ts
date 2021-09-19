import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Base from '../../database/base.entity';
import User from '../user/user.entity';

@Entity()
export default class Server extends Base {
  @Column()
  name: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn()
  user: User;

  // @OneToMany(() => Channel, channel => channel.id)
  // @JoinColumn()
  // channel: Channel[];
}
