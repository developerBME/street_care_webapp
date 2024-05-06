//add log entry function
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

exports.addLogEntry = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    const logMessage = req.body.data ? req.body.data.message : "";
    if (logMessage.length) {
      console.log(logMessage);
      res.status(200).send({ data: { message: "event was logged" } });
    } else {
      res.status(400).send({ data: { message: "empty log received" } });
    }
  });
});

// Query Example

// resource.labels.function_name="addLogEntry"
// severity="DEFAULT"
// textPayload:"[STREET_CARE_INFO]"
