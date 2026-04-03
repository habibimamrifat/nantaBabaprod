import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './provider/auth.service';
import { LogInDto } from './dtos/logIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('/signIn')
  signIn(@Body() payload: LogInDto) {
    return this.authservice.signIn(payload);
  }
}
