import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuth {
  @ApiProperty({ example: 'Okok' })
  name: string;

  @ApiProperty({ example: 'okok@gmail.com' })
  email: string;

  @ApiProperty({ example: '11111' })
  password: string;
}

export class SignInAuth {
  @ApiProperty({ example: 'okok@gmail.com' })
  email: string;

  @ApiProperty({ example: '11111' })
  password: string;
}
