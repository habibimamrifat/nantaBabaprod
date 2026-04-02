import {
  forwardRef,
  HttpCode,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/createuser.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { HashingAbstract } from '../../../common/helpers/hashing/hasingAbstract';
import { SendResponse } from '../../../common/helpers/responseHelper/responseHelper.service';
import { AuthService } from '../../auth/provider/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingAbstract,
    private readonly sendResponse: SendResponse,
    @Inject(forwardRef(() => AuthService))
    private readonly authservice: AuthService,
  ) {}

  public async createUser(payload: CreateUserDto) {
    const { password, ...rest } = payload;
    const hashPassword = await this.hashingService.createhash(password);

    const userData = {
      ...rest,
      password: hashPassword,
    };
    console.log('printing from user service', userData);

    const data = await this.prisma.user.create({
      data: userData,
    });

    return this.sendResponse.success(
      HttpStatus.CREATED,
      'user created sucessfully',
      data,
    );
  }
}
