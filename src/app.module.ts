import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './module/prisma/prisma.service';
import { PrismaModule } from './module/prisma/prisma.module';
import { UserModule } from './module/users/user.module';
import { ConfigImportModule } from './common/mods/configImport.module';
import { TSDocImportModule } from './common/mods/tsdocImpoer.module';
import { SendResponseModule } from './common/helpers/responseHelper/respomseHendeller.module';
import { AuthModule } from './module/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessGuard } from './common/guard/access.guard';
import { AuthenticationGuard } from './common/guard/authentication.guard';
import { FriendsModule } from './module/firends/friends.module';

@Module({
  imports: [
    ConfigImportModule,
    SendResponseModule,
    TSDocImportModule,
    PrismaModule,
    UserModule,
    AuthModule,
    FriendsModule,
    // BcryptImportModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    AuthenticationGuard,
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
  ],
})
export class AppModule {}
