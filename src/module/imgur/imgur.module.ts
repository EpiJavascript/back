import { Module } from '@nestjs/common';

import ImgurService from './imgur.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ImgurService],
  exports: [ImgurService],
})
export default class ImgurModule { }
