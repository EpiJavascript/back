import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import AuthGuard from 'src/common/guards/auth.guard';
import User from './user.entity';
import UserService from './user.service';
import { Payload } from '../../common/decorators/payload.decorator';
import JwtPayloadInterface from 'src/common/interfaces/jwt-payload';

@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('user')
  @ApiOperation({
    operationId: 'findAll',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  findAll(@Payload() payload: JwtPayloadInterface): Promise<User[]> {
    console.log(payload); // test purpose
    return this.userService.findAll();
  }
}
