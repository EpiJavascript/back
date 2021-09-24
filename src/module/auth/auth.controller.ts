import {
  Body, Controller, HttpCode, HttpStatus, Post,
} from '@nestjs/common';
import CreateUserDto from '../user/dto/user.create.dto';
import LoginUserDto from '../user/dto/user.login.dto';
import AuthService from './auth.service';
import User from '../user/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }

  @Post('login')
  @ApiTags('auth')
  @ApiOperation({
    operationId: 'login',
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
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }
}
