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