const functions = require('firebase-functions');
//const admin = require('firebase-admin');
const crypto = require('crypto');
//const nodemailer = require('nodemailer');
const { google } = require('googleapis');
//const { Timestamp } = require('@firebase/firestore');
const cors = require('cors')({ origin: true });

//const db = admin.firestore();

const CLIENT_ID = '223295299587-dinnroh9j2lb858kphbgb96f8t6j0eq2.apps.googleusercontent.com';
const CLIENT_SECRET = 'anpX22WnN_boI0nx64wDSGZX';
const REFRESH_TOKEN = '1//04BYTM-CI6Zg0CgYIARAAGAQSNwF-L9Irp-YSFyOeZO_92NxuPBtL57hlqtzdYbWcPFDLYw0N8vW1CY8vS1iVRz2k7I1F-PVVemc'
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

const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

exports.send2FACode = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const { userEmail, UID, timestamp } = req.body; 

    // Validate userEmail parameter
    if (!userEmail || !UID || !timestamp) {
      res.status(400).send('All parameters are required');
      return;
    }

    try {
      const hashedCode = crypto.createHmac('sha256', SECRET_KEY)
                             .update(`${userEmail}:${UID}:${timestamp}`)
                             .digest('hex');

      const hashBigInt = BigInt('0x' + hashedCode);
      const sixDigitCode = hashBigInt % 1000000n;
      const sixDigitCodeStr = sixDigitCode.toString().padStart(6,'0');

      // const accessToken = await oAuth2Client.getAccessToken();

      // const transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     type: 'OAuth2',
      //     user: EMAIL,
      //     clientId: CLIENT_ID,
      //     clientSecret: CLIENT_SECRET,
      //     refreshToken: REFRESH_TOKEN,
      //     accessToken: accessToken.token,
      //   }
      // });

      // const mailOptions = {
      //   from: EMAIL,
      //   to: userEmail,
      //   subject: `2FA Code`,
      //   text:  `Your 2FA code is: ${sixDigitCodeStr}`
      // };

      // await transporter.sendMail(mailOptions);
      // res.send('Email sent successfully');

      const rawMessage = Buffer.from(
          `To: ${userEmail}\n` +
          `Subject: 2FA Code\n` +
          'MIME-Version: 1.0\n' +
          'Content-Type: text/html; charset=UTF-8\n\n' +
          `Your 2FA Code is: ${sixDigitCodeStr}`
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
      res.send('Email sent successfully');

    } catch (error) {
      console.error('Failed to send email:', error);
      res.status(500).send('Failed to send email');
    }
  });
});


// exports.verify2FACode = functions.https.onRequest((req, res) => {
//   cors(req, res, async () => {
//     if (req.method !== 'POST') {
//       res.status(405).send('Method Not Allowed');
//       return;
//     }

//     const { userEmail, UID, timestamp, code } = req.body;

//     // Validate userEmail and code parameters
//     if (!userEmail || !UID || !timestamp || !code) {
//       res.status(400).send('All parameters are required');
//       return;
//     }

//     try {
//       const currentWindowStart = getTimeWindow(timestamp); // get start time of current time window
//       const currentWindowEnd = currentWindowStart + (5 * 60 * 1000); // Calculating the end time of current time window
//       const previousWindowStart = currentWindowStart - (5 * 60 * 1000); // Calculate the start time of the previous time window

//       let isValid = false;

//       // Iterate through the current and previous time windows to check for valid codes
//       for (t = previousWindowStart; t <= currentWindowEnd; t += (1 * 60 * 1000)) {
//         const hashedCode = crypto.createHmac('sha256', SECRET_KEY)
//                                .update(`${userEmail}:${UID}:${t}`)
//                                .digest('hex');

//         const hashBigInt = BigInt('0x' + hashedCode)
//         const sixDigitCode = hashBigInt % 1000000n;
//         const sixDigitCodeStr = sixDigitCode.toString().padStart(6,'0');

//         if (sixDigitCodeStr === code) {
//           isValid = true;
//           break;
//         }
//       }

//       if (isValid) {
//         // Code is valid within the time window
//         res.send('Code is valid');
//       } else {
//         res.status(400).send('Invalid code');
//       }
//     } catch (error) {
//       console.error('Error verifying code:', error);
//       res.status(500).send('Error verifying code');
//     }
//   });
// });