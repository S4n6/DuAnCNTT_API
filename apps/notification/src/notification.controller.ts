import { Controller, Post, Get, Param, Body, Patch } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResponse } from './notification.response';
import { NotificationRequestSend } from './notification.request';

@Controller('/api/notifications/')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async createNotification(
    @Body('userId') userId: string,
    @Body('message') message: string,
  ): Promise<NotificationResponse> {
    return this.notificationService.createNotification(userId, message);
  }

  @Get()
  async getAllNotifications(): Promise<NotificationResponse> {
    return this.notificationService.getAllNotifications();
  }

  @Get(':userId')
  async getUserNotifications(
    @Param('userId') userId: string,
  ): Promise<NotificationResponse> {
    return this.notificationService.getUserNotifications(userId);
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

  @Patch(':notificationId/read')
  async markAsRead(
    @Param('notificationId') notificationId: string,
  ): Promise<NotificationResponse> {
    return this.notificationService.markAsRead(notificationId);
  }
}
