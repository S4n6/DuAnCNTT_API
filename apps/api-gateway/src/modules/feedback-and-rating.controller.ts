import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Inject,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'lib/common/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/api/feedback-and-rating/')
export class FeedbackAndRatingController {
  constructor(
    @Inject('FEEDBACK_AND_RATING_SERVICE')
    private readonly feedbackAndRatingServiceClient: ClientProxy,
  ) {}

  @Get('rating/:eventId')
  async getFeedbackByEventId(@Param('eventId') eventId: string) {
    return this.feedbackAndRatingServiceClient
      .send({ cmd: 'getFeedbackByEventId' }, { eventId })
      .toPromise();
  }

  @Post('rating')
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

  @Get('statistics/:eventId')
  async getFeedbackStatistics(@Param('eventId') eventId: string) {
    return this.feedbackAndRatingServiceClient
      .send({ cmd: 'getRatingStatisticsByEventId' }, { eventId })
      .toPromise();
  }

  @Delete()
  async deleteFeedback(@Body() data: { feedbackId: string }) {
    return this.feedbackAndRatingServiceClient
      .send({ cmd: 'deleteFeedback' }, data)
      .toPromise();
  }
}
