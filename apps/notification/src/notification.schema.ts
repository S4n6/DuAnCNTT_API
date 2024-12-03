import * as admin from 'firebase-admin';


admin.initializeApp();

const db = admin.firestore();

interface Notification {
    id: string;
    title: string;
    message: string;
    userId: string;
    timestamp: admin.firestore.Timestamp;
    read: boolean;
}

const notificationSchema = {
    id: 'string',
    title: 'string',
    message: 'string',
    userId: 'string',
    timestamp: 'Timestamp',
    read: 'boolean'
};

const notificationsCollection = db.collection('notifications');

export { Notification, notificationSchema, notificationsCollection };