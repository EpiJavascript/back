import { HttpException, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import HttpCustomStatus from 'src/common/enums/http-custom-status.enum';
import JwtPayloadInterface from '../../common/interfaces/jwt-payload';
import hashPassword from '../../common/helpers/hash-password';
import { CreateUserDto, LoginUserDto } from '../users/dto';
import UserService from '../users/users.service';
import { User } from '../users/entities';
import { AuthDto } from './dto';


@Injectable()
export default class AuthService {
  constructor(private userService: UserService) { }

  async login(loginUserDto: LoginUserDto): Promise<AuthDto> {
    const user: User = await this.userService.findByEmail(loginUserDto.email, true);
    if (user === undefined) {
      throw new HttpException('login_bad_email', HttpCustomStatus.LOGIN_BAD_EMAIL);
    }
    if (user.password !== hashPassword(loginUserDto.password)) {
      throw new HttpException('login_bad_password', HttpCustomStatus.LOGIN_BAD_PASSWORD);
    }
    const token: string = jwt.sign(
      { userId: user.id } as JwtPayloadInterface,
      process.env.JWT_SECRET_KEY,
    );
    return new AuthDto({ token, username: user.username, email: user.email });
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = hashPassword(createUserDto.password);
    return this.userService.create(null, createUserDto);
  }
}
