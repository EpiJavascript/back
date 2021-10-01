import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateChannelDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Channel name',
    example: 'General',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Id of the server',
    example: 1,
  })
  serverId: number;
}
