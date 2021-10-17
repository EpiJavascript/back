import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import AuthController from './auth.controller';
import UserModule from '../users/users.module';
import { User } from '../users/entities';
import AuthService from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export default class AuthModule { }
