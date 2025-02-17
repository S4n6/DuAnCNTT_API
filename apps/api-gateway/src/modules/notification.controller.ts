import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Inject,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'lib/common/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/api/notifications/')
export class NotificationController {
  constructor(
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationServiceClient: ClientProxy,
  ) {}

  @Post()
  async createNotification(
    @Body() notification: { title: string; message: string; userId: string },
  ) {
    return this.notificationServiceClient
      .send({ cmd: 'createNotification' }, notification)
      .toPromise();
  }

  @Get()
  async getAllNotifications(@Query() data: { page: number; limit: number }) {
    return this.notificationServiceClient
      .send({ cmd: 'getAllNotifications' }, data)
      .toPromise();
  }

  @Get('unread/:userId')
  async getUnreadNotificationsNumber(@Param('userId') userId: string) {
    return this.notificationServiceClient
      .send({ cmd: 'getUnreadNotificationsNumber' }, { userId })
      .toPromise();
  }

  @Get(':userId')
  async getUserNotifications(
    @Query() query: { page: number; limit: number },
    @Param('userId') userId: string,
  ) {
    const data = { ...query, userId };
    return this.notificationServiceClient
      .send({ cmd: 'getUserNotifications' }, data)
      .toPromise();
  }

  @Post('send')
  async sendNotificationToUser(
    @Body() data: { userId: string; message: { title: string; body: string } },
  ) {
    return this.notificationServiceClient
      .send({ cmd: 'sendNotificationToUser' }, data)
      .toPromise();
  }

  @Put(':notificationId/read')
  async markAsRead(@Param('notificationId') notificationId: string) {
    return this.notificationServiceClient
      .send({ cmd: 'markAsRead' }, { notificationId })
      .toPromise();
  }
}
