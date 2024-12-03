import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckInOutService {
  getHello(): string {
    return 'Hello World!';
  }
}
