import { Controller, Post, Query } from '@nestjs/common';
import { FriendsService } from './provider/friends.service';
import { PrismaService } from '../prisma/prisma.service';
import type { CurrentUserType } from '../../common/types/currentUser.type';
import { CurrentUser } from '../../common/decorators/currentUser.decorator';

@Controller('friends')
export class FriendsController {
  constructor(
    private readonly friendService: FriendsService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('/sendRequest')
  sendFriendRequest(
    @CurrentUser() currentUser: CurrentUserType,
    @Query('friendId') friendId: string,
  ) {
    return this.friendService.sendFriendRequest(currentUser, friendId);
  }
}
