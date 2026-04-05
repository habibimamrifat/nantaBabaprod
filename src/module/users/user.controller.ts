import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { CreateUserDto } from './dto/createuser.dto';
import { AccessTo } from '../../common/decorators/access.decorator';
import { RouteAccess } from '../../common/enums/routeAccess.enum';
import {
  CurrentUser,
  CurrentUserProperty,
} from '../../common/decorators/currentUser.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @AccessTo(RouteAccess.PUBLIC)
  @Post('/create-user')
  async createUser(@Body() payload: CreateUserDto) {
    return this.userServices.createUser(payload);
  }

  @Get('/find-all-users')
  findAllUsers(@CurrentUser(CurrentUserProperty.ID) currentUser: any) {
    return this.userServices.findAllUsers(currentUser);
  }
}
