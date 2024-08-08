/** PLEASE READ BELOW BEFORE YOU RUN THIS SCRIPT
 * This script provides an interactive way for the user to convert the createdAt field
 * from a string to a Firestore Timestamp in the pastOutreachEventsTest collection in Firebase Firestore.
 * 
 * The collection name can be changed in line 30.
 *
 * How to Use the Script:
 *
 * 1. Install Required Packages:
 *    - Install Firebase Admin SDK:
 *      npm install firebase-admin
 *
 * 2. Run the Script:
 *    - Execute the script using Node.js:
 *      node convertCreatedAtToTimestamp.js
 */

const admin = require('firebase-admin');
const path = require('path');

const serviceAccountPath = path.join(__dirname, 'streetcare-d0f33-firebase-adminsdk-idx6g-a496bb699e.json');
admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
  databaseURL: "https://streetcare-d0f33.firebaseio.com"
});

const db = admin.firestore();

async function convertCreatedAtToTimestamp() {
  const collectionName = 'pastOutreachEventsTest';

  try {
    const snapshot = await db.collection(collectionName).get();

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
        // Create a new object with only the updated createdAt field
        const updatedData = { createdAt: admin.firestore.Timestamp.fromDate(new Date(docData.createdAt)) };
        const docRef = db.collection(collectionName).doc(docId);
        batch.update(docRef, updatedData);
      }
    });

    await batch.commit();
    console.log('Documents updated with createdAt field converted to Timestamp successfully.');
  } catch (error) {
    console.error('Error converting createdAt field to Timestamp:', error);
  }
}

convertCreatedAtToTimestamp().catch(console.error);
