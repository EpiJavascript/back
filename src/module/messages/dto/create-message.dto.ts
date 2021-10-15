import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    summary: 'Message',
    example: 'This is a message',
  })
  message: string;
}
