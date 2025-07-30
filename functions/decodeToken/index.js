const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

const serviceAccountBase64 = functions.config().serviceaccount.adminkey;
const serviceAccountString = Buffer.from(serviceAccountBase64, 'base64').toString('utf8');
const serviceAccount = JSON.parse(serviceAccountString);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.decodeToken = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const token = req.body.token;
      const decodedToken = await admin.auth().verifyIdToken(token);
      console.log(decodedToken)
      const adminUsersCollection = admin.firestore().collection('adminUsers');
      const adminUsersSnapshot = await adminUsersCollection.where('email', '==', decodedToken?.email).get();

      if (!adminUsersSnapshot.empty) {
        res.status(200).json({ flag: true });
      } else {
        res.status(200).json({ flag: false });
      }
    } catch (error) {
      console.error('Error Decoding token / Retrieving collection data:', error);
      res.status(401).json({ error: 'Verification Failed' });
    }
  });
});

