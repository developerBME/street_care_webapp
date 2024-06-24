import { db } from "./firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  limit,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchUserDetails, formatDate } from "./EventCardService";
import logEvent from "./FirebaseLogger";

const VISIT_LOG_COLLECTION = "testLog";
const OUTREACH_EVENTS_COLLECTION = "outreachEvents";
const USERS_COLLECTION = "users";
const PERSONAL_VISIT_LOG_COLLECTION = "personalVisitLog";

export const fetchVisitLogs = async () => {
  try {
    const visitLogsRef = collection(db, VISIT_LOG_COLLECTION);
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
    // Reference to the outreach event ID
    if (!eid) {
      return "";
    }
    const outReachEventRef = doc(db, OUTREACH_EVENTS_COLLECTION, eid);
    const outReachEventData = await getDoc(outReachEventRef);
    return {
      description: outReachEventData?.data().description || "",
      helpType: outReachEventData?.data().helpType || "",
      eventDate: outReachEventData?.data().eventDate || "",
      location: outReachEventData?.data().location || "",
      totalSlots: outReachEventData?.data().totalSlots || "",
      filledSlots: outReachEventData?.data().participants?.length || "",
    };
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchOutreachEventData VisitLogCardService.js- ${error.message}`
    );
    throw error;
  }
};

export const fetchVisitLogById = async (visitLogId) => {
  try {
    // Reference to the specific document in the visitlog collection
    const visitLogRef = doc(db, VISIT_LOG_COLLECTION, visitLogId);
    const visitLogSnap = await getDoc(visitLogRef);
    const visitLogData = visitLogSnap.data();
    const outreachEventId = visitLogData.outreachEvent || "";
    const outreachEventData = await fetchOutreachEventData(outreachEventId);
    const uid = visitLogData.uid;
    const userDetails = await fetchUserDetails(uid);
    return {
      whatGiven: visitLogData.whatGiven,
      description: outreachEventData?.description || "",
      helpType: outreachEventData?.helpType || "",
      location: outreachEventData?.location || "",
      numberPeopleHelped: visitLogData.numberPeopleHelped,
      itemQty: visitLogData.itemQty,
      eventDate: outreachEventData?.eventDate?.seconds
        ? formatDate(new Date(outreachEventData?.eventDate?.seconds * 1000))
        : "",
      userName: userDetails.username,
      photoUrl: userDetails.photoUrl,
      filledSlots: outreachEventData?.filledSlots || "",
    };
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
      const visitLogRef = doc(db, PERSONAL_VISIT_LOG_COLLECTION, visitLogId);
      const visitLogDoc = await getDoc(visitLogRef);
      if (visitLogDoc.exists()) {
        const visitLogData = visitLogDoc.data();
        visitLogsData.push({
          ...visitLogData,
          id: visitLogId,
        });
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
    throw new Error("The number of visitlogs per page must be between 1 and 10.");
  }

  const visitlogRef = collection(db, VISIT_LOG_COLLECTION);
  const snapshot = await getDocs(visitlogRef);
  const totalVisitlogs = snapshot.size;

  return Math.ceil(totalVisitlogs / visitlogPerPage);
};