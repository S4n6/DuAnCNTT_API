import { Controller, Get } from '@nestjs/common';
import { ParticipantsService } from './participants.service';

@Controller()
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Get()
  getHello(): string {
    return this.participantsService.getHello();
  }
}
