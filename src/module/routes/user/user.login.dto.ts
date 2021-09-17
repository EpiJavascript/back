import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User email',
    example: 'magenume@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User password',
    example: 'p@ssword',
  })
  password: string;
}
