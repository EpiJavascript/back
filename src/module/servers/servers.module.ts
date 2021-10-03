import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserModule from 'src/module/users/users.module';
import ServersController from './servers.controller';
import ServersService from './servers.service';
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
