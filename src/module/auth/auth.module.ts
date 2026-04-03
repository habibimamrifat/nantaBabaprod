import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './provider/auth.service';
import { UserModule } from '../users/user.module';
import { BcryptImportModule } from '../../common/helpers/hashing/bcryptImport.module';
import { JwtCustomModule } from '../../common/helpers/jwt/jwtCustom.module';
@Module({
  imports: [forwardRef(() => UserModule), BcryptImportModule, JwtCustomModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
