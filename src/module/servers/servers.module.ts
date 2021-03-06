import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import UserModule from '../../module/users/users.module';
import ServersController from './servers.controller';
import ImgurModule from '../imgur/imgur.module';
import ServersService from './servers.service';
import { Server } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Server]),
    ImgurModule,
    UserModule,
  ],
  controllers: [ServersController],
  providers: [ServersService],
  exports: [ServersService],
})
export default class ServersModule { }
