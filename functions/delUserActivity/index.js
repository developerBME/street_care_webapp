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
    const outreachesRef = admin.firestore().collection('outreachEvents');
    const outreachQuery = outreachesRef.where('uid', '==', userId);

    // Delete visit logs
    const visitLogsRef = admin.firestore().collection('personalVisitLog');
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
        console.log(`No outreach documents found for user ID: ${userId}`);
      } else {
        console.log(`Found ${outreachesSnapshot.size} outreach documents for user ID: ${userId}`);
        const outreachBatch = admin.firestore().batch();
        outreachesSnapshot.forEach(doc => {
          console.log(`Deleting outreach document ID: ${doc.id}`);
          outreachBatch.delete(doc.ref);
        });
        await outreachBatch.commit();
        console.log(`Deleted outreach documents for user ID: ${userId}`);
      }

      // Delete visit logs
      const visitLogsSnapshot = await visitLogsQuery.get();
      if (visitLogsSnapshot.empty) {
        console.log(`No visit logs found for user ID: ${userId}`);
      } else {
        console.log(`Found ${visitLogsSnapshot.size} visit logs for user ID: ${userId}`);
        const visitLogsBatch = admin.firestore().batch();
        visitLogsSnapshot.forEach(doc => {
          console.log(`Deleting visit log document ID: ${doc.id}`);
          visitLogsBatch.delete(doc.ref);
        });
        await visitLogsBatch.commit();
        console.log(`Deleted visit logs for user ID: ${userId}`);
      }

      // Delete helpRequest documents
      const helpRequestSnapshot = await helpRequestQuery.get();
      if (helpRequestSnapshot.empty) {
        console.log(`No helpRequest documents found for user ID: ${userId}`);
      } else {
        console.log(`Found ${helpRequestSnapshot.size} helpRequest documents for user ID: ${userId}`);
        const helpRequestBatch = admin.firestore().batch();
        helpRequestSnapshot.forEach(doc => {
          console.log(`Deleting helpRequest document ID: ${doc.id}`);
          helpRequestBatch.delete(doc.ref);
        });
        await helpRequestBatch.commit();
        console.log(`Deleted helpRequest documents for user ID: ${userId}`);
      }

      // Remove user ID from participants array in outreach events
      const participantsSnapshot = await participantsQuery.get();
      if (participantsSnapshot.empty) {
        console.log(`No participants documents found for user ID: ${userId}`);
      } else {
        console.log(`Found ${participantsSnapshot.size} participants documents for user ID: ${userId}`);
        const participantsBatch = admin.firestore().batch();
        participantsSnapshot.forEach(doc => {
          console.log(`Updating participants array in document ID: ${doc.id}`);
          participantsBatch.update(doc.ref, {
            participants: admin.firestore.FieldValue.arrayRemove(userId)
          });
        });
        await participantsBatch.commit();
        console.log(`Updated participants array for user ID: ${userId}`);
      }
    } catch (error) {
      console.error(`Error deleting documents for user ID: ${userId}`, error);
    }
  });