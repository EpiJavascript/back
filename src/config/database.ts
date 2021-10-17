import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import ServerTextChannel from 'src/module/server-channels/entities/server-text-channel.entity';
import UserTextChannel from 'src/module/user-channels/entities/user-text-channel.entity';
import PrivateChannel from 'src/module/user-channels/entities/user-text-channel.entity';
import FriendRequest from 'src/module/friend-request/entities/friend-request.entity';
import MessageFlux from 'src/module/messages/entities/message-flux.entity';
import Message from 'src/module/messages/entities/message.entity';
import Server from 'src/module/servers/entities/server.entity';
import User from 'src/module/users/entities/user.entity';


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
      Message,
      MessageFlux,
      FriendRequest,
      PrivateChannel,
      UserTextChannel,
      ServerTextChannel,
    ],
  };
};