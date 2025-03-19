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
  startAt,
  getCountFromServer,
  or,
  and,
  count,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchUserDetails,fetchUserTypeDetails } from "./EventCardService";
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

const visitLogHelperFunction = async (visitLogSnap) => {
  try {
    let visitLogs = [];
   
    const docsArray = visitLogSnap.docs ? visitLogSnap.docs : [visitLogSnap];

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


export const fetchPersonalVisitLogss = async (
  uid,
  pageSize =3,
  lastVisible,
  direction="next",
  pageHistory=[]
  ) => {
    
try{
let personalVisitLogRef = query(collection(db, PERSONAL_VISIT_LOG_COLLECTION),
//where("status", "==", "approved"),
where("uid","==",uid),
orderBy("dateTime", "desc")
)

//Handle Forward pagination
if (lastVisible && direction === "next") {
  personalVisitLogRef = query(personalVisitLogRef, startAfter(lastVisible));
}

// Handle Backward pagination
if (lastVisible && direction === "prev" && pageHistory.length > 2) {
  personalVisitLogRef = query(personalVisitLogRef, startAfter(pageHistory[pageHistory.length - 3]));
}
personalVisitLogRef = query(personalVisitLogRef,limit(pageSize))

const visitLogSnapshot = await getDocs(personalVisitLogRef)
const visitLogs = [];
for (let doc of visitLogSnapshot.docs) {
  visitLogs.push({
      id: doc.id,          
      ...doc.data()         
  });
}
const lastDocSnapshot = visitLogSnapshot.docs[visitLogSnapshot.docs.length - 1];


// Store history of cursors for backward pagination
if (direction === "next") {
  pageHistory.push(lastDocSnapshot);
} else if (direction === "prev") {
    pageHistory.pop();
}

return { visitLogs: visitLogs, lastVisible: lastDocSnapshot, pageHistory};
}catch (error) {
  logEvent(
    "STREET_CARE_ERROR",
    `error on fetchVisitLogs VisitLogCardService.js- ${error.message}`
  );
  throw error;
}
}

export const PersonalVisitLogsCount = async (uid) =>{
  
  try {
    let totalVisitLogRef;
  
  totalVisitLogRef= query(collection(db, PERSONAL_VISIT_LOG_COLLECTION),
  where("status", "==", "approved"),
  where("uid","==",uid),
  orderBy("dateTime", "desc"));

  const totalRecords = await getCountFromServer(totalVisitLogRef);
  return totalRecords.data().count;
  }catch(ex){
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchPersonalVisitLogs VisitLogCardService.js- ${ex.message}`
    );
    throw ex;
  }
}

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


const descriptionFilter = (searchTerm,filterQuery)=>{
  return query(
    filterQuery,
    or(
      and(
          where("city", ">=", searchTerm),
          where("city", "<=", searchTerm + "\uf8ff")
      ),
      and(
          where("description", ">=", searchTerm),
          where("description", "<=", searchTerm + "\uf8ff")
      )
    ));
}

const cityFilter = (city,filterQuery)=>{
  return query(
    filterQuery,
    where('city', '>=', city),
    where('city', '<=', city + '\uf8ff')
    );
}

const dateFilter = (startDate,endDate,filterQuery) =>{
  return query(
    filterQuery,
    where("dateTime", ">=", startDate),
    where("dateTime", "<=", endDate)
    );
}


export const fetchPublicVisitLogs = async (
  searchValue,
  city,
  startDate,
  endDate,
  isDateFilter = false,
  lastVisible = null,
  pageSize = 6,
  direction = "next",
  pageHistory = []
) => {

  try {

    //query variables 
    let pastOutreachRef,totalOutReachRef;

      //Handle date Values
      if (!(startDate instanceof Date) || isNaN(startDate)) {
        console.error("Invalid start date");
        return;
      }
      if (!(endDate instanceof Date) || isNaN(endDate)) {
        console.error("Invalid end date");
        return;
      }

    pastOutreachRef = query(collection(db, PERSONAL_VISIT_LOG_COLLECTION),where("status", "==", "approved"))
    totalOutReachRef = pastOutreachRef
    if(searchValue){
      const descriptionQuery = descriptionFilter(searchValue,totalOutReachRef)
      totalOutReachRef = descriptionQuery
    }

    if(city){
      const cityQuery = cityFilter(city,totalOutReachRef)
      totalOutReachRef = cityQuery
    }

    if(isDateFilter){
      const dateQuery = dateFilter(startDate,endDate,totalOutReachRef)
      totalOutReachRef = dateQuery
    }
    // if(!s && !d && !c){
    //   pastOutreachRef = query(pastOutreachRef,limit(pageSize))
    // }
    pastOutreachRef = query(totalOutReachRef,orderBy("dateTime", "desc"),limit(pageSize))
    //Handle Forward pagination
    if (lastVisible && direction === "next") {
      pastOutreachRef = query(pastOutreachRef, startAfter(lastVisible));
    }

    // Handle Backward pagination
    if (lastVisible && direction === "prev" && pageHistory.length > 2) {
      pastOutreachRef = query(pastOutreachRef, startAfter(pageHistory[pageHistory.length - 3]));
    }

    const totalRecords = await getCountFromServer(totalOutReachRef);
    const visitLogSnapshot = await getDocs(pastOutreachRef)
    const visitLogs = await visitLogHelperFunction(visitLogSnapshot);
    const lastDoc = visitLogSnapshot.docs[visitLogSnapshot.docs.length - 1];
    

     // Store history of cursors for backward pagination
     if (direction === "next") {
      pageHistory.push(lastDoc);
    } else if (direction === "prev") {
      pageHistory.pop();
    }
      
    return { visitLogs: visitLogs, lastVisible: lastDoc, pageHistory,pastOutreachRef:pastOutreachRef,totalRecords:totalRecords.data().count  };
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchVisitLogs VisitLogCardService.js- ${error.message}`
    );
    throw error;
  }
};

const descriptionFilterOutreaches = (searchTerm,filterQuery)=>{
  return query(
    filterQuery,
    or(
      and(
          where("location.city", ">=", searchTerm),
          where("location.city", "<=", searchTerm + "\uf8ff")
      ),
      and(
          where("description", ">=", searchTerm),
          where("description", "<=", searchTerm + "\uf8ff")
      )
    ));
}

export const fetchPendingOutreaches=async(
  searchValue,
  sortBy,
  lastVisible = null,
  pageSize = 6,
  direction = "next",
  pageHistory = []
)=>{

  let totalOutReachRef, pastOutreachRef
  pastOutreachRef = query(
        collection(db, "outreachEvents"),
        where("status", "==", "pending")
      );
  totalOutReachRef = pastOutreachRef

  if(searchValue){
    const descriptionQuery = descriptionFilterOutreaches(searchValue,totalOutReachRef)
    totalOutReachRef = descriptionQuery
  } 
  
  switch(sortBy){
    case "Oldest First":
      totalOutReachRef = query(totalOutReachRef,orderBy("eventDate","asc"))
      break;
    case "Alphabetical":
      totalOutReachRef =query(totalOutReachRef,orderBy("title","asc"))
      break;
    default:
      totalOutReachRef = query(totalOutReachRef,orderBy("eventDate","desc"))
  }

  pastOutreachRef = query(totalOutReachRef,limit(pageSize))

   //Handle Forward pagination
   if (lastVisible && direction === "next") {
    pastOutreachRef = query(pastOutreachRef, startAfter(lastVisible));
  }

  // Handle Backward pagination
  if (lastVisible && direction === "prev" && pageHistory.length > 2) {
    pastOutreachRef = query(pastOutreachRef, startAfter(pageHistory[pageHistory.length - 3]));
  }

  let outReachData = await getDocs(pastOutreachRef);
  const outreaches = await Promise.all(
    outReachData.docs.map(async (doc) => {
        const post = { id: doc.id, ...doc.data() };

        // Fetch userName using uid
        const userDetails = await fetchUserTypeDetails(post.uid);
        return {
          ...post,
          userName: userDetails?.username || "Unknown User",
          userType: userDetails?.type || "",
        };
      })
    );
    const lastDoc = outReachData.docs[outReachData.docs.length - 1];
    if (direction === "next") {
      pageHistory.push(lastDoc);
    } else if (direction === "prev") {
      pageHistory.pop();
    }
    const totalRecords = await getCountFromServer(totalOutReachRef);
    return {totalRecords:totalRecords.data().count,outreaches,lastDoc,pageHistory}
}










export const fetchHomeVisitLogs = async () => {
  try {
    const visitLogsRef = query(
      collection(db, PERSONAL_VISIT_LOG_COLLECTION),
      where("status", "==", "approved"), // Filter applied
      orderBy("dateTime","desc"),
      limit(3)
    );

    const snapshot = await getDocs(visitLogsRef);
    const visitLogs = await visitLogHelperFunction(snapshot);
    return visitLogs;
  } catch (error) {
    console.error("Error fetching count:", error);
    return 0;
  }
};

//Cursor based Paginated visit logs
export const fetchPaginatedPublicVisitLogs = async (
  lastVisible = null,
  pageSize = 6,
  direction = "next",
  pageHistory = []
) => {
  try {
    let visitLogsRef = query(
      collection(db, PERSONAL_VISIT_LOG_COLLECTION),
      where("status", "==", "approved"),
      orderBy("dateTime","desc"),
      limit(pageSize)
    );

    // Handle forward pagination
    if (lastVisible && direction === "next") {
      visitLogsRef = query(visitLogsRef, startAfter(lastVisible));
    }

    // Handle backward pagination
    if (lastVisible && direction === "prev" && pageHistory.length > 2) {
      visitLogsRef = query(visitLogsRef, startAfter(pageHistory[pageHistory.length - 3]));
    }

    const visitLogSnapshot = await getDocs(visitLogsRef);
    const visitLogs = await visitLogHelperFunction(visitLogSnapshot);

    // Get the last document for the next page
    const lastDoc = visitLogSnapshot.docs[visitLogSnapshot.docs.length - 1];

    // Store history of cursors for backward pagination
    if (direction === "next") {
      pageHistory.push(lastDoc);
    } else if (direction === "prev") {
      pageHistory.pop();
    }
      
    return { visitLogs: visitLogs, lastVisible: lastDoc, pageHistory };
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

    console.log("inside trauma")
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
