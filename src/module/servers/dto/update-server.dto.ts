import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateServerDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Server name',
    example: 'JSFullstack Server',
  })
  name?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Image file',
    type: 'file',
  })
  image?: Express.Multer.File;
}
