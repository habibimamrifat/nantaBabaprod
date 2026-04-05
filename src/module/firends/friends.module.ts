import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './provider/friends.service';

@Module({
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
