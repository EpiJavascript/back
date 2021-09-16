import { Column, Entity } from 'typeorm';
import { Base } from '../../database/base.entity';

@Entity()
export class User extends Base {
  @Column()
  username: string;

  @Column()
  password: string;
}
