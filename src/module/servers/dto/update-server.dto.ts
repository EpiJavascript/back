import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateServerDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Server name',
    example: 'JSFullstack Server',
  })
  name: string;
}
