const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
//const serviceAccount = require("D:\\BME\\streetcare-d0f33-firebase-adminsdk-idx6g-a496bb699e.json");
// Initialize Firebase
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// Decoding the base64-encoded service account key from environment variable
const serviceAccountBase64 = functions.config().serviceaccount.adminkey;
const serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, 'base64').toString('utf8'));
console.log(serviceAccount)
// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.customUpdateUserEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }

    const { newEmail, uid } = req.body;

    if (!uid || !newEmail) {
      return res.status(400).send('Missing parameters');
    }

    try {
      await admin.auth().updateUser(uid, { email: newEmail });
      return res.status(200).send({ message: 'Email updated successfully without verification.' });
    } catch (error) {
      console.error('Error updating email:', error);
      return res.status(500).send('Unable to update email');
    }
  });
});

// exports.customUpdateUserEmail = functions.https.onCall(async (data, context) => {
//   // checking the user is authenticated
//   console.log(data)
//   console.log(context)

//   if (!context.auth) {
//     throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
//   }
//   const uid = context.auth.uid;
//   const newEmail = data.newEmail;

//   try {
//     // Update the user's email without a verification email
//     await admin.auth().updateUser(uid, { email: newEmail });

//     return { message: 'Email updated successfully without verification.' };
//   } catch (error) {
//     console.error('Error updating email:', error);
//     throw new functions.https.HttpsError('internal', 'Unable to update email');
//   }
// });

