const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccountBase64 = functions.config().serviceaccount.adminkey;
const serviceAccountString = Buffer.from(serviceAccountBase64, 'base64').toString('utf8');
const serviceAccount = JSON.parse(serviceAccountString);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://streetcare-d0f33.firebaseio.com"
  });
}

exports.delUserActivity = functions.firestore
  .document('users/{uid}')
  .onDelete(async (snap, context) => {
    const userId = context.params.uid;
    console.log(`User ID: ${userId} deleted`);

    // Delete outreach documents
    const outreachesRef = admin.firestore().collection('outreachEventsDev');
    const outreachQuery = outreachesRef.where('uid', '==', userId);

    // Delete visit logs
    const visitLogsRef = admin.firestore().collection('visitLogWebProd');
    const visitLogsQuery = visitLogsRef.where('uid', '==', userId);

    // Delete helpRequest documents
    const helpRequestRef = admin.firestore().collection('helpRequests');
    const helpRequestQuery = helpRequestRef.where('uid', '==', userId);

    // Remove user ID from participants array in outreach events
    const participantsQuery = outreachesRef.where('participants', 'array-contains', userId);
    try {
      // Delete outreach documents
      const outreachesSnapshot = await outreachQuery.get();
      if (outreachesSnapshot.empty) {
      } else {
        const outreachBatch = admin.firestore().batch();
        outreachesSnapshot.forEach(doc => {
          outreachBatch.delete(doc.ref);
        });
        await outreachBatch.commit();
      }

      // Delete visit logs
      const visitLogsSnapshot = await visitLogsQuery.get();
      if (visitLogsSnapshot.empty) {
      } else {
        const visitLogsBatch = admin.firestore().batch();
        visitLogsSnapshot.forEach(doc => {
          visitLogsBatch.delete(doc.ref);
        });
        await visitLogsBatch.commit();
      }

      // Delete helpRequest documents
      const helpRequestSnapshot = await helpRequestQuery.get();
      if (helpRequestSnapshot.empty) {
      } else {
        const helpRequestBatch = admin.firestore().batch();
        helpRequestSnapshot.forEach(doc => {
          helpRequestBatch.delete(doc.ref);
        });
        await helpRequestBatch.commit();
      }

      // Remove user ID from participants array in outreach events
      const participantsSnapshot = await participantsQuery.get();
      if (participantsSnapshot.empty) {
        console.log(`No participants documents found for user ID: ${userId}`);
      } else {
        const participantsBatch = admin.firestore().batch();
        participantsSnapshot.forEach(doc => {
          participantsBatch.update(doc.ref, {
            participants: admin.firestore.FieldValue.arrayRemove(userId)
          });
        });
        await participantsBatch.commit();
      }
    } catch (error) {
      console.error(`Error deleting documents for user ID: ${userId}`, error);
    }
  });