import {
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    where,
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
        const userName = await fetchUserName(helpData.uid);

        helpRequests.push({
            ...helpData,
            userName: userName
        });
    }
    return helpRequests;
};


const fetchUserName = async (uid) => {
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