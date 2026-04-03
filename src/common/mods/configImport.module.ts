import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { jwtEnvConfig } from '../config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV}`,
        '.env.development',
        '.env.production',
        '.env',
      ],
      load: [jwtEnvConfig],
      expandVariables: true,
    }),
  ],
})
export class ConfigImportModule {}
