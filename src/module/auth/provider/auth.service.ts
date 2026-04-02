import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../../users/providers/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
}
