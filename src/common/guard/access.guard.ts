import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCESS_KEY } from '../const/accessKey.const';
import { AccessFor } from '../decorators/access.decorator';
import { RouteAccess } from '../enums/routeAccess.enum';
import { AuthenticationGuard } from './authentication.guard';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authenticationGuard: AuthenticationGuard,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const accessTo = this.reflector.getAllAndOverride<AccessFor[]>(ACCESS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) || [RouteAccess.TOKEN];

    if (accessTo.includes(RouteAccess.PUBLIC)) {
      return true;
    }

    const isAuthenticated = this.authenticationGuard.canActivate(context);
    return true;
  }
}
