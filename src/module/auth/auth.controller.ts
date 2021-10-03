import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import CreateUserDto from 'src/module/users/dto/user.create.dto';
import LoginUserDto from 'src/module/users/dto/user.login.dto';
import User from 'src/module/users/entities/user.entity';
import AuthService from './auth.service';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }

  @Post('login')
  @ApiTags('auth')
  @ApiOperation({
    operationId: 'login',
    description: 'Perform a login and get a JWT token',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  login(@Body() loginUserDto: LoginUserDto): Promise<string> {
    return this.authService.login(loginUserDto);
  }

  @Post('register')
  @ApiTags('auth')
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
