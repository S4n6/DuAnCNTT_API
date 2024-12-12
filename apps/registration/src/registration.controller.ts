import { Body, Controller, Get, Post, Put } from '@nestjs/common';
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

  // @EventPattern('registration_created')
  @Post()
  async createRegistration(
    @Body() data: RegistrationRequestCreate,
  ): Promise<RegistrationResponse> {
    return this.registrationService.createRegistration(data);
  }

  @Put('/cancel')
  async cancelRegistration(
    @Body() data: RegistrationRequestCancel,
  ): Promise<RegistrationResponse> {
    return this.registrationService.cancelRegistration(data);
  }
}
