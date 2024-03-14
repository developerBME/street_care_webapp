import { auth, db } from "../firebase";

async function updateEmailId(emailId, newEmailId) {
  try {
    const userRecord = await auth.getUserByEmail(emailId);
    const uid = userRecord.uid;
    console.log(uid);

    const userRec = db.collection("users").doc(uid);
    console.log(userRec)

    await userRec.update({
      email: newEmailId
    });

    console.log("Email updated");
  } catch (error) {
    console.error("Could not update email:", error);
  }
}

updateEmailId("aishwaryak@brightmindenrichment.org", "aishwaryakatkar53@gmail.com");
