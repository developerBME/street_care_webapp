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

import collectionMapping from "../../utils/firestoreCollections";

const users_collection = collectionMapping.users;
const auditLog_collection = collectionMapping.auditLog;
export async function updateEmailId(newEmailId) {

  try {
    const user = auth?.currentUser;
      
    const uid = user?.uid;

    const userRef = doc(db, users_collection, user?.uid);
    const userSnapshot = await getDoc(userRef);
  
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const oldEmail = userData.email;

      await updateDoc(userRef, {
        email: newEmailId
      });

      //await updateEmail(user, newEmailId);// inbuilt update email with verification
      //2. custom update email call without verification step
      const result = await customUpdateEmail(user, newEmailId)      

      const emailChangeLog = collection(db, auditLog_collection);
      await addDoc(emailChangeLog, {
        oldEmail,
        newEmail: newEmailId,
        uid,
        timestamp: Timestamp.now(),
        type: 'email change'
      });
    } else {
      console.error("User not found");
    }
  } catch (error) {
    console.error("Could not update email:", error);
  }
}


export async function updateSocialLoginEmail(newEmailId) {
  try {
    const user = auth?.currentUser;

    const uid = user?.uid;

    const userRef = doc(db, users_collection, user?.uid);
    const userSnapshot = await getDoc(userRef);
  
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const oldEmail = userData.email;

      await updateDoc(userRef, {
        email: newEmailId
      });

      await updateEmail(user, newEmailId);// inbuilt update email with verification

      const emailChangeLog = collection(db, auditLog_collection);
      await addDoc(emailChangeLog, {
        oldEmail,
        newEmail: newEmailId,
        uid,
        timestamp: Timestamp.now(),
        type: 'email change'
      });
    } else {
      console.error("User not found");
    }

  } catch (error) {
    console.error("Could not update email:", error);
  }
}
