import { Participant } from '../schema/participant.schema';
import { ParticipantDto } from './participant.dto';

export class ParticipantResponse {
  success: boolean;
  message: string;
  data: {
    participants: Participant | Participant[];
    page: number;
    total: number;
  };

  constructor(
    success: boolean,
    message: string,
    data: {
      participants: Participant | Participant[];
      page: number;
      total: number;
    },
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
