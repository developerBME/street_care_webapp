/** PLEASE READ BELOW BEFORE YOU RUN THIS SCRIPT
 * This script provides an interactive way for the user to convert the createdAt field
 * from a string to a Firestore Timestamp in the outreachEvents collection in Firebase Firestore.
 *
 * How to Use the Script:
 *
 * 1. Install Required Packages:
 *    - Install Firebase Admin SDK and prompt-sync:
 *      npm install firebase-admin prompt-sync
 *
 * 2. Run the Script:
 *    - Execute the script using Node.js:
 *      node convertCreatedAtToTimestamp.js
 */

const admin = require('firebase-admin');
const path = require('path');
const prompt = require('prompt-sync')({ sigint: true });
const serviceAccountPath = path.join(__dirname, 'streetcare-d0f33-firebase-adminsdk-idx6g-a496bb699e.json');
admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
  databaseURL: "https://streetcare-d0f33.firebaseio.com"
});

const db = admin.firestore();

async function convertCreatedAtToTimestamp() {
  const sourceCollection = 'outreachEvents';
  const destinationCollection = 'pastOutreachEventsTest';

  try {
    const snapshot = await db.collection(sourceCollection).get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    const batch = db.batch();
    snapshot.forEach(doc => {
      const docData = doc.data();
      const docId = doc.id;

      // Check if createdAt is a string and convert it to Timestamp
      if (typeof docData.createdAt === 'string') {
        docData.createdAt = admin.firestore.Timestamp.fromDate(new Date(docData.createdAt));
      }

      const newDocRef = db.collection(destinationCollection).doc(docId);
      batch.set(newDocRef, docData);
    });

    await batch.commit();
    console.log('Documents duplicated with createdAt field converted to Timestamp successfully.');
  } catch (error) {
    console.error('Error converting createdAt field to Timestamp and duplicating documents:', error);
  }
}

convertCreatedAtToTimestamp().catch(console.error);