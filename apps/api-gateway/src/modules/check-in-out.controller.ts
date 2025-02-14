import { Controller, Post, Body, Get, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ICheckInOutResponse } from 'apps/check-in-out/src/check-in-out.response';

@Controller('/api/check-in-out/')
export class CheckInOutController {
  constructor(
    @Inject('CHECK_IN_OUT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get('participants-count/:eventId')
  async getParticipantsCount(
    @Param('eventId') eventId: string,
  ): Promise<object> {
    return this.client
      .send({ cmd: 'get_participants_count' }, { eventId })
      .toPromise();
  }

  @Post('qr')
  async getQr(
    @Body() payload: { eventId: string; userId: string; ownerId: string },
  ): Promise<ICheckInOutResponse> {
    return this.client.send({ cmd: 'get_qr' }, payload).toPromise();
  }

  @Post('check-in')
  async checkIn(
    @Body() payload: { email: string; eventId: string },
  ): Promise<ICheckInOutResponse> {
    return this.client.send({ cmd: 'check_in' }, payload).toPromise();
  }

  @Post('check-out')
  async checkOut(
    @Body() payload: { email: string; eventId: string },
  ): Promise<ICheckInOutResponse> {
    return this.client.send({ cmd: 'check_out' }, payload).toPromise();
  }
}
