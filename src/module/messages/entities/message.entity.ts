import { Column, Entity } from 'typeorm';

import Base from 'src/database/common/base.entity';

@Entity()
export default class Message extends Base {
  @Column()
  message: string;
}
