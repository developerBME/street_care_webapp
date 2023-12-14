import {
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    updateDoc
} from "firebase/firestore";
import { db } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const HELP_REQ_COLLECTION = "helpRequests";
const USERS_COLLECTION = "users";

export const fetchHelpRequests = async () => {
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
            id: id
        });
    }
    return helpRequests;
};

export const fetchHelpReqById = async (helpReqId) => {
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
};
  

export const fetchUserName = async (uid) => {
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

export const handleHelpRecieved = async (e,id,refresh) => {
    e.preventDefault();
    // Reference to the specific document in the Help Request collection
    const helpRequestRef = doc(db, HELP_REQ_COLLECTION, id);
    const updateRef = await updateDoc(helpRequestRef, {
        status : "Help Received",
      });
    console.log("HELP REQ UPDATED");
    if (typeof refresh == "function") {
        refresh();
      }
};

export const handleReopenHelpRequest = async (e,id,refresh) => {
    e.preventDefault();
    // Reference to the specific document in the Help Request collection
    const helpRequestRef = doc(db, HELP_REQ_COLLECTION, id);
    const updateRef = await updateDoc(helpRequestRef, {
        status : "Need Help",
      });
    console.log("HELP REQ UPDATED");
    if (typeof refresh == "function") {
        refresh();
      }
};