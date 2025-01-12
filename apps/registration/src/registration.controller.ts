import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  RegistrationRequestCancel,
  RegistrationRequestCreate,
} from './request/registration.request';
import { RegistrationResponse } from './response/registration.response';

@Controller('/api/registration/')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Get('isRegistered')
  async isRegistered(
    @Query('eventId') eventId: string,
    @Query('userId') userId: string,
  ): Promise<RegistrationResponse> {
    console.log('isRegistered::', eventId, userId);
    return this.registrationService.checkRegistrationOfUser(userId, eventId);
  }

  // @EventPattern('registration_created')
  @Post()
  async createRegistration(
    @Body() data: RegistrationRequestCreate,
  ): Promise<RegistrationResponse> {
    console.log('createRegistration::', data);
    return this.registrationService.createRegistration(data);
    // return this.registrationService.createRegistration(data);
  }

  @Post('/cancel')
  async cancelRegistration(
    @Body() data: RegistrationRequestCancel,
  ): Promise<RegistrationResponse> {
    return this.registrationService.cancelRegistration(data);
  }
}
