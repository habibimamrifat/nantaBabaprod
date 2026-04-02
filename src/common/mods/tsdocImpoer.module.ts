import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'docs'),
      serveRoot: '/code/docs',
    }),
  ],
})
export class TSDocImportModule {}
