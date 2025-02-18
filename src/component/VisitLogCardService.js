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
  getCountFromServer
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchUserDetails } from "./EventCardService";
import { fetchUserName, formatDate, getNumberOfPages } from "./HelperFunction";
import { fetchUserDetailsBatch } from "./EventCardService";

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
        status: visitLogData.status || "",
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

const visitLogHelperFunction = async (visitLogDocs) => {
  try {
    let visitLogs = [];
    // Ensure visitLogDocs is always an array of DocumentSnapshots
    const docsArray = Array.isArray(visitLogDocs) ? visitLogDocs : visitLogDocs.docs;

    // Gather all unique user IDs
    const userIds = [...new Set(docsArray.map((doc) => doc.data().uid))];

    // Fetch user details in batch
    const userCache = await fetchUserDetailsBatch(userIds);

    for (const doc of docsArray) {
      const visitLogData = doc.data();
      const uid = visitLogData.uid;
      const userDetails = userCache[uid] || {};

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
        userName: userDetails.username || "",
        photoUrl: userDetails.photoUrl || "",
        userType: userDetails.userType || "",
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
      where("status", "==", "approved"), // Add condition to include only approved logs
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
      //where("public", "==", true),
      where("status", "==", "approved"),
      // where("status", "in", ["approved", "flagged","unflagged"]),
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



export const fetchOffsetPaginatedPublicVisitLogs = async (offset = 1, pageSize = 6) => {
  try {
    // Fetch more records than needed to simulate offset
    const fetchSize = offset * pageSize;
    const visitLogsRef = query(
      collection(db, PERSONAL_VISIT_LOG_COLLECTION),
      where("status", "==", "approved"),
      limit(fetchSize)
    );

   //Get total count
   const visitLogsRefCount = query(
    collection(db, PERSONAL_VISIT_LOG_COLLECTION),
    where("status", "==", "approved") // Apply filters if needed
  );
  const snapshot = await getCountFromServer(visitLogsRefCount);
  let totalCount=snapshot.data().count; // Returns the total count of documents  

  const visitLogSnapshot = await getDocs(visitLogsRef);
  const slicedDocs = visitLogSnapshot.docs.slice((offset*pageSize)-6, offset * pageSize);
  const visitLogs = await visitLogHelperFunction(slicedDocs);
  return { visitLogs, totalCount: totalCount };
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchVisitLogs VisitLogCardService.js- ${error.message}`
    );
    throw error;
  }
};


//FRONTEND (PAGINATION) INSTRUCTIONS

// Initial fetch (first page)
   //const { visitLogs, lastVisible } = await fetchPaginatedPublicVisitLogs();

// Fetch next page using the last visible document as the cursor 
   //const { visitLogs: nextVisitLogs, lastVisible: nextLastVisible } = await fetchPaginatedPublicVisitLogs(lastVisible, 10);
//Basically, Associate The fetchPaginatedPublicVisitLogs(lastVisible, 10) function with the 'Next page' button



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


export async function calculateNumberOfPagesForVisitlog(visitlogsPerPage) {
  return getNumberOfPages(visitlogsPerPage, PERSONAL_VISIT_LOG_COLLECTION);
  }

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


// async function addApprovedField() {
//   const colRef = collection(db, PERSONAL_VISIT_LOG);
//   const snapshot = await getDocs(colRef);

//   for (const document of snapshot.docs) {
//     const docRef = doc(db, PERSONAL_VISIT_LOG, document.id);
//     try {
//       await updateDoc(docRef, { approved: false });
//       console.log(`Updated document: ${document.id} in '${PERSONAL_VISIT_LOG}'`);
//     } catch (error) {
//       console.error(`Failed to update document: ${document.id}:`, error);
//     }
//   }
// }

// addApprovedField();


export async function fetchUnapprovedVisitLogs() {
  const colRef = collection(db, PERSONAL_VISIT_LOG);

  const q = query(colRef, where('approved', '==', false));

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    console.log(`No unapproved documents found in '${PERSONAL_VISIT_LOG}'`);
    return [];
  }

  const unapprovedDocs = [];
  snapshot.forEach((doc) => {
    unapprovedDocs.push({ id: doc.id, ...doc.data() });
  });

  console.log(`Unapproved documents from '${PERSONAL_VISIT_LOG}':`, unapprovedDocs);
  return unapprovedDocs;
}

// fetchUnapprovedVisitLogs();

// async function addTypeField() {
//   const colRef = collection(db, USERS_COLLECTION);
//   const snapshot = await getDocs(colRef);

//   for (const document of snapshot.docs) {
//     const docRef = doc(db, USERS_COLLECTION, document.id);
//     try {
//       await updateDoc(docRef, { Type: "" });
//       console.log(`Updated document: ${document.id} in '${USERS_COLLECTION}'`);
//     } catch (error) {
//       console.error(`Failed to update document: ${document.id}:`, error);
//     }
//   }
// }

// addTypeField();


export const ToggleApproveStatus = async function (documentId) {
  try {
    const docRef = doc(db, "personalVisitLog", documentId);
    const docSnap =  await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("Document not found");
      return;
    }
    const data = docSnap.data();
    let newApprovalStatus = data.approved === true ? false : true;
    await updateDoc(docRef, { approved: newApprovalStatus });
    console.log(
      `Document with ID ${documentId} successfully updated. 'approved' field is now ${newApprovalStatus}.`
    );
  } catch (error) {
    console.error("Error updating document:", error.message);
  }
};

