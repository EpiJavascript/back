import { QueryFailedExceptionFilter } from './common/filter/query.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';

import validationSchema from './config/schema';
import databaseConfig from './config/database';
import * as fs from 'fs';

import ChannelsModule from './module/channels/channels.module';
import ServersModule from './module/servers/servers.module';
import UsersModule from './module/users/users.module';

import AuthModule from './module/auth/auth.module';


@Module({
  imports: [
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
    UsersModule,
    AuthModule,
    ServersModule,
    ChannelsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: QueryFailedExceptionFilter,
    },
  ],
})
export default class AppModule { }
