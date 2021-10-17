import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateServerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Server name',
    example: 'JSFullstack Server',
  })
  name: string;
}
