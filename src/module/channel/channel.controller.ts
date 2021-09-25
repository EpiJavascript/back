import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Payload } from 'src/common/decorators/payload.decorator';
import JwtPayloadInterface from 'src/common/interfaces/jwt-payload';
import AuthGuard from '../../common/guards/auth.guard';
import Channel from './channel.entity';
import ChannelService from './channel.service';
import CreateChannelDto from './dto/channel.create.dto';

@Controller('channel')
export default class ChannelController {
  constructor(private readonly channelService: ChannelService) {
    this.channelService = channelService;
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('channel')
  @ApiOperation({
    operationId: 'findAll',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  findAll(@Payload() payload: JwtPayloadInterface): Promise<Channel[]> {
    return this.channelService.findAll(payload.userId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('channel')
  @ApiOperation({
    operationId: 'post',
  })
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.FORBIDDEN)
  create(@Body() createChannelDto: CreateChannelDto): Promise<Channel> {
    return this.channelService.create(createChannelDto);
  }
}
