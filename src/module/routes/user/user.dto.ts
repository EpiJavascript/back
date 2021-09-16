import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User username',
    example: 'MageNume',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User password',
    example: 'p@ssword',
  })
  password: string;
}
