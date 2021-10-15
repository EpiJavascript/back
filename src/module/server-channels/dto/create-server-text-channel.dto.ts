import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateServerTextChannelDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    summary: 'Channel name',
    example: 'General',
  })
  name: string;
}
