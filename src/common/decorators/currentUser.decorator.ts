import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export enum CurrentUserProperty {
  EMAIL = 'email',
  ID = 'sub',
}

export const CurrentUser = createParamDecorator(
  (
    data: CurrentUserProperty | CurrentUserProperty[] | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user;

    // 🔒 If no user attached (guard missing or public route)
    if (!user) {
      return undefined;
    }

    // 👉 No data → return full user
    if (!data) {
      return user;
    }

    // 👉 If array → return selected fields
    if (Array.isArray(data)) {
      const result: Partial<typeof user> = {};

      for (const key of data) {
        if (user[key] !== undefined) {
          result[key] = user[key];
        }
      }

      return result;
    }

    // 👉 If single property → return that value
    return user[data];
  },
);
