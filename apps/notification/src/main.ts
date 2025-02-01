import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3003);
  console.log(`Notification service is running on: ${await app.getUrl()}`);
}
bootstrap();
