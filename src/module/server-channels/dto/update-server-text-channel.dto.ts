import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateServerTextChannelDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Channel name',
    example: 'General',
  })
  name?: string;
}
