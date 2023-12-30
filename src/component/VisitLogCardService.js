import { db } from "./firebase";
import {
    collection,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    query,
    where,
    limit
  } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchUserDetails, formatDate } from "./EventCardService"

const VISIT_LOG_COLLECTION = "testLog";
const OUTREACH_EVENTS_COLLECTION = "outreachEvents";
const USERS_COLLECTION = "users"; 
const PERSONAL_VISIT_LOG_COLLECTION = "personalVisitLog"

export const fetchVisitLogs = async () => {
    const visitLogsRef = collection(db, VISIT_LOG_COLLECTION);
    const visitLogSnapshot = await getDocs(visitLogsRef);
    let visitLogs = [];
    for (const doc of visitLogSnapshot.docs) {
      const visitLogData = doc.data();
      const outreachEventId = visitLogData.outreachEvent || "";
      const outreachEventData = await fetchOutreachEventData(outreachEventId);
      const uid = visitLogData.uid;
      const userDetails = await fetchUserDetails(uid)
      visitLogs.push({
        whatGiven: visitLogData.whatGiven,
        description: outreachEventData?.description || "",
        helpType: outreachEventData?.helpType || "",
        location: outreachEventData?.location || "",
        eventDate: outreachEventData?.eventDate?.seconds ? formatDate(new Date(outreachEventData?.eventDate?.seconds * 1000)) : "",
        userName: userDetails.username,
        photoUrl: userDetails.photoUrl,
      });
    }
    return visitLogs;
  };

const fetchOutreachEventData = async (eid) => {
  // Reference to the outreach event ID
  if (!eid){
    return ""
  }
  const outReachEventRef = doc(db, OUTREACH_EVENTS_COLLECTION, eid);
  const outReachEventData = await getDoc(outReachEventRef);
  return {
    description: outReachEventData?.data().description || "",
    helpType: outReachEventData?.data().helpType || "",
    eventDate: outReachEventData?.data().eventDate || "",
    location: outReachEventData?.data().location || "",
  }
};

export const fetchVisitLogById = async (visitLogId) => {
  // Reference to the specific document in the visitlog collection
  const visitLogRef = doc(db, VISIT_LOG_COLLECTION, visitLogId);
  const visitLogSnap = await getDoc(visitLogRef);
  const visitLogData = visitLogSnap.data();
  const outreachEventId = visitLogData.outreachEvent || "";  
  const outreachEventData = await fetchOutreachEventData(outreachEventId);
  const uid = visitLogData.uid;
  const userDetails = await fetchUserDetails(uid)
  return {
    whatGiven: visitLogData.whatGiven,
    description: outreachEventData?.description || "",
    helpType: outreachEventData?.helpType || "",
    location: outreachEventData?.location || "",
    eventDate: outreachEventData?.eventDate?.seconds ? formatDate(new Date(outreachEventData?.eventDate?.seconds * 1000)) : "",
    userName: userDetails.username,
    photoUrl: userDetails.photoUrl,
  }
}

// export const fetchPersonalVisitLogs = async (uid) => {
//   const visitLogsRef = collection(db, VISIT_LOG_COLLECTION);
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
  const userQuery = query(
    collection(db, USERS_COLLECTION),
    where("uid", "==", uid)
  );
  const userDocRef = await getDocs(userQuery);
  if (userDocRef.docs.length === 0) {
    console.error("User document not found for uid:", uid);
    return [];
  }
  const userData = userDocRef.docs[0].data()
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
};