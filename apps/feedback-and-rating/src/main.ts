import { NestFactory } from '@nestjs/core';
import { FeedbackAndRatingModule } from './feedback-and-rating.module';
import { ValidationPipe } from '@nestjs/common';
import { FEEDBACK_RATING_CONSTANTS, RMQ_CONFIG } from './constants';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(FeedbackAndRatingModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(FEEDBACK_RATING_CONSTANTS.PORT);
  console.log(`FeedbackAndRating service is running on: ${await app.getUrl()}`);

  const microservice = app.connectMicroservice<MicroserviceOptions>(RMQ_CONFIG);
  microservice.listen();
  console.log(
    'FeedbackAndRating service is listening for messages from RabbitMQ',
  );
}
bootstrap();
