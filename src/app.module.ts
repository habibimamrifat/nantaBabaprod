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

@Module({
  imports: [
    ConfigImportModule,
    SendResponseModule,
    TSDocImportModule,
    PrismaModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
