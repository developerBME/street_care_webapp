import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import logEvent from "./FirebaseLogger";

const HELP_REQ_COLLECTION = "helpRequests";
const USERS_COLLECTION = "users";
const OUTREACHES_COLLECTION = "outreachEvents";

export const fetchHelpRequests = async () => {
  try {
    const helpReqRef = collection(db, HELP_REQ_COLLECTION);
    const helpSnapshot = await getDocs(helpReqRef);
    let helpRequests = [];

    const fAuth = getAuth();
    onAuthStateChanged(fAuth, (user) => {
      if (user) {
        console.log("Found user");
      } else {
        console.log("USER NOT FOUND!");
      }
    });

    for (const doc of helpSnapshot.docs) {
      const helpData = doc.data();
      const id = doc.id;
      const userName = await fetchUserName(helpData.uid);

      helpRequests.push({
        ...helpData,
        userName: userName,
        id: id,
      });
    }
    return helpRequests;
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchHelpRequests HelpRequestService.js- ${error.message}`
    );
    throw error;
  }
};

export const fetchHelpReqById = async (helpReqId) => {
  try {
    // Reference to the specific document in the Help Request collection
    const helpRef = doc(db, HELP_REQ_COLLECTION, helpReqId);

    const helpSnap = await getDoc(helpRef);

    // Check if the document exists
    if (!helpSnap.exists()) {
      console.error("Help Request not found with id:", helpReqId);
      return null;
    }

    const helpData = helpSnap.data();

    return {
      ...helpData,
    };
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchHelpReqById HelpRequestService.js- ${error.message}`
    );
    throw error;
  }
};

export const fetchUserName = async (uid) => {
  try {
    // Reference to the uid instead of the docid of the user.
    const userQuery = query(
      collection(db, USERS_COLLECTION),
      where("uid", "==", uid)
    );
    const userDocRef = await getDocs(userQuery);
    const userDocID = userDocRef.docs[0].id;
    // reference for the userdoc
    const userRef = doc(db, USERS_COLLECTION, userDocID);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data().username || "";
    } else {
      console.error("No user found with uid:", uid);
      return "";
    }
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchUserName HelpRequestService.js- ${error.message}`
    );
    throw error;
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

export const handleHelpRecieved = async (e, id, refresh) => {
  try {
    e.preventDefault();
    // Reference to the specific document in the Help Request collection
    const helpRequestRef = doc(db, HELP_REQ_COLLECTION, id);
    const updateRef = await updateDoc(helpRequestRef, {
      status: "Help Received",
    });
    console.log("HELP REQ UPDATED");
    if (typeof refresh == "function") {
      refresh();
    }
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchUserName HelpRequestService.js- ${error.message}`
    );
    throw error;
  }
};

export const handleReopenHelpRequest = async (e, id, refresh) => {
  try {
    e.preventDefault();
    // Reference to the specific document in the Help Request collection
    const helpRequestRef = doc(db, HELP_REQ_COLLECTION, id);
    const updateRef = await updateDoc(helpRequestRef, {
      status: "Need Help",
    });
    console.log("HELP REQ UPDATED");
    if (typeof refresh == "function") {
      refresh();
    }
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on handleReopenHelpRequest HelpRequestService.js- ${error.message}`
    );
    throw error;
  }
};

export async function fetchOutreaches(helpRequestId) {
  console.log("Fetching outreaches for helpRequestId: ", helpRequestId);

  try {
    const outreachesRef = collection(db, OUTREACHES_COLLECTION);
    const outreachQuery = query(
      outreachesRef,
      where("helpRequest", "array-contains", helpRequestId)
    );
    const snapshot = await getDocs(outreachQuery);

    if (snapshot.empty) {
      console.log("No matching outreaches found.");
      return [];
    }

    let outreaches = [];
    snapshot.forEach((doc) => {
      outreaches.push({ id: doc.id, ...doc.data() });
    });

    console.log("Fetched outreaches: ", outreaches);
    return outreaches;
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchOutreaches HelpRequestService.js- ${error.message}`
    );
    console.error("Error fetching outreaches: ", error);
    throw error;
  }
}
