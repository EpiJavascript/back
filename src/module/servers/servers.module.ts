import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ServersController from './servers.controller';
import ServersService from './servers.service';
import UserModule from '../users/users.module';
import Server from './entities/server.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Server]),
    UserModule,
  ],
  controllers: [ServersController],
  providers: [ServersService],
  exports: [ServersService],
})
export default class ServersModule { }
