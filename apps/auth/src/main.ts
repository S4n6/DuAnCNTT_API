import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { AUTH_CONSTANTS } from './constants';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*' });
  await app.listen(AUTH_CONSTANTS.PORT);
  console.log(`Auth service is running on: ${await app.getUrl()}`);
}
bootstrap();
