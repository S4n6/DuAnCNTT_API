import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Inject,
  Param,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  RegistrationRequestCancel,
  RegistrationRequestCreate,
} from 'apps/registration/src/request/registration.request';
import { RegistrationResponse } from 'apps/registration/src/response/registration.response';

@Controller('/api/registrations/')
export class RegistrationController {
  constructor(
    @Inject('REGISTRATION_SERVICE')
    private readonly registrationServiceClient: ClientProxy,
  ) {}

  @Get('isRegistered')
  async isRegistered(
    @Query() data: { eventId: string; userId: string },
  ): Promise<RegistrationResponse> {
    return this.registrationServiceClient
      .send({ cmd: 'is_registered' }, data)
      .toPromise();
  }

  @Get(':userId')
  async getRegistrations(
    @Param('userId') userId: string,
  ): Promise<RegistrationResponse> {
    return this.registrationServiceClient
      .send({ cmd: 'get_registrations' }, { userId })
      .toPromise();
  }

  @Post()
  async createRegistration(
    @Body() data: RegistrationRequestCreate,
  ): Promise<RegistrationResponse> {
    return this.registrationServiceClient
      .send({ cmd: 'create_registration' }, data)
      .toPromise();
  }

  @Post('cancel')
  async cancelRegistration(
    @Body() data: RegistrationRequestCancel,
  ): Promise<RegistrationResponse> {
    return this.registrationServiceClient
      .send({ cmd: 'cancel_registration' }, data)
      .toPromise();
  }
}
