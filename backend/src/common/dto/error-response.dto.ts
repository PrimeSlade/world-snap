import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './base-response.dto';

export class ErrorResponseFormatDto extends BaseResponseDto {
  @ApiProperty({ example: 'error' })
  declare status: 'success' | 'error';

  @ApiProperty({ example: '/auth/register' })
  path: string;
}
