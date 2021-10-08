import { Column, Entity, ManyToOne } from 'typeorm';

import Base from '../../../database/common/base.entity';
import { User } from 'src/module/users/entities';
import { FriendRequestEnum } from '../enums';

@Entity()
export default class FriendRequest extends Base {
  @ManyToOne(() => User)
  createdByUser: User;

  @ManyToOne(() => User)
  requestedUser: User;

  @Column({
    type: 'enum',
    enum: FriendRequestEnum,
    default: FriendRequestEnum.PENDING,
  })
  type: string;
}
