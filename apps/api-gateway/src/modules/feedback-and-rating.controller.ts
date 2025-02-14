import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Inject,
  Param,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/api/feedback-and-rating/')
export class FeedbackAndRatingController {
  constructor(
    @Inject('FEEDBACK_AND_RATING_SERVICE')
    private readonly feedbackAndRatingServiceClient: ClientProxy,
  ) {}

  @Get(':eventId')
  async getFeedbackByEventId(@Param('eventId') eventId: string) {
    return this.feedbackAndRatingServiceClient
      .send({ cmd: 'getFeedbackByEventId' }, { eventId })
      .toPromise();
  }

  @Post('submit')
  async submitFeedback(
    @Body()
    data: {
      eventId: string;
      userId: string;
      rating: number;
      comment: string;
    },
  ) {
    return this.feedbackAndRatingServiceClient
      .send({ cmd: 'submitFeedback' }, data)
      .toPromise();
  }

  @Delete()
  async deleteFeedback(@Body() data: { feedbackId: string }) {
    return this.feedbackAndRatingServiceClient
      .send({ cmd: 'deleteFeedback' }, data)
      .toPromise();
  }
}
