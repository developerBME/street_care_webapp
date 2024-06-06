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


exports.deleteUserOutreaches = functions.firestore
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
    } catch (error) {
      console.error(`Error deleting documents for user ID: ${userId}`, error);
    }
  });