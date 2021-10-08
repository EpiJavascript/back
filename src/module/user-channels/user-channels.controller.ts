import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import ChannelsService from './user-channels.service';
import MessagesService from '../messages/messages.service';

@ApiTags()
@Controller()
export default class UserChannelsController {
  constructor(
    private readonly userChannelsService: ChannelsService,
    private readonly userMessagesService: MessagesService) { }

  @Get()
  test(): void {
    console.log('here');
  }
}
