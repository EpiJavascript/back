import { Column, Entity, ManyToOne } from 'typeorm';

import { FriendRequestEnum } from '../enums/friend-request.enum';
import Base from '../../../database/common/base.entity';
import User from './user.entity';

@Entity()
export default class FriendRequest extends Base {
  @ManyToOne(() => User)
  user: User;

  @Column({
    type: 'enum',
    enum: FriendRequestEnum,
    default: FriendRequestEnum.PENDING,
  })
  type: string;
}
