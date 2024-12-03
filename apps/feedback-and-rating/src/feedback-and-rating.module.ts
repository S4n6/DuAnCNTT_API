import { Module } from '@nestjs/common';
import { FeedbackAndRatingController } from './feedback-and-rating.controller';
import { FeedbackAndRatingService } from './feedback-and-rating.service';

@Module({
  imports: [],
  controllers: [FeedbackAndRatingController],
  providers: [FeedbackAndRatingService],
})
export class FeedbackAndRatingModule {}
