import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateServerTextChannelDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    summary: 'Channel name',
    example: 'General',
  })
  name: string;
}
