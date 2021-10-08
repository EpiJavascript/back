import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserTextChannelDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Channel name',
    example: 'General',
  })
  name: string;
}
