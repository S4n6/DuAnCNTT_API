import * as admin from 'firebase-admin';
import * as serviceAccount from './firebase-service-account.json';
import { firebaseConfig } from './constants';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: firebaseConfig.databaseURL,
});

const firestore = admin.firestore();
const messaging = admin.messaging();
export { firestore, messaging };

export default admin;
