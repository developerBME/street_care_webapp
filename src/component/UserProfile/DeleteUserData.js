import { auth, db } from "../firebase";
import { deleteUser } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

const user = auth.currentUser;

if (user) {
  const deleteUserData = async (uid) => {
    try {
      // Delete user data in Firestore based on UID
      const userRef = collection(db, "users");
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
    } catch (error) {
      console.error("Error deleting user data:", error);
    }
  };

  const uidDel = "bR8WnHpGzYPllfHclQ6Az55ZkXv2";
  deleteUserData(uidDel);
} else {
  console.log("User not authenticated.");
}
