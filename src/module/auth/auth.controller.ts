import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './provider/auth.service';
import { LogInDto } from './dtos/logIn.dto';
import { AccessTo } from '../../common/decorators/access.decorator';
import { RouteAccess } from '../../common/enums/routeAccess.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('/signIn')
  @AccessTo(RouteAccess.PUBLIC)
  signIn(@Body() payload: LogInDto) {
    return this.authservice.signIn(payload);
  }
}
