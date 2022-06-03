import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
    logger: ['verbose', 'log', 'debug', 'warn', 'error'],
  });
  const PORT = process.env.APP_PORT || 5000;

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.setGlobalPrefix('api');

  app.use(cookieParser());

  await app.listen(PORT);
  console.log('API started on port ' + PORT);
}

bootstrap();
