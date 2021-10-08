import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import CreateUserDto from '../users/dto/create-user.dto';
import LoginUserDto from '../users/dto/login-user.dto';
import User from '../users/entities/user.entity';
import AuthService from './auth.service';
import AuthDto from './dto/auth.dto';

@Controller()
@ApiTags('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({
    operationId: 'login',
    description: 'Perform a login and get a JWT token',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  login(@Body() loginUserDto: LoginUserDto): Promise<AuthDto> {
    return this.authService.login(loginUserDto);
  }

  @Post('register')
  @ApiOperation({
    operationId: 'register',
    description: 'Perform a register and create an account',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }
}
