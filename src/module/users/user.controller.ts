import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { CreateUserDto } from './dto/createuser.dto';
import { RemovePasswordInterceptor } from '../../common/interceptor/removepassword.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @Post('/create-user')
  async createUser(@Body() payload: CreateUserDto) {
    return this.userServices.createUser(payload);
  }
}
