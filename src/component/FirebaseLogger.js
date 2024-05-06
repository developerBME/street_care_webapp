import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();

// Define your custom headers
const headers = {
  mode: "no-cors",
};

const logEvent = async (tag, message) => {
  try {
    const addLogEntry = httpsCallable(functions, "addLogEntry", { headers });
    await addLogEntry({ message: `[${tag}]: ${message}` });
    console.log("Event logged successfully");
  } catch (error) {
    console.error("Error logging event:", error);
  }
};

export default logEvent;

// const functions = require('@google-cloud/functions-framework');
// const cors = require('cors')({ origin: true }); // Adjust origin as needed

// functions.http('logMessage', (req, res) => {
//   cors(req, res, () => {
//     const message = req.query.message || req.body.message || 'No message provided';
//     console.log('log from React app:', message);

//     res.send();
//   });
// });

// exports.addLogEntry = functions.https.onCall((data, context) => {
//     const { message } = data;
//     console.log(message); // Log to Cloud Logging
//     // do more with logs
// });

// const cors = require('cors')({ origin: true });

// cors(req, res, async () => {
//     if (req.method !== 'POST') {
//       res.status(405).send('Method Not Allowed');
//       return;
//     }})

// const functions = require('@google-cloud/functions-framework');

// functions.http('logMessage', (req, res) => {
//   const message = req.query.message || req.body.message || 'No message provided';
//   console.log('log from React app:', message);

//    // Set CORS headers
//   res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.set('Access-Control-Allow-Methods', 'POST'); // Adjust as needed
//   res.set('Access-Control-Allow-Headers', 'Content-Type'); // Adjust as needed

//   res.send();
// });

// const functions = require('@google-cloud/functions-framework');
// const cors = require('cors')({ origin: true });

// exports.addLogEntry = functions.https.onRequest((req, res) => {
//     cors(req, res, async () => {
//       if (req.method !== 'POST') {
//         res.status(405).send('Method Not Allowed');
//         return;
//       }

//       const message = req.query.message || req.body.message || 'No message provided';
//       console.log('log from React app:', message);

//     });
//   });
