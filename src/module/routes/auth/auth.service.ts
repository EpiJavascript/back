import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { CreateUserDto, LoginUserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  generateToken() {}

  async login(loginUserDto: LoginUserDto): Promise<String> {
    const user: User = await this.userService.findByEmail(loginUserDto.email);
    if (user === undefined) {
      throw new HttpException('bad_email', HttpStatus.BAD_REQUEST);
    }
    if (user.password != loginUserDto.password) {
      throw new HttpException('bad_password', HttpStatus.BAD_REQUEST);
    }
    console.log(user);
    return 'oui';
  }

  register(createUserDto: CreateUserDto): Promise<User> {
    const user: User = this.userService.generateFromDto(createUserDto);
    return this.userService.create(user);
  }
}
