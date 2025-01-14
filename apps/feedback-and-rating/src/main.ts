import { NestFactory } from '@nestjs/core';
import { FeedbackAndRatingModule } from './feedback-and-rating.module';
import { ValidationPipe } from '@nestjs/common';
import { FEEDBACK_RATING_CONSTANTS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(FeedbackAndRatingModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(FEEDBACK_RATING_CONSTANTS.PORT);
  console.log(`FeedbackAndRating service is running on: ${await app.getUrl()}`);
}
bootstrap();
