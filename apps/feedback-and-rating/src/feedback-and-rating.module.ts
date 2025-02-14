import { Module } from '@nestjs/common';
import { FeedbackAndRatingController } from './feedback-and-rating.controller';
import { FeedbackAndRatingService } from './feedback-and-rating.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FEEDBACK_RATING_CONSTANTS, RMQ_CONFIG } from './constants';
import { RatingSchema } from './rating.schema';
import { FeedbackAndRatingGateway } from './feedback-and-rating.gateway';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forRoot(FEEDBACK_RATING_CONSTANTS.MONGO_URL),
    MongooseModule.forFeature([{ name: 'Rating', schema: RatingSchema }]),
    HttpModule,
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        ...RMQ_CONFIG,
      },
    ]),
  ],
  controllers: [FeedbackAndRatingController],
  providers: [FeedbackAndRatingService, FeedbackAndRatingGateway],
})
export class FeedbackAndRatingModule {}
