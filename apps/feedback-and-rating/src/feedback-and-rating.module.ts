import { Module } from '@nestjs/common';
import { FeedbackAndRatingController } from './feedback-and-rating.controller';
import { FeedbackAndRatingService } from './feedback-and-rating.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FEEDBACK_RATING_CONSTANTS } from './constants';
import { RatingSchema } from './rating.schema';
import { FeedbackAndRatingGateway } from './feedback-and-rating.gateway';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forRoot(FEEDBACK_RATING_CONSTANTS.MONGO_URL),
    MongooseModule.forFeature([{ name: 'Rating', schema: RatingSchema }]),
    HttpModule,
  ],
  controllers: [FeedbackAndRatingController],
  providers: [FeedbackAndRatingService, FeedbackAndRatingGateway],
})
export class FeedbackAndRatingModule {}
