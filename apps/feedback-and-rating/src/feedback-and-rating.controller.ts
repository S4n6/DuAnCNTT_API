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
    @Body() event: FeedbackRequest,
  ): Promise<IFeedbackResponse> {
    return await this.feedbackAndRatingService.sendSurveyEmail(event);
  }

  @Post('rating')
  async createRating(@Body() event: RatingRequest): Promise<IRatingResponse> {
    return await this.feedbackAndRatingService.sendRatingEmail(event);
  }
}
