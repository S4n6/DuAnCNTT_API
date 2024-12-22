import { Body, Controller, Get, Post } from '@nestjs/common';
import { FeedbackAndRatingService } from './feedback-and-rating.service';
import { IFeedbackResponse } from './response/feedback.response';
import { IRatingResponse } from './response/rating.response';
import { FeedbackRequest } from './request/feedback.request';
import { RatingRequest } from './request/rating.request';

@Controller('/api/feedbackAndRating/')
export class FeedbackAndRatingController {
  constructor(
    private readonly feedbackAndRatingService: FeedbackAndRatingService,
  ) {}

  @Post('survey')
  async createSurvey(
    @Body() survey: FeedbackRequest,
  ): Promise<IFeedbackResponse> {
    return await this.feedbackAndRatingService.sendSurveyEmail(survey);
  }

  @Post('rating')
  async createRating(@Body() rating: RatingRequest): Promise<IRatingResponse> {
    return await this.feedbackAndRatingService.ratingEvent(rating);
  }
}
