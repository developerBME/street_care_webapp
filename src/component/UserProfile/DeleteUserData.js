import { auth, db } from "../firebase";
import { deleteUser } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

const USERS_COLLECTION = process.env.REACT_APP_FIREBASE_USER_COLLECTION;

const deleteUserData = async (uid) => {
  const user = auth.currentUser;
  console.log("inside the fuction delete user");
  if (user) {
    try {
      console.log("inside the try block delete user");
      // Delete user data in Firestore based on UID
      const userRef = collection(db, USERS_COLLECTION);
      const q = query(userRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No user found with the provided UID.");
        return;
      }

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log("Document deleted successfully!");
      });

      // Delete user from authentication using deleteUser function
      await deleteUser(auth, uid);
      console.log("User deleted from authentication.");

      console.log("User data deleted successfully!");
      return true;
    } catch (error) {
      console.error("Error deleting user data:", error);
      return false;
    }
  }
  else {
    console.error("User not found.");
  }
  return false;
};

export default deleteUserData;