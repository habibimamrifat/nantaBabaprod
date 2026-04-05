import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CurrentUserType } from '../../../common/types/currentUser.type';

@Injectable()
export class FriendsService {
  constructor(private readonly prisma: PrismaService) {}

  async sendFriendRequest(user: CurrentUserType, friendId: string) {
    const sendRequest = await this.prisma.friends.create({
      data: {
        requestingUserId: user.sub, // 👈 sender
        requestedUserId: friendId, // 👈 receiver
      },
    });

    return sendRequest;
  }
}
