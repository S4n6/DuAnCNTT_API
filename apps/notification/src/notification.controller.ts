import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Query,
  Put,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResponse } from './notification.response';
import {
  NotificationRequestCreate,
  NotificationRequestSend,
} from './notification.request';

@Controller('/api/notifications/')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async createNotification(
    @Body() notification: NotificationRequestCreate,
  ): Promise<NotificationResponse> {
    return this.notificationService.createNotification(notification);
  }

  @Get()
  async getAllNotifications(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<NotificationResponse> {
    return this.notificationService.getAllNotifications(page, limit);
  }

  @Get('/unreadNumber/:userId')
  async getUnreadNotificationsNumber(
    @Param('userId') userId: string,
  ): Promise<object> {
    return this.notificationService.getUnreadNotificationsNumber(userId);
  }

  @Get(':userId')
  async getUserNotifications(
    @Param('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<NotificationResponse> {
    console.log('userId', userId);
    return this.notificationService.getUserNotifications(userId, page, limit);
  }

  @Post(':userId')
  async sendNotificationToUser(
    @Param('userId') userId: string,
    @Body('message') message: NotificationRequestSend,
  ): Promise<NotificationResponse> {
    return this.notificationService.sendNotificationToTokenDevice(
      userId,
      message,
    );
  }

  @Put(':notificationId/read')
  async markAsRead(
    @Param('notificationId') notificationId: string,
  ): Promise<NotificationResponse> {
    return this.notificationService.markAsRead(notificationId);
  }
}
