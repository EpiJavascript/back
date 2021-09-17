import {
  Body, Controller, HttpCode, HttpStatus, Post,
} from '@nestjs/common';
import CreateUserDto from '../user/user.create.dto';
import LoginUserDto from '../user/user.login.dto';
import AuthService from './auth.service';
import User from '../user/user.entity';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  login(@Body() loginUserDto: LoginUserDto): Promise<string> {
    return this.authService.login(loginUserDto);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }
}
