import { QueryFailedExceptionFilter } from './common/filter/query.filter';
import { APP_FILTER, RouterModule, Routes } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import validationSchema from './config/schema';
import databaseConfig from './config/database';
import * as fs from 'fs';

import ServerChannelsModule from './module/server-channels/server-channels.module';
import FriendRequestsModule from './module/friend-request/friend-requests.module';
import UserChannelsModule from './module/user-channels/user-channels.module';
import MessagesModule from './module/messages/messages.module';
import ServersModule from './module/servers/servers.module';
import UsersModule from './module/users/users.module';
import AuthModule from './module/auth/auth.module';


// Thoses modules are used in the route config because multiple declaration of a module will be overwriten
// https://github.com/nestjsx/nest-router/issues/74
@Module({})
class UserMessagesModule extends MessagesModule { }
@Module({})
class ServerMessagesModule extends MessagesModule { }

const routes: Routes = [
  {
    path: 'users',
    module: UsersModule,
    children: [
      {
        path: 'me/channels',
        module: UserChannelsModule,
        children: [
          {
            path: ':messageFluxId/message',
            module: UserMessagesModule,
          },
        ],
      },
      {
        path: 'friend-requests',
        module: FriendRequestsModule,
      },
    ],
  },
  {
    path: 'servers',
    module: ServersModule,
    children: [
      {
        path: ':serverId/channels',
        module: ServerChannelsModule,
        children: [
          {
            path: ':messageFluxId/message',
            module: ServerMessagesModule,
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    module: AuthModule,
  },
];

@Module({
  imports: [
    // router config
    RouterModule.register(routes),
    // dotenv Config
    ConfigModule.forRoot({
      envFilePath: fs.existsSync(`.env.${process.env.NODE_ENV}.local`)
        ? `.env.${process.env.NODE_ENV}.local`
        : `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      validationSchema,
    }),
    // TypeOrm config
    TypeOrmModule.forRoot({
      ...databaseConfig(),
    }),
    // Modules
    AuthModule,
    UsersModule,
    ServersModule,
    MessagesModule,
    UserChannelsModule,
    FriendRequestsModule,
    ServerChannelsModule,
    UserMessagesModule,
    ServerMessagesModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: QueryFailedExceptionFilter,
    },
  ],
})
export default class AppModule { }
