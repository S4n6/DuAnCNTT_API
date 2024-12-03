import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedbackAndRatingService {
  getHello(): string {
    return 'Hello World!';
  }
}
