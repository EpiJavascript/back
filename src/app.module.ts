import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as fs from 'fs';
import databaseConfig from './config/database';
import UserModule from './module/user/user.module';
import validationSchema from './config/schema';
import AuthModule from './module/auth/auth.module';
import ServerModule from './module/server/server.module';
import ChannelModule from './module/channel/channel.module';
import { APP_FILTER } from '@nestjs/core';
import { QueryFailedExceptionFilter } from './common/filter/query.filter';

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
    UserModule,
    AuthModule,
    ServerModule,
    ChannelModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: QueryFailedExceptionFilter,
    },
  ],
})
export default class AppModule { }
