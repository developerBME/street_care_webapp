const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const serviceAccount = require("./streetcare-d0f33-firebase-adminsdk-idx6g-e46500ba2b.json");

// Initialize the app if it hasn't been initialized already
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
console.log("test");

const db = admin.firestore();

async function getEmailsFromFirestore(collectionName) {
  /**
   * Retrieves all email IDs from the specified Firestore collection.
   *
   * @param {string} collectionName The name of the Firestore collection.
   */
  try {
    const emails = [];
    const snapshot = await db.collection(collectionName).get();
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.email) {
        emails.push(data.email);
      }
    });
    return emails;
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
}

async function sendEmail(recipients) {
  /**
   * Sends an email to the specified recipients.
   *
   * @param {Array} recipients A list of email addresses.
   */
  const senderEmail = "<EMAIL>"; // Update with your sender email address
  const senderPassword = "<Password>"; // Update with your sender email password
  const subject = "Backend Support";
  const body = "Hello, This is the Backend Team.";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
  });

  for (const recipient of recipients) {
    const mailOptions = {
      from: senderEmail,
      to: recipient,
      subject: subject,
      text: body,
    };

    try {
      console.log(`Trying to login to SMTP server...`);
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${recipient}`);
    } catch (error) {
      console.error(`Failed to send email to ${recipient}: ${error}`);
    }
  }
}

async function scheduleEmails() {
  /**
   * Retrieves emails from Firestore and sends them.
   */
  const collectionName = "kp1234"; // Update with your Firestore collection name
  const recipients = await getEmailsFromFirestore(collectionName);
  if (recipients.length > 0) {
    await sendEmail(recipients);
  }
}

// Uncomment the below line for testing purposes (sends emails every 5 seconds)
schedule.scheduleJob("*/5 * * * * *", scheduleEmails);

// Schedule the email to be sent every Monday at 9:00 AM
// schedule.scheduleJob('0 9 * * 1', scheduleEmails);

// Keep the script running to execute scheduled tasks
const keepAlive = () => {
  setInterval(() => {}, 1 << 30); // Keep the process alive
};

keepAlive();
