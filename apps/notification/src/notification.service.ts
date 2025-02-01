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
      const notificationCreate: NotificationDto = {
        id: '',
        title: notification.title,
        message: notification.message,
        userId: notification.userId,
        createdAt: new Date(),
        isRead: false,
      };
      const docRef = await this.notificationCollection.add(notificationCreate);
      return {
        success: true,
        message: 'Create notification successfully',
        data: {
          notifications: {
            id: docRef.id,
            ...notification,
            createdAt: notificationCreate.createdAt,
          },
          total: 1,
          page: 1,
        },
      };
    } catch (error) {
      return { success: false, message: error.message, data: null };
    }
  }

  async getAllNotifications(
    page: number,
    limit: number,
  ): Promise<NotificationResponse> {
    const offset = (page - 1) * limit;
    const snapshot = await this.notificationCollection
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit)
      .get();

    if (snapshot.empty) {
      return {
        success: false,
        message: 'No notifications found',
        data: {
          notifications: [],
          total: 0,
          page,
        },
      };
    }

    const notifications = [];
    snapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() });
    });

    const totalSnapshot = await this.notificationCollection.get();
    const total = totalSnapshot.size;

    return {
      success: true,
      message: 'Get all notifications successfully',
      data: {
        notifications,
        total,
        page,
      },
    };
  }

  async getUserNotifications(
    userId: string,
    page: number,
    limit: number,
  ): Promise<NotificationResponse> {
    const offset = (page - 1) * limit;

    const snapshot = await this.notificationCollection
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit)
      .get();

    if (snapshot.empty) {
      return {
        success: false,
        message: 'No notifications found',
        data: {
          notifications: [],
          total: 0,
          page,
        },
      };
    }

    const notifications = [];
    snapshot.forEach((doc) => {
      notifications.push({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
      });
    });

    const totalSnapshot = await this.notificationCollection
      .where('userId', '==', userId)
      .get();
    const total = totalSnapshot.size;

    return {
      success: true,
      message: 'Get user notifications successfully',
      data: {
        notifications,
        total,
        page,
      },
    };
  }

  async getUnreadNotificationsNumber(userId: string): Promise<object> {
    const snapshot = await this.notificationCollection
      .where('userId', '==', userId)
      .where('isRead', '==', false)
      .get();

    return {
      success: true,
      message: 'Get unread notifications number successfully',
      data: {
        unreadNumber: snapshot.size,
      },
    };
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
      return new NotificationResponse(true, 'Notification sent successfully', {
        notifications: message.notification,
        total: 1,
        page: 1,
      });
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
      return new NotificationResponse(true, 'Notification sent successfully', {
        notifications: notification.notification,
        total: 1,
        page: 1,
      });
    } catch (error) {
      return new NotificationResponse(false, error.message, null);
    }
  }

  async markAsRead(notificationId: string): Promise<NotificationResponse> {
    try {
      const docRef = this.notificationCollection.doc(notificationId);
      await docRef.update({ isRead: true });
      const updatedDoc = await docRef.get();
      return new NotificationResponse(true, 'Mark as read successfully', {
        notifications: [
          { id: updatedDoc.id, ...(updatedDoc.data() as NotificationDto) },
        ],
        total: 1,
        page: 1,
      });
    } catch (error) {
      return new NotificationResponse(false, error.message, null);
    }
  }
}
