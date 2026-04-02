import { Module } from '@nestjs/common';
import { HashingAbstract } from './hasingAbstract';
import { BcryptFunctions } from './bcryptFunctions';

@Module({
  providers: [
    {
      provide: HashingAbstract,
      useClass: BcryptFunctions,
    },
  ],
  exports: [HashingAbstract],
})
export class BcryptImportModule {}
