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
import ServersModule from './module/servers/servers.module';
import UsersModule from './module/users/users.module';
import ImgurModule from './module/imgur/imgur.module';
import EventsModule from './websocket/events.module';
import AuthModule from './module/auth/auth.module';


const routes: Routes = [
  {
    path: 'users',
    module: UsersModule,
    children: [
      {
        path: 'me/channels',
        module: UserChannelsModule,
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
      },
    ],
  },
  {
    path: 'auth',
    module: AuthModule,
  },
];

const nodeEnv = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const envFilePath = fs.existsSync(`.env.${nodeEnv}.local`)
  ? `.env.${nodeEnv}.local`
  : `.env.${nodeEnv}`;

@Module({
  imports: [
    // router config
    RouterModule.register(routes),
    // dotenv Config
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      validationSchema,
    }),
    // TypeOrm config
    TypeOrmModule.forRoot({
      ...databaseConfig(),
    }),
    // Modules
    AuthModule,
    ImgurModule,
    UsersModule,
    EventsModule,
    ServersModule,
    UserChannelsModule,
    FriendRequestsModule,
    ServerChannelsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: QueryFailedExceptionFilter,
    },
  ],
})
export default class AppModule { }
