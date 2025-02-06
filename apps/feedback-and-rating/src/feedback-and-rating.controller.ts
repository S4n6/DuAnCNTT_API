import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FeedbackAndRatingService } from './feedback-and-rating.service';
import { IFeedbackResponse } from './response/feedback.response';
import { IRatingResponse } from './response/rating.response';
import { FeedbackRequest } from './request/feedback.request';
import { RatingRequest } from './request/rating.request';
import { FeedbackAndRatingGateway } from './feedback-and-rating.gateway';

@Controller('/api/feedbackAndRating/')
export class FeedbackAndRatingController {
  constructor(
    private readonly feedbackAndRatingService: FeedbackAndRatingService,
    private readonly feedbackAndRatingGateway: FeedbackAndRatingGateway,
  ) {}

  @Get('rating/:eventId')
  async getRatingByEventId(
    @Param() payload: { eventId: string },
  ): Promise<IRatingResponse> {
    return await this.feedbackAndRatingService.getRatingByEventId(
      payload.eventId,
    );
  }

  @Get('statistics/:eventId')
  async getRatingStatisticsByEventId(
    @Param() payload: { eventId: string },
  ): Promise<object> {
    return await this.feedbackAndRatingService.getRatingStatisticsByEventId(
      payload.eventId,
    );
  }

  @Post('survey')
  async createSurvey(
    @Body() survey: FeedbackRequest,
  ): Promise<IFeedbackResponse> {
    return await this.feedbackAndRatingService.sendSurveyEmail(survey);
  }

  @Post('rating')
  async createRating(@Body() rating: RatingRequest): Promise<IRatingResponse> {
    const response = await this.feedbackAndRatingService.ratingEvent(rating);
    console.log(response);
    if (response.success) {
      const updatedRating =
        await this.feedbackAndRatingService.getRatingByEventId(rating.eventId);
      this.feedbackAndRatingGateway.server.emit('ratingUpdate', updatedRating);
    }
    return response;
  }
}
