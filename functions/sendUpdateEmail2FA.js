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
const REFRESH_TOKEN = '1//05YE9u8rnREb8CgYIARAAGAUSNwF-L9IrwsMC77bhiidRgu55AdOcSiduWfwRntL3VjOJ9eySlXf9siflZlYLlDs9W4hNpa2eFeA';
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


exports.sendUpdateEmail2FACode = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const { userEmail, timestamp } = req.body; 

    if (!userEmail || !timestamp) {
      res.status(400).send('All fields are required!');
      return;
    }

    try {
      const hashedCode = crypto.createHmac('sha256', SECRET_KEY).update(`${userEmail}:${timestamp}`).digest('hex');

      const hashBigInt = BigInt('0x' + hashedCode);
      const sixDigitCode = hashBigInt % 1000000n;
      const sixDigitCodeStr = sixDigitCode.toString().padStart(6,'0');

      const accessToken = await oAuth2Client.getAccessToken();

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: EMAIL,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken.token,
        }
      });

      const mailOptions = {
        from: EMAIL,
        to: userEmail,
        subject: `2FA Code for Email Update`,
        text:  `Your 2FA code for ${userEmail} is: ${sixDigitCodeStr}`
      };

      await transporter.sendMail(mailOptions);
      res.status(200).send('Email sent successfully');

    } catch (error) {
      console.error('Failed to send email:', error);
      res.status(500).send('Failed to send email');
    }
  });
});
