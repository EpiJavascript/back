import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'User username',
    example: 'MageNume',
  })
  username?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'User password',
    example: 'p@ssword',
  })
  password?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Image file in base64 encoding',
    example: 'Base64 string...',
  })
  image?: string;
}
