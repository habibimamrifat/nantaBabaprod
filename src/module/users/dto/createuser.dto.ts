import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsOptional()
  @IsString()
  password: string;

  @ApiPropertyOptional({
    example: 'google123',
    description: 'The Google ID of the user',
  })
  @IsOptional()
  @IsString()
  googleId: string;
}
