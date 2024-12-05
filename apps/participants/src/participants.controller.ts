import { Controller } from '@nestjs/common';
import { ParticipantsService } from './participants.service';

@Controller('/api/participants/')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}
}
