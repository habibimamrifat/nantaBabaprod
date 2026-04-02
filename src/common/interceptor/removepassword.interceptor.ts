import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, map } from 'rxjs';

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string | string[];
  data?: T;
  path?: string;
  timeStamp: string;
}

@Injectable()
export class RemovePasswordInterceptor<T = any> implements NestInterceptor<
  ApiResponse<T>,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<ApiResponse<T>>,
  ): Observable<ApiResponse<T>> {
    const request: Request = context.switchToHttp().getRequest();
    console.log('Incoming Request Body interceptor ===>>', request.body);

    return next.handle().pipe(
      map((response: ApiResponse<T>): ApiResponse<T> => {
        if (response?.data) {
          const data = response.data;

          // Handle array
          if (Array.isArray(data)) {
            response.data = data.map((item) => {
              if (item && typeof item === 'object' && 'password' in item) {
                const { password, ...rest } = item as any;
                return rest as T;
              }
              return item as T;
            }) as unknown as T;
          }
          // Handle single object
          else if (data && typeof data === 'object' && 'password' in data) {
            const { password, ...rest } = data as any;
            response.data = rest as T;
          }
        }

        return response;
      }),
    );
  }
}
