import { Controller, Get } from '@nestjs/common';
import { FeedbackAndRatingService } from './feedback-and-rating.service';

@Controller('/api/feedbackAndRating/')
export class FeedbackAndRatingController {
  constructor(private readonly feedbackAndRatingService: FeedbackAndRatingService) {}

  
}
