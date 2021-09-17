import { Controller, Get } from '@nestjs/common';
import User from './user.entity';
import UserService from './user.service';

@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
