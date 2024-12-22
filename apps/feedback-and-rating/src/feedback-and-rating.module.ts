import { Module } from '@nestjs/common';
import { FeedbackAndRatingController } from './feedback-and-rating.controller';
import { FeedbackAndRatingService } from './feedback-and-rating.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FEEDBACK_RATING_CONSTANTS } from './constants';
import { RatingSchema } from './rating.schema';

@Module({
  imports: [
    MongooseModule.forRoot(FEEDBACK_RATING_CONSTANTS.MONGO_URL),
    MongooseModule.forFeature([{ name: 'Rating', schema: RatingSchema }]),
  ],
  controllers: [FeedbackAndRatingController],
  providers: [FeedbackAndRatingService],
})
export class FeedbackAndRatingModule {}
