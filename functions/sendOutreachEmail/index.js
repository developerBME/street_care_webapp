const functions = require('firebase-functions');
const { google } = require('googleapis');
//const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

const CLIENT_ID = '223295299587-dinnroh9j2lb858kphbgb96f8t6j0eq2.apps.googleusercontent.com';
const CLIENT_SECRET = 'anpX22WnN_boI0nx64wDSGZX';
const REFRESH_TOKEN = '1//04BYTM-CI6Zg0CgYIARAAGAQSNwF-L9Irp-YSFyOeZO_92NxuPBtL57hlqtzdYbWcPFDLYw0N8vW1CY8vS1iVRz2k7I1F-PVVemc';
//const EMAIL = 'developer@brightmindenrichment.org';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  'http://localhost'
);

oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN
});

const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

exports.sendOutreachEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const { userEmail, userName, eventName, htmlEmailBody } = req.body;

    try {
        const rawMessage = Buffer.from(
            `To: ${userEmail}\n` +
            `Subject: ${userName}: Invitation Details for ${eventName}\n` +
            'MIME-Version: 1.0\n' +
            'Content-Type: text/html; charset=UTF-8\n\n' +
             htmlEmailBody  // Insert the HTML content dynamically
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

// Using Nodeemailer 
// exports.sendOutreachEmail = functions.https.onRequest((req, res) => {
//   cors(req, res, async () => {
//     if (req.method !== 'POST') {
//       res.status(405).send('Method Not Allowed');
//       return;
//     }

//     const { userEmail, userName, eventName, htmlEmailBody } = req.body;

//     try {
//       const accessToken = await oAuth2Client.getAccessToken();

//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           type: 'OAuth2',
//           user: EMAIL,
//           clientId: CLIENT_ID,
//           clientSecret: CLIENT_SECRET,
//           refreshToken: REFRESH_TOKEN,
//           accessToken: accessToken.token,
//         }
//       });

//     //   const transporter = nodemailer.createTransport({
//     //     host: 'smtp.gmail.com', // SMTP server (e.g., smtp.gmail.com for Gmail)
//     //     port: 587,                // Port (587 for TLS or 465 for SSL)
//     //     secure: false,            // Use true for port 465, false for other ports
//     //     auth: {
//     //       user: EMAIL,   // Your email address
//     //       pass: 'test'       // Your email password
//     //     }
//     //   });

//       const mailOptions = {
//         from: EMAIL,
//         to: userEmail,
//         subject: `${userName} : Invitation details for ${eventName}`,
//         html: htmlEmailBody // HTML content of the email
//       };

//       await transporter.sendMail(mailOptions);
//       res.send('Email sent successfully');
//     } catch (error) {
//       console.error('Failed to send email:', error);
//       res.status(500).send('Failed to send email');
//     }
//   });
// });

//const { deleteUserOutreaches } = require('./delUserOutreaches');
//exports.deleteUserOutreaches = deleteUserOutreaches;
