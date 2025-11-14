import { applyDecorators } from '@nestjs/common';
import { createResponseDto } from '../dto/response.dto';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorResponseFormatDto } from '../dto/error-response.dto';

export function ApiSuccessResponse<T>(
  model: new () => T,
  description = 'Request successful',
  statusCode: 200 | 201 = 200,
) {
  const ResponseDto = createResponseDto(model);

  return applyDecorators(
    ApiResponse({ status: statusCode, type: ResponseDto, description }),
  );
}

interface ErrorResponse {
  statusCode: number;
  description: string;
}

export function ApiErrorResponse(res: ErrorResponse[]) {
  const decorators = res.map((r) =>
    ApiResponse({
      status: r.statusCode,
      type: ErrorResponseFormatDto,
      description: r.description,
    }),
  );

  return applyDecorators(...decorators);
}
