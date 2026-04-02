import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerSetup } from './common/helpers/swagger/swaggerSetup';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { RemovePasswordInterceptor } from './common/interceptor/removepassword.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerSetup(app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // ⭐ THIS is the extra thing
      },
    }),
  );

  //handle global exception
  app.useGlobalFilters(new GlobalExceptionFilter());
  //se global interceptors
  app.useGlobalInterceptors(new RemovePasswordInterceptor());

  await app.listen(process.env.PORT ?? 3000);

  console.log('port ==>>>', process.env.PORT || 3000);
  console.log('NODE_ENV ==>>>', process.env.NODE_ENV);
}
bootstrap();
