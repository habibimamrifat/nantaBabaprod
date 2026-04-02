import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    //set default valie for the exception
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'interrnal server error';

    //http exception

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        if ('message' in res) {
          const msg = (res as { message?: unknown }).message;

          if (Array.isArray(msg)) {
            message = msg.map(String);
          } else if (typeof msg === 'string') {
            message = msg;
          } else {
            message = 'Error occurred';
          }
        } else {
          message = 'Error occurred';
        }
      }
    } // ✅ Prisma unique constraint error
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      if (exception.code === 'P2002') {
        status = HttpStatus.CONFLICT;
        message = 'Duplicate entry detected';
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      status = HttpStatus.BAD_REQUEST;
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
