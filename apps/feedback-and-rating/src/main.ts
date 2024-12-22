import { NestFactory } from '@nestjs/core';
import { FeedbackAndRatingModule } from './feedback-and-rating.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(FeedbackAndRatingModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
