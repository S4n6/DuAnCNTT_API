import { Injectable } from '@nestjs/common';
import {
  FeedbackResponse,
  IFeedbackResponse,
} from './response/feedback.response';
import { FeedbackRequest } from './request/feedback.request';
import { RatingRequest } from './request/rating.request';
import { IRatingResponse, RatingResponse } from './response/rating.response';
import { InjectModel } from '@nestjs/mongoose';
import { Rating, RatingDocument } from './rating.schema';
import { Model } from 'mongoose';

@Injectable()
export class FeedbackAndRatingService {
  constructor(
    @InjectModel(Rating.name) private ratingModel: Model<RatingDocument>,
  ) {}

  async getRatingByEventId(eventId: string): Promise<IRatingResponse> {
    try {
      const ratings = await this.ratingModel.find({ eventId });
      return new RatingResponse(true, 'Rating fetched successfully', ratings);
    } catch (error) {
      return new RatingResponse(
        false,
        error.message || 'Error fetching rating',
        null,
      );
    }
  }

  async sendSurveyEmail(event: FeedbackRequest): Promise<IFeedbackResponse> {
    try {
      // call api email service and send link survey
    } catch (error) {
      return new FeedbackResponse(
        false,
        error.message || 'Error sending survey',
        null,
      );
    }
  }

  async ratingEvent(event: RatingRequest): Promise<IRatingResponse> {
    try {
      const rating = new this.ratingModel(event);
      await rating.save();
      return new RatingResponse(true, 'Event rated successfully', rating);
    } catch (error) {
      return new RatingResponse(
        false,
        error.message || 'Error rating event',
        null,
      );
    }
  }
}
