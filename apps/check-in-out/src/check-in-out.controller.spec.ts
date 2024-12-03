import { Test, TestingModule } from '@nestjs/testing';
import { CheckInOutController } from './check-in-out.controller';
import { CheckInOutService } from './check-in-out.service';

describe('CheckInOutController', () => {
  let checkInOutController: CheckInOutController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CheckInOutController],
      providers: [CheckInOutService],
    }).compile();

    checkInOutController = app.get<CheckInOutController>(CheckInOutController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(checkInOutController.getHello()).toBe('Hello World!');
    });
  });
});
