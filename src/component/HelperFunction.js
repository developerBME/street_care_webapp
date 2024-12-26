import { db } from "./firebase";
import {
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    where,
  } from "firebase/firestore";
import logEvent from "./FirebaseLogger";

const USERS_COLLECTION = "users";

export async function fetchUserName(uid){
    // Reference to the uid instead of the docid of the user.
    if(uid != undefined){
      const userQuery = query(
        collection(db, USERS_COLLECTION),
        where("uid", "==", uid)
      );
      const userDocRef = await getDocs(userQuery);
    
      const userDocID = userDocRef.docs[0]?.id;
      // reference for the userdoc
      if(userDocID !== undefined){
        const userRef = doc(db, USERS_COLLECTION, userDocID);
        const userDoc = await getDoc(userRef);
        
        if (userDoc !== undefined || userDoc.exists()) {
          return userDoc.data().username || "";
        } else {
          console.error("No user found with uid:", uid);
          logEvent(
            "STREET_CARE_ERROR",
            `error on fetchUserName No user Found ${uid}`
          );
          throw new Error(
            `error on fetchUserName No user Found ${uid}`
          );
          return "";
        }
      }
    }
  };

  export function formatDate(dateObj) {
    // Extract date parts manually for custom format
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  
    const month = monthNames[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const weekday = days[dateObj.getDay()];
  
    // Extract hours, minutes, and the AM/PM part
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
  
    return `${month} ${day}, ${year} ${weekday} ${formattedTime}`;
  }

  export async function getNumberOfPages(recordsPerPage, collectionRef) {
    if (recordsPerPage < 1 || recordsPerPage > 10) {
      throw new Error(
        "Number of Records should be between 1 and 10 : "+collectionRef
      );
    }
    const snapshot = await getDocs(collection(db, collectionRef));  
    return Math.ceil(snapshot.size / recordsPerPage);
   }
