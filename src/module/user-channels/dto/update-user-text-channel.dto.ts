import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateUserTextChannelDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray({
    message: 'User ids',
  })
  @ApiProperty({
    description: 'Array of user ids (useless when creating a channel for a server)',
    example: ['35aebf71-037d-4b3b-9a53-6327a83a9354', '35aebf71-037d-4b3b-9a53-6327a83a9355'],
  })
  userIds: string[];
}
