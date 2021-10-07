import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import JwtPayloadInterface from 'src/common/interfaces/jwt-payload';
import { Payload } from 'src/common/decorators/payload.decorator';
import AuthGuard from 'src/common/guards/auth.guard';
import MessagesService from './messages.service';
import Message from './entities/message.entity';

@Controller('messages')
export default class MessagesController {
  constructor(private readonly messagesService: MessagesService) {
    this.messagesService = messagesService;
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('messages')
  @ApiOperation({
    operationId: 'findAll',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  findAll(@Payload() payload: JwtPayloadInterface): Promise<Message[]> {
    return this.messagesService.findAll(payload.userId);
  }
}
