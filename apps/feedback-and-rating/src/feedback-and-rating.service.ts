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
import { FeedbackAndRatingGateway } from './feedback-and-rating.gateway';

@Injectable()
export class FeedbackAndRatingService {
  constructor(
    @InjectModel(Rating.name) private ratingModel: Model<RatingDocument>,
  ) {}

  async getRatingByEventId(
    eventId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<IRatingResponse> {
    try {
      const skip = (page - 1) * limit;
      const ratings = await this.ratingModel
        .find({ eventId })
        .skip(skip)
        .limit(limit)
        .exec();
      const total = await this.ratingModel.countDocuments({ eventId }).exec();
      return new RatingResponse(true, 'Rating fetched successfully', {
        ratings,
        total,
        page,
      });
    } catch (error) {
      return new RatingResponse(
        false,
        error.message || 'Error fetching rating',
        null,
      );
    }
  }

  async getRatingStatisticsByEventId(eventId: string): Promise<object> {
    try {
      const ratings = await this.ratingModel.find({ eventId }).exec();
      const total = ratings.length;
      const average = ratings.reduce(
        (acc, rating: any) => acc + rating?.rating,
        0,
      );
      console.log('average', average);
      const averageRating = average / total;
      const response = {
        success: true,
        message: 'Rating statistics fetched successfully',
        data: {
          average: averageRating,
          total,
        },
      };
      return response;
    } catch (error) {
      return new RatingResponse(
        false,
        error.message || 'Error fetching rating statistics',
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
      return new RatingResponse(true, 'Event rated successfully', {
        ratings: rating,
        total: 1,
        page: 1,
      });
    } catch (error) {
      return new RatingResponse(
        false,
        error.message || 'Error rating event',
        null,
      );
    }
  }
}
