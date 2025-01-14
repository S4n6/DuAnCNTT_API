import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { CheckInOutService } from './check-in-out.service';
import { ICheckInOutResponse } from './check-in-out.response';
import { Response } from 'express';
import { CheckInOutRequest } from './check-in-out.request';
import { CheckInOutGateway } from './check-in-out.gateway';

@Controller('/api/check-in-out/')
export class CheckInOutController {
  constructor(
    private readonly checkInOutService: CheckInOutService,
    private readonly checkInOutGateway: CheckInOutGateway,
  ) {}

  @Post('qr/:type')
  async qr(
    @Param('type') type: string,
    @Res() res: Response,
    @Body() event: { eventId: string; userId: string },
  ) {
    const qrCodeDataURL = await this.checkInOutService.generateQRCode(
      type,
      event.eventId,
      event.userId,
    );
    if (!qrCodeDataURL.success) {
      return res.status(500).send(qrCodeDataURL.message);
    }
    res.setHeader('Content-Type', 'image/png');
    res.send(Buffer.from(qrCodeDataURL.data.split(',')[1], 'base64'));
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
