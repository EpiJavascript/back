import { Entity, ManyToOne } from 'typeorm';

import Base from '../../../database/common/base.entity';

@Entity()
export default class User extends Base {
  @ManyToOne(() => User)
  user: User;

  
}
