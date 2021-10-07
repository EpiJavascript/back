import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import ServerChannelsService from './server-channels.service';
import ServersService from '../servers/servers.service';

@Controller()
@ApiTags('serverChannels')
export default class UserChannelsController {
  constructor(
    private readonly serverChannelsService: ServerChannelsService,
    private readonly serversService: ServersService,
  ) { }

  @Get()
  test(@Param('serverId') serverId: string): void {
    console.log(serverId);
  }
}
