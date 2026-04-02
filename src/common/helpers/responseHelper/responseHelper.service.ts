import { Injectable } from '@nestjs/common';
import { ResponseTypeInterface } from '../../types/responseType.interface';

@Injectable()
export class SendResponse {
  public success<T = any>(
    statusCode: number,
    message: string | string[],
    data?: T,
    path?: string,
  ): ResponseTypeInterface<T> {
    return {
      success: true,
      statusCode,
      message,
      data,
      path,
      timeStamp: new Date().toISOString(),
    };
  }

  public error<T = any>(
    statusCode: number,
    message: string | string[],
    data?: T,
    path?: string,
  ): ResponseTypeInterface<T> {
    return {
      success: false,
      statusCode,
      message,
      data,
      path,
      timeStamp: new Date().toISOString(),
    };
  }
}
