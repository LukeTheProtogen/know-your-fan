import admin from 'firebase-admin';
import * as serviceAccount from '../../firebase-service-account.json'; // caminho do seu JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

export const db = admin.firestore();
