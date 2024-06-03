const functions = require('firebase-functions');
const admin = require('firebase-admin');
if (!admin.apps.length) {
  admin.initializeApp();
}

exports.deleteUserOutreaches = functions.firestore
  .document('users/{uid}')
  .onDelete(async (snap, context) => {
    const userId = context.params.uid;
    console.log(`User ID: ${userId} deleted`);
    const outreachesRef = admin.firestore().collection('outreachEvents');
    const query = outreachesRef.where('uid', '==', userId);
    try {
      const outreachesSnapshot = await query.get();
      if (outreachesSnapshot.empty) {
        console.log(`No outreach documents found for user ID: ${userId}`);
        return null;
      }
      const batch = admin.firestore().batch();
      outreachesSnapshot.forEach(doc => {
        console.log(`Deleting outreach document ID: ${doc.id}`);
        batch.delete(doc.ref);
      });
      await batch.commit();
      console.log(`Deleted outreach documents for user ID: ${userId}`);
    } catch (error) {
      console.error(`Error deleting outreach documents for user ID: ${userId}`, error);
    }
  });
