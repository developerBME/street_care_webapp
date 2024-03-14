import { auth, db } from "../firebase";

async function updateEmailId(emailId, newEmailId) {
  try {
    console.log(auth);
    const user = auth.currentUser;
    console.log(user);

    await user.updateEmail(newEmailId);

    const uid = user.uid;
    console.log(uid);

    const userDocRef = db.collection("users").doc(uid);
    await userDocRef.update({
      email: newEmailId
    });

    console.log("Email updated");

  } catch (error) {
    console.error("Could not update email:", error);
  }
}

updateEmailId("aishwaryak@brightmindenrichment.org", "aishwaryakatkar53@gmail.com");
