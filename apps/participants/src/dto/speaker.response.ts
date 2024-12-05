import { SpeakerDto } from './speaker.dto';

export class SpeakerResponse {
  success: boolean;
  message: string;
  data: SpeakerDto | SpeakerDto[];

  constructor(
    success: boolean,
    message: string,
    data: SpeakerDto | SpeakerDto[],
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
