import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateServerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    summary: 'Server name',
    example: 'JSFullstack Server',
  })
  name: string;
}
