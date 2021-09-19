import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ServerService from './server.service';
import Server from './server.entity';
import ServerController from './server.controller';
import UserModule from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Server]),
    UserModule,
  ],
  controllers: [ServerController],
  providers: [ServerService],
  exports: [ServerService],
})
export default class ServerModule { }
