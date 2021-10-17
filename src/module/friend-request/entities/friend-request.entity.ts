import { Column, Entity, ManyToOne } from 'typeorm';

import Base from '../../../database/common/base.entity';
import { FriendRequestEnum } from '../enums';
import { User } from '../../users/entities';

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
