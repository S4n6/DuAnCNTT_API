import {
  Controller,
  Body,
  Param,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { NotificationResponse } from './notification.response';
import {
  NotificationRequestCreate,
  NotificationRequestSend,
} from './notification.request';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern({ cmd: 'createNotification' })
  async createNotification(
    notification: NotificationRequestCreate,
  ): Promise<NotificationResponse> {
    return this.notificationService.createNotification(notification);
  }

  @MessagePattern({ cmd: 'getAllNotifications' })
  async getAllNotifications(
    data: { page: number, limit: number },
  ): Promise<NotificationResponse> {
    const { page, limit } = data;
    return this.notificationService.getAllNotifications(page, limit);
  }

  @MessagePattern({ cmd: 'getUnreadNotificationsNumber' })
  async getUnreadNotificationsNumber(
    userId: string,
  ): Promise<object> {
    return this.notificationService.getUnreadNotificationsNumber(userId);
  }

  @MessagePattern({ cmd: 'getUserNotifications' })
  async getUserNotifications(
    data: { userId: string, page: number, limit: number },
  ): Promise<NotificationResponse> {
    const { userId, page, limit } = data;
    return this.notificationService.getUserNotifications(userId, page, limit);
  }

  @MessagePattern({ cmd: 'sendNotificationToUser' })
  async sendNotificationToUser(
    data: { userId: string, message: NotificationRequestSend },
  ): Promise<NotificationResponse> {
    const { userId, message } = data;
    return this.notificationService.sendNotificationToTokenDevice(userId, message);
  }

  @MessagePattern({ cmd: 'markAsRead' })
  async markAsRead(
    notificationId: string,
  ): Promise<NotificationResponse> {
    return this.notificationService.markAsRead(notificationId);
  }
}
