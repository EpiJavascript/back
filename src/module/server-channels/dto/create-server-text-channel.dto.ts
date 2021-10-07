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

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Id of the server',
    example: '35aebf71-037d-4b3b-9a53-6327a83a9354',
  })
  serverId: string;
}
