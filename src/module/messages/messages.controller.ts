import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Payload } from 'src/common/decorators/payload.decorator';

import JwtPayloadInterface from 'src/common/interfaces/jwt-payload';
import AuthGuard from 'src/common/guards/auth.guard';
import MessagesService from './messages.service';
import { Message } from './entities';

@Controller()
@ApiTags('messages')
export default class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'findAll',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  findAll(@Param(':messageFluxId') messageFluxId: string, @Payload() payload: JwtPayloadInterface): Promise<Message[]> {
    return this.messagesService.findAll(payload.userId, messageFluxId);
  }
}
