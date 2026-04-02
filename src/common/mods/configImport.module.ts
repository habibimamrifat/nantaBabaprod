import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
      expandVariables: true,
    }),
  ],
})
export class ConfigImportModule {}
