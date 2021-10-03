import { Column, Entity, ManyToOne } from 'typeorm';

import { FriendRequestEnum } from 'src/module/users/enums/friend-request.enum';
import Base from 'src/database/common/base.entity';
import User from './user.entity';

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
