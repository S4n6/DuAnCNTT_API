import { Controller, Post, Get, Param, Body, Patch } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('/api/notifications/')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async createNotification(
    @Body('userId') userId: string,
    @Body('message') message: string,
  ): Promise<any> {
    return this.notificationService.createNotification(userId, message);
  }

  @Get()
  async getAllNotifications(): Promise<any> {
    return this.notificationService.getAllNotifications();
  }

  @Get(':userId')
  async getUserNotifications(
    @Param('userId') userId: string,
  ): Promise<any> {
    return this.notificationService.getUserNotifications(userId);
  }

  @Patch(':notificationId/read')
  async markAsRead(
    @Param('notificationId') notificationId: string,
  ): Promise<any> {
    return this.notificationService.markAsRead(notificationId);
  }
}
