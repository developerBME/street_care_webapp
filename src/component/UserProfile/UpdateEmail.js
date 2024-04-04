import { auth, db } from "../firebase";
import { getAuth, updateEmail, sendEmailVerification } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

export async function updateEmailId(newEmailId) {
  try {
    console.log(auth);
    const user = auth?.currentUser;
    
    console.log(newEmailId);

    // /* eslint-disable no-restricted-globals */
    // const confirmation = confirm("Do you want to proceed?");
    // /* eslint-enable no-restricted-globals */
    // if (confirmation) {
    //   console.log("Yes, confirmed");
    //  } else {
    //   console.log("not confirmed");
    //  }

    console.log(user?.email);

    await updateEmail(user, newEmailId);

    const currentUser = auth?.currentUser;
    await sendEmailVerification(currentUser);
    console.log("Verification email sent");
      
    const uid = user?.uid;
    console.log(uid);

    const userRef = doc(db, "users", user?.uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const userEmail = userData.email;

      console.log(userData);
      console.log("Email found:", userEmail);

      await updateDoc(userRef, {
        email: newEmailId
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

// updateEmailId("aishwaryakatkar53@gmail.com");

