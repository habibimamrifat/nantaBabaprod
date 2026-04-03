import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../users/providers/user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { LogInDto } from '../dtos/logIn.dto';
import { HashingAbstract } from '../../../common/helpers/hashing/hasingAbstract';
import { JwtServiceCustom } from '../../../common/helpers/jwt/jwtCustom.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingAbstract: HashingAbstract,
    private readonly jwtService: JwtServiceCustom,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public async signIn(userCredential: LogInDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: userCredential.email,
        },
      });

      // ✅ 1. Check user existence FIRST
      if (!user) {
        throw new NotFoundException('User not found with this email');
      }

      // ✅ 2. Ensure password exists (important if social login exists)
      if (!user.password) {
        throw new UnauthorizedException(
          'This account does not have a password. Use social login.',
        );
      }

      // ✅ 3. Compare password
      const isMatch = await this.hashingAbstract.compareHash(
        userCredential.password,
        user.password, // now guaranteed string ✅
      );

      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // ✅ 4. TODO: generate JWT
      // const token = await this.jwtService.signAsync({ userId: user.id });
      const payload = {
        sub: user.id,
        email: user.email,
      };

      const accessToken = this.jwtService.generateAccessToken(payload);
      const refreshToken = this.jwtService.generateRefreshToken(payload);

      return { accessToken, refreshToken, ...user };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Something went wrong during sign in',
      );
    }
  }
}
