import { Controller, Get } from '@nestjs/common';
import { FeedbackAndRatingService } from './feedback-and-rating.service';

@Controller()
export class FeedbackAndRatingController {
  constructor(private readonly feedbackAndRatingService: FeedbackAndRatingService) {}

  @Get()
  getHello(): string {
    return this.feedbackAndRatingService.getHello();
  }
}
