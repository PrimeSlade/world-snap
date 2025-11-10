import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface responseFormat<T> {
  status: 'success';
  data: T;
  message: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<responseFormat<T>> {
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        data: data?.data ?? data,
        message: data?.message ?? 'Request successful',
        timestamp: new Date(),
      })),
    );
  }
}
