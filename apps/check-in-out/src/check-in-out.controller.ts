import { Body, Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CheckInOutService } from './check-in-out.service';
import {
  CheckInOutResponse,
  ICheckInOutResponse,
} from './check-in-out.response';
import { CheckInOutGateway } from './check-in-out.gateway';

@Controller()
export class CheckInOutController {
  constructor(
    private readonly checkInOutService: CheckInOutService,
    private readonly checkInOutGateway: CheckInOutGateway,
  ) {}

  @MessagePattern({ cmd: 'get_participants_count' })
  async getParticipantsCount(
    @Payload() payload: { eventId: string },
  ): Promise<object> {
    return await this.checkInOutService.getParticipantsCount(payload.eventId);
  }

  @MessagePattern({ cmd: 'qr' })
  async getQr(
    @Payload() payload: { eventId: string; userId: string; ownerId: string },
  ): Promise<ICheckInOutResponse> {
    console.log('getQr::', payload);
    if (!payload.eventId || !payload.userId || !payload.ownerId) {
      return new CheckInOutResponse(false, 'Invalid request', null);
    }
    const response = await this.checkInOutService.checkInOutByQrCode(payload);
    if (response.success) {
      await this.checkInOutGateway.updateParticipantsCount(payload.eventId);
    }
    return response;
  }

  @MessagePattern({ cmd: 'check_in' })
  async checkIn(
    @Payload() payload: { email: string; eventId: string },
  ): Promise<ICheckInOutResponse> {
    console.log('checkIn::', payload);
    const response = await this.checkInOutService.checkIn(payload);
    if (response.success) {
      await this.checkInOutGateway.updateParticipantsCount(payload.eventId);
    }
    return response;
  }

  @MessagePattern({ cmd: 'check_out' })
  async checkOut(
    @Payload() payload: { email: string; eventId: string },
  ): Promise<ICheckInOutResponse> {
    const response = await this.checkInOutService.checkOut(payload);
    if (response.success) {
      await this.checkInOutGateway.updateParticipantsCount(payload.eventId);
    }
    return response;
  }
}
