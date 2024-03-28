const functions = require('firebase-functions');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

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

    const { userEmail } = req.body;

    const confirmationLink = ""; // call cloud function to generate the confirmation link
    
    // include confirmationLink in the htmlEmailBody
    const htmlEmailBody = `
    <p>Hello,</p>
    <p>Please confirm your email address change by clicking the link below:</p>
    <a href="${confirmationLink}">Confirm Email Change</a>
  `;
    
    try {
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
        subject: `Bright Mind Enrichment: Confirm your updated email id`,
        html: htmlEmailBody
      };

      await transporter.sendMail(mailOptions);
      res.send('Email sent successfully');
    } catch (error) {
      console.error('Failed to send email:', error);
      res.status(500).send('Failed to send email');
    }
  });
});
