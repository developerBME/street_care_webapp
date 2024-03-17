import { auth, db } from "../firebase";
import { getAuth, updateEmail } from "firebase/auth";
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
    console.log(user?.email);

    updateEmail(user, newEmailId);
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

