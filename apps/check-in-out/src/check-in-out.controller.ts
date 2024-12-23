import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
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
    @Body() event: object,
  ) {
    const qrCodeDataURL = await this.checkInOutService.generateQRCode(
      type,
      event,
    );
    if (!qrCodeDataURL.success) {
      return res.status(500).send(qrCodeDataURL.message);
    }
    res.setHeader('Content-Type', 'image/png');
    res.send(Buffer.from(qrCodeDataURL.data.split(',')[1], 'base64'));
  }

  @Post('check-in')
  async checkIn(
    @Body() participantInfo: CheckInOutRequest,
  ): Promise<ICheckInOutResponse> {
    const response = await this.checkInOutService.checkIn(participantInfo);
    if (response.success) {
      await this.checkInOutGateway.updateParticipantsCount(
        participantInfo.eventId,
      );
    }
    return response;
  }

  @Post('check-out')
  async checkOut(
    @Body() participantInfo: CheckInOutRequest,
  ): Promise<ICheckInOutResponse> {
    return this.checkInOutService.checkOut(participantInfo);
  }
}
