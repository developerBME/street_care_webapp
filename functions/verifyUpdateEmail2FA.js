const functions = require('firebase-functions');
const admin = require('firebase-admin');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { Timestamp } = require('@firebase/firestore');
const cors = require('cors')({ origin: true });
admin.initializeApp();
const db = admin.firestore();

const CLIENT_ID = '223295299587-dinnroh9j2lb858kphbgb96f8t6j0eq2.apps.googleusercontent.com';
const CLIENT_SECRET = 'anpX22WnN_boI0nx64wDSGZX';
const REFRESH_TOKEN = '1//04kWwsPXOMdiLCgYIARAAGAQSNwF-L9IruatCfWHDiw533kOifxANJks2lV251MEidsfQmcI0eIZmQO9H27ha06dCP12PyBVrSl0';
const EMAIL = 'developer@brightmindenrichment.org';
const SECRET_KEY = '48610ca52d0c1fee946020018d7c6f7dab31d391a59fb69e747189c22e6dd9bf';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  'http://localhost'
);

oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN
});

exports.verifyUpdateEmail2FACode = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const { userEmail, uid, timestamp, code } = req.body;

    if (!userEmail || !uid || !timestamp || !code) {
      res.status(400).send('All parameters are required');
      return;
    }

    try {
      const currentWindowStart = getTimeWindow(timestamp);
      const currentWindowEnd = currentWindowStart + (5 * 60 * 1000);
      const previousWindowStart = currentWindowStart - (5 * 60 * 1000);

      let isValid = false;

      for (t = previousWindowStart; t <= currentWindowEnd; t += (1 * 60 * 1000)) {
        const hashedCode = crypto.createHmac('sha256', SECRET_KEY).update(`${userEmail}:${uid}:${t}`).digest('hex');

        const hashBigInt = BigInt('0x' + hashedCode)
        const sixDigitCode = hashBigInt % 1000000n;
        const sixDigitCodeStr = sixDigitCode.toString().padStart(6,'0');

        if (sixDigitCodeStr === code) {
          isValid = true;
          break;
        }
      }

      if (isValid) {
        res.status(200).send('Code is valid');
      } else {
        res.status(400).send('Invalid code');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      res.status(500).send('Error verifying code');
    }
  });
});

function getTimeWindow(timestamp) {
  return Math.floor(timestamp / (5 * 60 * 1000)) * (5 * 60 * 1000);
}