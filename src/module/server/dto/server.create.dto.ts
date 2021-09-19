import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateServerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Server name',
    example: 'JSFullstack Server',
  })
  name: string;
}
