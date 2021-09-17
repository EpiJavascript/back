import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import User from '../user/user.entity';
import CreateUserDto from '../user/user.create.dto';
import LoginUserDto from '../user/user.login.dto';
import UserService from '../user/user.service';

@Injectable()
export default class AuthService {
  constructor(private userService: UserService) {
    this.userService = userService;
  }

  async login(loginUserDto: LoginUserDto): Promise<string> {
    const user: User = await this.userService.findByEmail(loginUserDto.email);
    if (user === undefined) {
      throw new HttpException('bad_email', HttpStatus.BAD_REQUEST);
    }
    if (user.password !== loginUserDto.password) {
      throw new HttpException('bad_password', HttpStatus.BAD_REQUEST);
    }
    const token: string = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY,
    );
    return token;
  }

  register(createUserDto: CreateUserDto): Promise<User> {
    const user: User = this.userService.generateFromDto(createUserDto);
    return this.userService.create(user);
  }
}
