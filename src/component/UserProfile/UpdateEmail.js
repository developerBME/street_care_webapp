import { auth, db } from "../firebase";
import { getAuth, updateEmail, sendEmailVerification, unlink, updatePassword } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { customUpdateEmail } from "./UpdateEmail2FA";

const USERS_COLLECTION = process.env.REACT_APP_FIREBASE_USER_COLLECTION;
const AUDITLOG_COLLECTION = process.env.REACT_APP_FIREBASE_AUDITLOG_COLLECTION;

export async function updateEmailId(newEmailId) {

  try {
    console.log(auth);
    const user = auth?.currentUser;

    console.log(newEmailId);
    console.log(user?.email);
      
    const uid = user?.uid;
    console.log(uid);

    const userRef = doc(db, USERS_COLLECTION, user?.uid);
    const userSnapshot = await getDoc(userRef);
    console.log(user)
  
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const oldEmail = userData.email;

      console.log(userData);
      console.log("Email found:", oldEmail);

      await updateDoc(userRef, {
        email: newEmailId
      });

      //await updateEmail(user, newEmailId);// inbuilt update email with verification
      //2. custom update email call without verification step
      const result = await customUpdateEmail(user, newEmailId)      
      console.log(result);

      const emailChangeLog = collection(db, AUDITLOG_COLLECTION);
      await addDoc(emailChangeLog, {
        oldEmail,
        newEmail: newEmailId,
        uid,
        timestamp: Timestamp.now(),
        type: 'email change'
      });
      console.log("New email updated");
    } else {
      console.error("User not found");
    }

    console.log(userRef);
    console.log("Email updated successfully");

  } catch (error) {
    console.error("Could not update email:", error);
  }
}


export async function updateSocialLoginEmail(newEmailId) {
  try {
    console.log(auth);
    const user = auth?.currentUser;

    console.log(newEmailId);
    console.log(user?.email);
      
    const uid = user?.uid;
    console.log(uid);

    const userRef = doc(db, USERS_COLLECTION, user?.uid);
    const userSnapshot = await getDoc(userRef);
    console.log(user)
  
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const oldEmail = userData.email;

      console.log(userData);
      console.log("Email found:", oldEmail);

      await updateDoc(userRef, {
        email: newEmailId
      });

      await updateEmail(user, newEmailId);// inbuilt update email with verification

      const emailChangeLog = collection(db, AUDITLOG_COLLECTION);
      await addDoc(emailChangeLog, {
        oldEmail,
        newEmail: newEmailId,
        uid,
        timestamp: Timestamp.now(),
        type: 'email change'
      });
      console.log("New email updated");
    } else {
      console.error("User not found");
    }
    console.log(userRef);
    console.log("Email updated successfully");

  } catch (error) {
    console.error("Could not update email:", error);
  }
}
