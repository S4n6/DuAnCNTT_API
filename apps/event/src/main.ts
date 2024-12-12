import { NestFactory } from '@nestjs/core';
import { EventModule } from './event.module';
import { ValidationPipe } from '@nestjs/common';
import { EVENT_CONSTANTS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(EventModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(EVENT_CONSTANTS.PORT);
}
bootstrap();
