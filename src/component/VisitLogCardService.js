import { db } from "./firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  where,
  limit,
  startAfter,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchUserDetails, formatDate } from "./EventCardService";
import logEvent from "./FirebaseLogger";

const VISIT_LOG_COLLECTION = "testLog";
const OUTREACH_EVENTS_COLLECTION = "outreachEvents";
const USERS_COLLECTION = "users";
const PERSONAL_VISIT_LOG_COLLECTION = "personalVisitLog";
const VISIT_LOG_COLLECTION_PROD = "visitLogWebProd";
const PERSONAL_VISIT_LOG = "personalVisitLog";

export const fetchVisitLogs = async () => {
  try {
    const visitLogsRef = collection(db, PERSONAL_VISIT_LOG_COLLECTION);
    const visitLogSnapshot = await getDocs(visitLogsRef);
    let visitLogs = [];
    for (const doc of visitLogSnapshot.docs) {
      const visitLogData = doc.data();
      const outreachEventId = visitLogData.outreachEvent || "";
      const outreachEventData = await fetchOutreachEventData(outreachEventId);
      const uid = visitLogData.uid;
      const userDetails = await fetchUserDetails(uid);
      visitLogs.push({
        id: doc.id,
        whatGiven: visitLogData.whatGiven,
        itemQty: visitLogData?.itemQty || "",
        numberPeopleHelped: visitLogData?.numberPeopleHelped || "",
        description: outreachEventData?.description || "",
        helpType: outreachEventData?.helpType || "",
        location: outreachEventData?.location || "",
        eventDate: outreachEventData?.eventDate?.seconds
          ? formatDate(new Date(outreachEventData?.eventDate?.seconds * 1000))
          : "",
        userName: userDetails.username,
        photoUrl: userDetails.photoUrl,
        totalSlots: outreachEventData?.totalSlots || "",
        filledSlots: outreachEventData?.filledSlots || "",
      });
    }
    return visitLogs;
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchVisitLogs VisitLogCardService.js- ${error.message}`
    );
    throw error;
  }
};

const fetchOutreachEventData = async (eid) => {
  try {
    // Check if eid is valid
    if (!eid) {
      console.warn("fetchOutreachEventData called with invalid eid:", eid);
      return "";
    }

    // Reference to the outreach event ID
    const outReachEventRef = doc(db, OUTREACH_EVENTS_COLLECTION, eid);
    const outReachEventData = await getDoc(outReachEventRef);

    // Check if the document exists
    if (!outReachEventData.exists()) {
      console.warn("Outreach event document does not exist for eid:", eid);
      return {
        description: "",
        helpType: "",
        eventDate: "",
        location: "",
        totalSlots: "",
        filledSlots: "",
      };
    }

    const data = outReachEventData.data();

    // Return data with fallbacks for missing fields
    return {
      description: data.description || "",
      helpType: data.helpType || "",
      eventDate: data.eventDate || "",
      location: data.location || "",
      totalSlots: data.totalSlots || "",
      filledSlots: data.participants?.length || 0, // Ensure filledSlots is a number
    };
  } catch (error) {
    // Log the error with additional context
    logEvent(
      "STREET_CARE_ERROR",
      `Error in fetchOutreachEventData (VisitLogCardService.js): ${error.message}`
    );
    console.error("Error fetching outreach event data:", error);
    throw error;
  }
};

const visitLogHelperFunction = async (visitLogSnap) => {
  try {
    let visitLogs = [];
    const docsArray = visitLogSnap.docs ? visitLogSnap.docs : [visitLogSnap];
    for (const doc of docsArray) {
      const visitLogData = doc.data();
      //const outreachEventId = visitLogData.outreachEvent || "";
      //const outreachEventData = await fetchOutreachEventData(outreachEventId);
      const uid = visitLogData.uid;
      const userDetails = await fetchUserDetails(uid);
      visitLogs.push({
        id: doc.id,
        whatGiven: visitLogData.whatGiven,
        itemQty: visitLogData?.itemQty || "",
        numberPeopleHelped: visitLogData?.numberPeopleHelped || "",
        description: visitLogData?.description || "",
        helpType: visitLogData?.helpType || "",
        location: {
          street: visitLogData?.street || "",
          city: visitLogData?.city || "",
          state: visitLogData?.state || "",
          stateAbbv: visitLogData?.stateAbbv || "",
          zipcode: visitLogData?.zipcode || "",
        },
        eventDate: visitLogData?.dateTime?.seconds
          ? formatDate(new Date(visitLogData.dateTime.seconds * 1000))
          : "",
        userName: userDetails.username,
        photoUrl: userDetails.photoUrl,
      });
    }
    return visitLogs;
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on visitLogHelperFunction VisitLogCardService.js- ${error.message}`
    );
    throw error;
  }
};

export const fetchVisitLogById = async (visitLogId) => {
  try {
    // Reference to the specific document in the visitlog collection
    const visitLogRef = doc(db, PERSONAL_VISIT_LOG_COLLECTION, visitLogId);
    const visitLogSnap = await getDoc(visitLogRef);
    let visitLogs = await visitLogHelperFunction(visitLogSnap);

    return visitLogs[0];
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchVisitLogById VisitLogCardService.js- ${error.message}`
    );
    throw error;
  }
};

// export const fetchPersonalVisitLogs = async (uid) => {
//   const visitLogsRef = collection(db, PERSONAL_VISIT_LOG_COLLECTION);
//   const visitLogSnapshot = await getDocs(visitLogsRef);
//   let visitLogs = [];
//   for (const doc of visitLogSnapshot.docs) {
//     const visitLogData = doc.data();
//     const outreachEventId = visitLogData.outreachEvent || "";
//     const outreachEventData = await fetchOutreachEventData(outreachEventId);
//     const uid = visitLogData.uid;
//     const userDetails = await fetchUserDetails(uid)
//     visitLogs.push({
//       whatGiven: visitLogData.whatGiven,
//       description: outreachEventData?.description || "",
//       helpType: outreachEventData?.helpType || "",
//       location: outreachEventData?.location || "",
//       eventDate: outreachEventData?.eventDate?.seconds ? formatDate(new Date(outreachEventData?.eventDate?.seconds * 1000)) : "",
//       userName: userDetails.username,
//       photoUrl: userDetails.photoUrl,
//     });
//   }
//   return visitLogs;
// };
// const userQuery = query(
//   collection(db, PERSONAL_VISIT_LOG_COLLECTION),
//   where(firebase.firestore.FieldPath.documentId(), "in", [id1,id2])
// );
// const userDocRef = await getDocs(userQuery);

export const fetchTopVisitLogs = async () => {
  try {
    const visitlogs = collection(db, PERSONAL_VISIT_LOG_COLLECTION);
    const visitlogsQuery = query(
      visitlogs,
      orderBy("dateTime", "desc"), // Order visit logs by the 'dateTime' field in descending order to get the newest entries first
      limit(6) // Limit to top 6 records
    );
    const visitLogDocRef = await getDocs(visitlogsQuery);
    let visitLogs = [];
    for (const doc of visitLogDocRef.docs) {
      const visitLogData = doc.data();
      const id = doc.id;
      const userName = await fetchUserName(visitLogData.uid);
      visitLogs.push({
        ...visitLogData,
        userName: userName,
        id: id,
      });
    }
    // console.log(visitLogs)
    return visitLogs;
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchTopVisitLogs EventCardService.js- ${error.message}`
    );
    throw error;
  }
};

export const fetchPersonalVisitLogs = async (uid) => {
  try {
    const userQuery = query(
      collection(db, USERS_COLLECTION),
      where("uid", "==", uid)
    );
    const userDocRef = await getDocs(userQuery);
    if (userDocRef.docs.length === 0) {
      console.error("User document not found for uid:", uid);
      return [];
    }    
    const userData = userDocRef.docs[0].data();
    const visitLogIds = userData.personalVisitLogs || [];
    const visitLogsData = [];

    for (let visitLogId of visitLogIds) {
      // console.log(visitLogId);
      const visitLog = await fetchPersonalVisitLogById(visitLogId)
      if( visitLog != undefined ){
        visitLogsData.push(visitLog);
      }
    }
    return visitLogsData;
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchPersonalVisitLogs VisitLogCardService.js- ${error.message}`
    );
    throw error;
  }
};

export const fetchPublicVisitLogs = async () => {
  try {
    const visitLogsRef = query(
      collection(db, PERSONAL_VISIT_LOG_COLLECTION),
      where("public", "==", true)
    );
    const visitLogSnapshot = await getDocs(visitLogsRef);
    let visitLogs = await visitLogHelperFunction(visitLogSnapshot);
    return visitLogs;
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchVisitLogs VisitLogCardService.js- ${error.message}`
    );
    throw error;
  }
};

export const fetchPersonalVisitLogById = async (visitLogId) => {
  try {
    const visitLogRef = doc(db, PERSONAL_VISIT_LOG_COLLECTION, visitLogId);
    const visitLogDoc = await getDoc(visitLogRef);
    if (visitLogDoc.exists()) {
      const visitLogData = visitLogDoc.data();
      return {
        ...visitLogData,
        id: visitLogId,
      };
    }
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchPersonalVisitLogById VisitLogCardService.js- ${error.message}`
    );
    throw error;
  }
};

export async function calculateNumberOfPagesForVisitlog(visitlogPerPage) {
  if (visitlogPerPage < 1 || visitlogPerPage > 10) {
    throw new Error(
      "The number of visitlogs per page must be between 1 and 10."
    );
  }

  const visitlogRef = collection(db, PERSONAL_VISIT_LOG_COLLECTION);
  const snapshot = await getDocs(visitlogRef);
  const totalVisitlogs = snapshot.size;

  return Math.ceil(totalVisitlogs / visitlogPerPage);
}

const fetchUserName = async (uid) => {
  // Reference to the uid instead of the docid of the user.
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
        `error on fetchUserName VisitLogCardService.js- No user Found ${uid}`
      );
      throw new Error(
        `error on fetchUserName VisitLogCardService.js- No user Found ${uid}`
      );
      return "";
    }
  }
};

export const fetchVisitLogsByCityOrState = async (
  searchValue,
  startDate,
  endDate,
  pageIndex = null,
  recordsPerPage = 5
) => {
  try {
    if (!searchValue || typeof searchValue !== "string") {
      console.error("Invalid search value");
      return;
    }

    if (!(startDate instanceof Date) || isNaN(startDate)) {
      console.error("Invalid start date");
      return;
    }

    if (!(endDate instanceof Date) || isNaN(endDate)) {
      console.error("Invalid end date");
      return;
    }

    const visitlogs = collection(db, PERSONAL_VISIT_LOG);

    let pageQuery = null;
    let visitlogsByLocationQuery = null;

    if (pageIndex !== null) {
      if (pageIndex === 0) {
        pageQuery = query(
          visitlogs,
          where("city", "==", searchValue),
          where("dateTime", ">=", startDate),
          where("dateTime", "<=", endDate),
          orderBy("dateTime", "asc"),
          limit(recordsPerPage)
        );
      } else {
        const prevPageQuery = query(
          visitlogs,
          where("city", "==", searchValue),
          where("dateTime", ">=", startDate),
          where("dateTime", "<=", endDate),
          orderBy("dateTime", "asc"),
          limit(pageIndex * recordsPerPage)
        );

        const documentSnapshots = await getDocs(prevPageQuery);
        const lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];
        pageQuery = query(
          visitlogs,
          where("city", "==", searchValue),
          where("dateTime", ">=", startDate),
          where("dateTime", "<=", endDate),
          orderBy("dateTime", "asc"),
          limit(recordsPerPage),
          startAfter(lastVisible)
        );
      }
      visitlogsByLocationQuery = pageQuery;
    } else {
      visitlogsByLocationQuery = query(
        visitlogs,
        where("city", "==", searchValue),
        where("dateTime", ">=", startDate),
        where("dateTime", "<=", endDate),
        orderBy("dateTime", "asc")
      );
    }

    const visitLogDocRef = await getDocs(visitlogsByLocationQuery);

    if (visitLogDocRef.docs.length === 0 && pageIndex !== null) {
      throw new Error(
        `Not enough documents to access page of index : ${pageIndex}`
      );
    }

    let visitLogByCity = [];
    for (const doc of visitLogDocRef.docs) {
      const visitLogData = doc.data();
      const id = doc.id;
      const userName = await fetchUserName(visitLogData.uid);
      visitLogByCity.push({
        ...visitLogData,
        userName: userName,
        id: id,
      });
    }
    return visitLogByCity;
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchVisitLogByCityOrState VisitLogCardService.js- ${error.message}`
    );
    throw error;
  }
};
