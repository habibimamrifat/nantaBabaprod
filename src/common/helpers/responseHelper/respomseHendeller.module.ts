import { Global, Module } from '@nestjs/common';
import { SendResponse } from './responseHelper.service';

@Global()
@Module({
  providers: [SendResponse],
  exports: [SendResponse],
})
export class SendResponseModule {}
