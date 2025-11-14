import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto {
  @ApiProperty({ example: 'success' })
  status: 'success' | 'error';

  @ApiProperty({ example: 'Request successful' })
  message: string;

  @ApiProperty({ example: new Date().toISOString() })
  timestamp: string;
}
