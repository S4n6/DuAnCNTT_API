import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackAndRatingController } from './feedback-and-rating.controller';
import { FeedbackAndRatingService } from './feedback-and-rating.service';

describe('FeedbackAndRatingController', () => {
  let feedbackAndRatingController: FeedbackAndRatingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackAndRatingController],
      providers: [FeedbackAndRatingService],
    }).compile();

    feedbackAndRatingController = app.get<FeedbackAndRatingController>(FeedbackAndRatingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(feedbackAndRatingController.getHello()).toBe('Hello World!');
    });
  });
});
