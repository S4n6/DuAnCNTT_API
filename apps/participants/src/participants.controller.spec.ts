import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';

describe('ParticipantsController', () => {
  let participantsController: ParticipantsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantsController],
      providers: [ParticipantsService],
    }).compile();

    participantsController = app.get<ParticipantsController>(ParticipantsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(participantsController.getHello()).toBe('Hello World!');
    });
  });
});
