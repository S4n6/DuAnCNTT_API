import { Controller, Get } from '@nestjs/common';
import { CheckInOutService } from './check-in-out.service';

@Controller()
export class CheckInOutController {
  constructor(private readonly checkInOutService: CheckInOutService) {}

  @Get()
  getHello(): string {
    return this.checkInOutService.getHello();
  }
}
