import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../user/user.dto';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto): String {
    return this.authService.login(loginUserDto);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }
}
