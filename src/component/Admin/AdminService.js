  import { collection, getDocs } from 'firebase/firestore';
  import { db } from "../firebase";
  import logEvent from '../FirebaseLogger';
  
  const USERS_COLLECTION = "users";

  export const fetchAllUsers = async () => {
    try {
        const usersRef = collection(db, USERS_COLLECTION);
        const userSnapshot = await getDocs(usersRef);
        const userList = userSnapshot.docs.map(doc => ({
            docId: doc.id,
            ...doc.data()
        }));
        //console.log(userList)
        return userList;
    } catch (error) {
      logEvent(
        "STREET_CARE_ERROR",
        `error on fetchAllUsers in AdminService.js- ${error.message}`);
      throw error;
    }
  };
  
  