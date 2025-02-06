import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { CheckInOutService } from './check-in-out.service';
import {
  CheckInOutResponse,
  ICheckInOutResponse,
} from './check-in-out.response';
import { Response } from 'express';
import { CheckInOutRequest } from './check-in-out.request';
import { CheckInOutGateway } from './check-in-out.gateway';

@Controller('/api/check-in-out/')
export class CheckInOutController {
  constructor(
    private readonly checkInOutService: CheckInOutService,
    private readonly checkInOutGateway: CheckInOutGateway,
  ) {}

  @Post('qr')
  async getQr(
    @Body() payload: { eventId: string; userId: string; ownerId: string },
  ): Promise<ICheckInOutResponse> {
    console.log('getQr::', payload);
    if (!payload.eventId || !payload.userId || !payload.ownerId) {
      return new CheckInOutResponse(false, 'Invalid request', null);
    }
    const response = await this.checkInOutService.checkInOutByQrCode(payload);
    return response;
  }

  @Get('check-in-by-qr-code')
  async checkInByQRCode(
    @Query('eventId') eventId: string,
    @Query('userId') userId: string,
  ): Promise<ICheckInOutResponse> {
    return this.checkInOutService.checkInByQRCode(eventId, userId);
  }

  @Get('check-out-by-qr-code')
  async checkOutByQRCode(
    @Query('eventId') eventId: string,
    @Query('userId') userId: string,
  ): Promise<ICheckInOutResponse> {
    return this.checkInOutService.checkOutByQRCode(eventId, userId);
  }

  @Post('check-in')
  async checkIn(
    @Body() payload: { email: string; eventId: string },
  ): Promise<ICheckInOutResponse> {
    console.log('checkIn::', payload);
    const response = await this.checkInOutService.checkIn(payload);
    if (response.success) {
      await this.checkInOutGateway.updateParticipantsCount(payload.eventId);
    }
    return response;
  }

  @Post('check-out')
  async checkOut(
    @Body() payload: { email: string; eventId: string },
  ): Promise<ICheckInOutResponse> {
    const response = await this.checkInOutService.checkOut(payload);
    if (response.success) {
      await this.checkInOutGateway.updateParticipantsCount(payload.eventId);
    }
    return response;
  }
}
