import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import User from 'src/module/users/entities/user.entity';
import UserModule from 'src/module/users/users.module';
import AuthController from './auth.controller';
import AuthService from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export default class AuthModule { }
