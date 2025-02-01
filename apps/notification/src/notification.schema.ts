import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

interface Notification {
  id: string;
  title: string;
  message: string;
  userId: string;
  isRead: boolean;
  createdAt: Date;
}

const notificationSchema = {
  id: 'string',
  title: 'string',
  message: 'string',
  userId: 'string',
  isRead: 'boolean',
  createdAt: 'Date',
};

const notificationsCollection = db.collection('notifications');

export { Notification, notificationSchema, notificationsCollection };
