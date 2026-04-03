import { SetMetadata } from '@nestjs/common';
import { ConversationMemberRoleEnum } from '../enums/conversationMemberRole.enum';
import { RouteAccess } from '../enums/routeAccess.enum';
import { ACCESS_KEY } from '../const/accessKey.const';

export type AccessFor = ConversationMemberRoleEnum | RouteAccess;

export const AccessTo = (...roles: AccessFor[]) => {
  if (roles.includes(RouteAccess.PUBLIC) && roles.length > 1) {
    throw new Error('public access cant be combined with other roles');
  }
  return SetMetadata(ACCESS_KEY, roles);
};
