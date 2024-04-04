const functions = require('firebase-functions');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');
admin.initializeApp();

const CLIENT_ID = '223295299587-dinnroh9j2lb858kphbgb96f8t6j0eq2.apps.googleusercontent.com';
const CLIENT_SECRET = 'anpX22WnN_boI0nx64wDSGZX';
const REFRESH_TOKEN = '1//048nBjC6R9Z1lCgYIARAAGAQSNwF-L9IrNkd1YuirnquWSrC_Rk3Q71QWAjOSYPTw0gdFzrUkGk3fEnKPd7YFf-_n38cKCF4kV9M';
const EMAIL = 'developer@brightmindenrichment.org';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  'http://localhost'
);

oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN
});

exports.sendConfirmationLinkEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const { newUserEmail, oldUserEmail, htmlEmailBody } = req.body;

    // const confirmationLink = ""; // call cloud function to generate the confirmation link
    try {
      const response = await axios.post('https://us-central1-streetcare-d0f33.cloudfunctions.net/generateConfirmationLink', {
        newEmail: newUserEmail,
        oldEmail: oldUserEmail
      });

      const confirmationLink = response.data;

      const updatedHtmlEmailBody = htmlEmailBody + confirmationLink;

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
        to: oldUserEmail,
        subject: `Bright Mind Enrichment: Confirm your updated email id`,
        html: updatedHtmlEmailBody
      };

      await transporter.sendMail(mailOptions);
      res.send('Email sent successfully');
    } catch (error) {
      console.error('Failed to send email:', error);
      res.status(500).send('Failed to send email');
    }
  });
});

exports.generateConfirmationLink = functions.https.onRequest(async (req, res) => {
  cors()(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }
    const { newEmail, oldEmail } = req.body;

    try {
      const token = generateToken();

      await admin.firestore().collection('confirmationLinks').add({
        newEmail,
        oldEmail,
        token,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

      const confirmationLink = `http://localhost:3000/updateEmail?newEmailId=${newEmail}&token=${token}`;

      res.status(200).send(confirmationLink);
    } catch (error) {
      console.error('Failed to generate confirmation link:', error);
      res.status(500).send('Failed to generate confirmation link');
    }
  });
});

function generateToken() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const tokenLength = 16;
  let token = '';
  for (let i = 0; i < tokenLength; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}
