import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import AuthGuard from 'src/common/guards/auth.guard';
import MessagesService from './messages.service';

@Controller()
@ApiTags('messages')
export default class MessagesController {
  constructor(private readonly messagesService: MessagesService) {
    this.messagesService = messagesService;
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'findAll',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  test(@Param(':messageFluxId') messageFluxId: string): void {
    console.log(messageFluxId);
  }
}
