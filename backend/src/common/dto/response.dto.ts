import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './base-response.dto';

export class ResponseFormatDto<T> extends BaseResponseDto {
  @ApiProperty({ type: Object })
  data: T;
}

export function createResponseDto<T>(model: new () => T) {
  class ResponseDto extends ResponseFormatDto<T> {
    @ApiProperty({ type: model })
    declare data: T;
  }

  return ResponseDto;
}
