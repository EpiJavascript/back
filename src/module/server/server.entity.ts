import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Base from '../../database/base.entity';
import User from '../user/user.entity';

@Entity()
export default class Server extends Base {
  @Column()
  name: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.servers, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  // @OneToMany(() => Channel, channel => channel.id)
  // @JoinColumn()
  // channel: Channel[];
}
