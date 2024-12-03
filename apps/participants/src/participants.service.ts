import { Injectable } from '@nestjs/common';

@Injectable()
export class ParticipantsService {
  getHello(): string {
    return 'Hello World!';
  }
}
