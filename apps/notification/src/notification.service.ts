import { Injectable } from '@nestjs/common';
import { firestore } from './firebaseAdmin.config';

@Injectable()
export class NotificationService {
  private notificationCollection = firestore.collection('notifications');

  async createNotification(userId: string, message: string): Promise<any> {
    const notification = {
      userId,
      message,
      read: false,
      createdAt: new Date(),
    };

    const docRef = await this.notificationCollection.add(notification);
    return { id: docRef.id, ...notification };
  }

  async getAllNotifications(): Promise<any[]> {
    const snapshot = await this.notificationCollection.get();
    if (snapshot.empty) {
      return [];
    }

    const notifications = [];
    snapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() });
    });

    return notifications;
  }

  async getUserNotifications(userId: string): Promise<any[]> {
    const snapshot = await this.notificationCollection
      .where('userId', '==', userId)
      .get();
    if (snapshot.empty) {
      return [];
    }

    const notifications = [];
    snapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() });
    });

    return notifications;
  }

  async markAsRead(notificationId: string): Promise<any> {
    const docRef = this.notificationCollection.doc(notificationId);
    await docRef.update({ read: true });
    const updatedDoc = await docRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
  }
}
