import { NestFactory } from '@nestjs/core';
import { FeedbackAndRatingModule } from './feedback-and-rating.module';

async function bootstrap() {
  const app = await NestFactory.create(FeedbackAndRatingModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
