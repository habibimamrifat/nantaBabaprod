import {
  BadRequestException,
  ConflictException,
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
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
    try {
      const { password, ...rest } = payload;

      if (!password) {
        throw new BadRequestException('Password is required');
      }

      // ✅ Check if user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
      if (!password) {
        throw new ConflictException('User with this email already exists');
      }

      // ✅ Hash password
      const hashedPassword = await this.hashingService.createhash(password);

      const userData = {
        ...rest,
        password: hashedPassword,
      };

      // ❌ NEVER log sensitive data in production
      // console.log(userData);

      const data = await this.prisma.user.create({
        data: userData,
      });

      return this.sendResponse.success(
        HttpStatus.CREATED,
        'User created successfully',
        data,
      );
    } catch (error) {
      // Preserve known exceptions
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Something went wrong while creating user',
      );
    }
  }

  public async findAllUsers(user: any) {
    console.log('this user is trying to see all the user ==>>', user);
    const allUsers = await this.prisma.user.findMany();

    return this.sendResponse.success(
      HttpStatus.FOUND,
      'all the users founded',
      allUsers,
    );
  }
}
