import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EmailRequestNotify } from 'apps/email/src/email.request';
import { JwtAuthGuard } from 'lib/common/auth/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('/api/email')
export class EmailController {
  constructor(
    @Inject('EMAIL_SERVICE') private readonly emailService: ClientProxy,
  ) {}

  @Post('notify')
  async notify(@Body() payload: { email: EmailRequestNotify }) {
    return this.emailService.send({ cmd: 'notify' }, payload).toPromise();
  }
}
