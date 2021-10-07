import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class AuthDto {
  public constructor(init?:Partial<AuthDto>) {
    Object.assign(this, init);
  }

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Bearer token',
    example: 'eyJhbGciOiJ...',
  })
  token: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User email',
    example: 'magnume@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User username',
    example: 'MageNume',
  })
  username: string;

}
