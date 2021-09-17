import { Column, Entity } from 'typeorm';
import Base from '../../database/base.entity';

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

  @Column()
  test: string;
}
