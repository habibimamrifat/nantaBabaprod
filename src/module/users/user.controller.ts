import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { CreateUserDto } from './dto/createuser.dto';
import { AccessTo } from '../../common/decorators/access.decorator';
import { RouteAccess } from '../../common/enums/routeAccess.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @AccessTo(RouteAccess.PUBLIC)
  @Post('/create-user')
  async createUser(@Body() payload: CreateUserDto) {
    return this.userServices.createUser(payload);
  }
}
