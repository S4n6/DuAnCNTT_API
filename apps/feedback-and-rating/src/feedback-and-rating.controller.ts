import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FeedbackAndRatingService } from './feedback-and-rating.service';
import { IFeedbackResponse } from './response/feedback.response';
import { IRatingResponse } from './response/rating.response';
import { FeedbackRequest } from './request/feedback.request';
import { RatingRequest } from './request/rating.request';
import { FeedbackAndRatingGateway } from './feedback-and-rating.gateway';

@Controller()
export class FeedbackAndRatingController {
  constructor(
    private readonly feedbackAndRatingService: FeedbackAndRatingService,
    private readonly feedbackAndRatingGateway: FeedbackAndRatingGateway,
  ) {}

  @MessagePattern('getRatingByEventId')
  async getRatingByEventId(
    @Payload() payload: { eventId: string },
  ): Promise<object> {
    return await this.feedbackAndRatingService.getRatingByEventId(
      payload.eventId,
    );
  }

  @MessagePattern('getRatingStatisticsByEventId')
  async getRatingStatisticsByEventId(
    @Payload() payload: { eventId: string },
  ): Promise<object> {
    return await this.feedbackAndRatingService.getRatingStatisticsByEventId(
      payload.eventId,
    );
  }

  @MessagePattern('createSurvey')
  async createSurvey(
    @Payload() survey: FeedbackRequest,
  ): Promise<IFeedbackResponse> {
    return await this.feedbackAndRatingService.sendSurveyEmail(survey);
  }

  @MessagePattern('createRating')
  async createRating(@Payload() rating: RatingRequest): Promise<IRatingResponse> {
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
