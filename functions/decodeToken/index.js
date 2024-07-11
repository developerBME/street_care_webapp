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
      //Hardcoded email for testing purpose
      if(decodedToken?.email === 'laxmi@brightmindenrichment.org') {
        res.status(200).json({ flag: true });
      } else {
        res.status(200).json({ flag: false });
      }
    } catch (error) {
      console.error('Error verifying / Decoding token:', error);
      res.status(401).json({ error: 'Verification Failed' });
    }
  });
});

