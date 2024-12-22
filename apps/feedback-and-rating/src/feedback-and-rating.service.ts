import { Injectable } from '@nestjs/common';
import { IFeedbackResponse } from './response/feedback.response';
import { FeedbackRequest } from './request/feedback.request';
import { RatingRequest } from './request/rating.request';
import { IRatingResponse } from './response/rating.response';

@Injectable()
export class FeedbackAndRatingService {
  async sendSurveyEmail(event: FeedbackRequest): Promise<IFeedbackResponse> {
    try {
    } catch (error) {}
  }

  async sendRatingEmail(event: RatingRequest): Promise<IRatingResponse> {
    try {
    } catch (error) {}
  }
}
