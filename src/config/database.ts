import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import FriendRequest from 'src/module/users/entities/friend-request.entity';

import Channel from '../module/channels/entities/channel.entity';
import Server from '../module/servers/entities/server.entity';
import User from '../module/users/entities/user.entity';


export default (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: process.env.NEST_APP_TYPEORM_HOST,
    username: process.env.NEST_APP_TYPEORM_USERNAME,
    password: process.env.NEST_APP_TYPEORM_PASSWORD,
    database: process.env.NEST_APP_TYPEORM_DATABASE,
    port: +process.env.NEST_APP_TYPEORM_PORT,
    synchronize: Boolean(
      JSON.parse(process.env.NEST_APP_TYPEORM_SYNCHRONIZE),
    ),
    ssl: {
      rejectUnauthorized: false,
    },
    entities: [
      User,
      Server,
      Channel,
      FriendRequest,
    ],
  };
};