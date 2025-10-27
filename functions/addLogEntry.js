//add log entry function
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

exports.addLogEntry = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    const tag = req.body.data ? req.body.data.tag : "";
    const messageBody = req.body.data ? req.body.data.message : "";

    if (messageBody.length && tag.length) {
      const logMessage = `[${tag}]: ${messageBody}`;
      res.status(200).send({ data: { message: "event was logged" } });
    } else {
      res
        .status(400)
        .send({ data: { message: "tag or message should not be empty" } });
    }
  });
});