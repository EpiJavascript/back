import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import UsersController from './users.controller';
import UsersService from './users.service';
import { User } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export default class UsersModule { }
