import { Injectable } from '@nestjs/common';
import admin, { firestore } from './firebaseAdmin.config';
import { NotificationResponse } from './notification.response';
import {
  NotificationRequestCreate,
  NotificationRequestSend,
} from './notification.request';
import { NotificationDto } from './notification.dto';
import { title } from 'process';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { messaging } from 'firebase-admin';

@Injectable()
export class NotificationService {
  private notificationCollection = firestore.collection('notifications');

  constructor(private readonly httpService: HttpService) {}

  async createNotification(
    notification: NotificationRequestCreate,
  ): Promise<NotificationResponse> {
    try {
      const docRef = await this.notificationCollection.add(notification);
      return {
        success: true,
        message: 'Create notification successfully',
        data: { id: docRef.id, ...notification },
      };
    } catch (error) {
      return { success: false, message: error.message, data: null };
    }
  }

  async getAllNotifications(): Promise<NotificationResponse> {
    const snapshot = await this.notificationCollection.get();
    if (snapshot.empty) {
      return {
        success: false,
        message: 'No notifications found',
        data: [],
      };
    }

    const notifications = [];
    snapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() });
    });

    return {
      success: true,
      message: 'Get all notifications successfully',
      data: notifications,
    };
  }

  async getUserNotifications(userId: string): Promise<NotificationResponse> {
    const snapshot = await this.notificationCollection
      .where('userId', '==', userId)
      .get();
    if (snapshot.empty) {
      return {
        success: false,
        message: 'No notifications found',
        data: [],
      };
    }

    const notifications = [];
    snapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() });
    });

    return new NotificationResponse(
      true,
      'Get user notifications successfully',
      notifications,
    );
  }

  async sendNotificationToTokenDevice(
    userId: string,
    message: NotificationRequestSend,
  ): Promise<NotificationResponse> {
    try {
      const userResponse = await lastValueFrom(
        this.httpService.get(`http://localhost:3001/api/users/${userId}`),
      );
      const user = userResponse.data;
      const token = user?.deviceToken;

      if (!token) {
        return new NotificationResponse(false, 'Device token not found', null);
      }

      const payload = {
        notification: {
          title: message.notification.title,
          body: message.notification.message,
        },
        token,
      };

      await admin.messaging().send(payload);
      return new NotificationResponse(
        true,
        'Notification sent successfully',
        message.notification,
      );
    } catch (error) {
      return new NotificationResponse(false, error.message, null);
    }
  }

  async sendNotificationToTopic(
    topic: string,
    notification: NotificationRequestSend,
  ): Promise<NotificationResponse> {
    try {
      await admin.messaging().send({
        notification: {
          title: notification.notification.title,
          body: notification.notification.message,
        },
        topic,
      });
      return new NotificationResponse(
        true,
        'Notification sent successfully',
        notification.notification,
      );
    } catch (error) {
      return new NotificationResponse(false, error.message, null);
    }
  }

  async markAsRead(notificationId: string): Promise<NotificationResponse> {
    try {
      const docRef = this.notificationCollection.doc(notificationId);
      await docRef.update({ read: true });
      const updatedDoc = await docRef.get();
      return new NotificationResponse(true, 'Mark as read successfully', {
        id: updatedDoc.id,
        ...(updatedDoc.data() as NotificationDto),
      });
    } catch (error) {
      return new NotificationResponse(false, error.message, null);
    }
  }
}
