const functions = require('firebase-functions');
const admin = require('firebase-admin');
const crypto = require('crypto');
//const nodemailer = require('nodemailer');
const { google } = require('googleapis');
//const { Timestamp } = require('@firebase/firestore');
const cors = require('cors')({ origin: true });
admin.initializeApp();
const db = admin.firestore();

const CLIENT_ID = '223295299587-dinnroh9j2lb858kphbgb96f8t6j0eq2.apps.googleusercontent.com';
const CLIENT_SECRET = 'anpX22WnN_boI0nx64wDSGZX';
const REFRESH_TOKEN = '1//04BYTM-CI6Zg0CgYIARAAGAQSNwF-L9Irp-YSFyOeZO_92NxuPBtL57hlqtzdYbWcPFDLYw0N8vW1CY8vS1iVRz2k7I1F-PVVemc';
//const EMAIL = 'developer@brightmindenrichment.org';
const SECRET_KEY = '48610ca52d0c1fee946020018d7c6f7dab31d391a59fb69e747189c22e6dd9bf';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  'http://localhost'
);

oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN
});

//using google library via oauth sending email
const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

exports.send2FACodeForEmailUpdate = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const { userEmail, uid, timestamp } = req.body; 
    if (!userEmail || !uid || !timestamp) {
      res.status(400).send('All fields are required!');
      return;
    }

    try {
      currentTimestampWindow = Math.floor(timestamp / (5 * 60 * 1000)) * (5 * 60 * 1000);//start of the minute
      const hashedCode = crypto.createHmac('sha256', SECRET_KEY).update(`${userEmail}:${uid}:${currentTimestampWindow}`).digest('hex');
      console.log(currentTimestampWindow)
      console.log('hashed code'+ hashedCode)

      const hashBigInt = BigInt('0x' + hashedCode);
      const sixDigitCode = hashBigInt % 1000000n;
      const sixDigitCodeStr = sixDigitCode.toString().padStart(6,'0');
      console.log('code'+ sixDigitCodeStr)

      const rawMessage = Buffer.from(
        `To: ${userEmail}\n` +
        `Subject: 2FA Code for Email Update\n` +
        'MIME-Version: 1.0\n' +
        'Content-Type: text/html; charset=UTF-8\n\n' +
        `Your 2FA code for ${userEmail} is: ${sixDigitCodeStr}` // Insert the HTML content dynamically
      )
      .toString('base64')  // Encode the message in base64
      .replace(/\+/g, '-') // URL-safe replacements
      .replace(/\//g, '_') // URL-safe replacements
      .replace(/=+$/, ''); // Remove padding

      await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: rawMessage,
        },
      });
      console.log('Email sent successfully using Gmail API');      
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('Failed to send email:', error);
      // Optionally, log specific properties of the error object
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      console.error('Error code:', error.code);
      res.status(500).send('Failed to send email');
    }
  });
});
