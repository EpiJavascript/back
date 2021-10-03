import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Message',
    example: 'This is a message',
  })
  message: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Channel id',
    example: '35aebf71-037d-4b3b-9a53-6327a83a9354',
  })
  channelId: string;
}
