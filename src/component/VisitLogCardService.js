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
  getCountFromServer,
  or,
  and,
} from "firebase/firestore";
import { fetchUserTypeDetails } from "./EventCardService";
import { formatDate } from "./HelperFunction";
import { fetchUserDetailsBatch } from "./EventCardService";
import logEvent from "./FirebaseLogger";
import collectionMapping from "../utils/firestoreCollections";

const outreachEvents_collection = collectionMapping.outreachEvents;
const users_collection = collectionMapping.users;
const visitLogs_collection = collectionMapping.visitLogs;
const visitLogsNew_collection = collectionMapping.visitLogsBookNew;

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
        itemQty: visitLogData?.itemQty || 0,
        numberOfHelpers: visitLogData?.numberOfHelpers || 0,
        peopleHelpedDescription: visitLogData?.peopleHelpedDescription || "",
        helpType: visitLogData?.helpType || "",
        whereVisit: [visitLogData?.city, visitLogData?.state].filter(Boolean).join(', '),
        timeStamp: visitLogData?.timeStamp?.seconds
          ? formatDate(new Date(visitLogData.timeStamp.seconds * 1000))
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
    const visitLogRef = doc(db, visitLogsNew_collection, visitLogId);
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

export const fetchPersonalVisitLogss = async (
  uid,
  pageSize = 3,
  lastVisible,
  direction = "next",
  pageHistory = []
) => {
  try {
    let personalVisitLogRef = query(
      collection(db, visitLogs_collection),
      //where("status", "==", "approved"),
      where("uid", "==", uid),
      orderBy("dateTime", "desc")
    );

    //Handle Forward pagination
    if (lastVisible && direction === "next") {
      personalVisitLogRef = query(personalVisitLogRef, startAfter(lastVisible));
    }

    // Handle Backward pagination
    if (lastVisible && direction === "prev" && pageHistory.length > 2) {
      personalVisitLogRef = query(
        personalVisitLogRef,
        startAfter(pageHistory[pageHistory.length - 3])
      );
    }
    personalVisitLogRef = query(personalVisitLogRef, limit(pageSize));

    const visitLogSnapshot = await getDocs(personalVisitLogRef);
    const visitLogs = [];
    for (let doc of visitLogSnapshot.docs) {
      visitLogs.push({
        id: doc.id,
        ...doc.data(),
      });
    }
    const lastDocSnapshot =
      visitLogSnapshot.docs[visitLogSnapshot.docs.length - 1];

    // Store history of cursors for backward pagination
    if (direction === "next") {
      pageHistory.push(lastDocSnapshot);
    } else if (direction === "prev") {
      pageHistory.pop();
    }

    return { visitLogs: visitLogs, lastVisible: lastDocSnapshot, pageHistory };
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchVisitLogs VisitLogCardService.js- ${error.message}`
    );
    throw error;
  }
};

export const PersonalVisitLogsCount = async (uid) => {
  try {
    let totalVisitLogRef;

    totalVisitLogRef = query(
      collection(db, visitLogs_collection),
      where("status", "==", "approved"),
      where("uid", "==", uid),
      orderBy("dateTime", "desc")
    );

    const totalRecords = await getCountFromServer(totalVisitLogRef);
    return totalRecords.data().count;
  } catch (ex) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchPersonalVisitLogs VisitLogCardService.js- ${ex.message}`
    );
    throw ex;
  }
};

export const fetchPersonalVisitLogs = async (uid) => {
  try {
    const userQuery = query(
      collection(db, users_collection),
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
      const visitLog = await fetchPersonalVisitLogById(visitLogId);
      if (visitLog !== undefined) {
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

const descriptionFilter = (searchTerm, filterQuery) => {
  return query(
    filterQuery,
    or(
      and(
        where("city", ">=", searchTerm),
        where("city", "<=", searchTerm + "\uf8ff")
      ),
      and(
        where("peopleHelpedDescription", ">=", searchTerm),
        where("peopleHelpedDescription", "<=", searchTerm + "\uf8ff")
      )
    )
  );
};

const cityFilter = (city, filterQuery) => {
  return query(
    filterQuery,
    where("city", ">=", city),
    where("city", "<=", city + "\uf8ff")
  );
};

const dateFilter = (startDate, endDate, filterQuery) => {
  return query(
    filterQuery,
    where("timeStamp", ">=", startDate),
    where("timeStamp", "<=", endDate)
  );
};

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
    let newInteractionLogRec, totalInteractionsRef;

    //Handle date Values
    if (!(startDate instanceof Date) || isNaN(startDate)) {
      console.error("Invalid start date");
      return;
    }
    if (!(endDate instanceof Date) || isNaN(endDate)) {
      console.error("Invalid end date");
      return;
    }

    // newInteractionLogRec = query(
    //   collection(db, visitLogsNew_collection),
    //   where("status", "==", "approved")
    // );

    newInteractionLogRec = query(
      collection(db, visitLogsNew_collection),
      where("status", "==", "approved"),
      orderBy("timeStamp", "desc")
    );

    totalInteractionsRef = newInteractionLogRec;

    if (searchValue) {
      const descriptionQuery = descriptionFilter(
        searchValue,
        totalInteractionsRef
      );
      totalInteractionsRef = descriptionQuery;
    }

    if (city) {
      const cityQuery = cityFilter(city, totalInteractionsRef);
      totalInteractionsRef = cityQuery;
    }

    if (isDateFilter) {
      const dateQuery = dateFilter(startDate, endDate, totalInteractionsRef);
      totalInteractionsRef = dateQuery;
    }

    newInteractionLogRec = query(
      totalInteractionsRef,
      limit(pageSize)
    );
    //Handle Forward pagination
    if (lastVisible && direction === "next") {
      newInteractionLogRec = query(
        newInteractionLogRec,
        startAfter(lastVisible)
      );
    }

    // Handle Backward pagination
    if (lastVisible && direction === "prev" && pageHistory.length > 2) {
      newInteractionLogRec = query(
        newInteractionLogRec,
        startAfter(pageHistory[pageHistory.length - 3])
      );
    }

    const totalRecords = await getCountFromServer(totalInteractionsRef);
    const visitLogSnapshot = await getDocs(newInteractionLogRec);
    const visitLogs = await visitLogHelperFunction(visitLogSnapshot);
    const lastDoc = visitLogSnapshot.docs[visitLogSnapshot.docs.length - 1];

    // Store history of cursors for backward pagination
    if (direction === "next") {
      pageHistory.push(lastDoc);
    } else if (direction === "prev") {
      pageHistory.pop();
    }

    return {
      visitLogs: visitLogs,
      lastVisible: lastDoc,
      pageHistory,
      newInteractionLogRec: newInteractionLogRec,
      totalRecords: totalRecords.data().count,
    };
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchVisitLogs VisitLogCardService.js- ${error.message}`
    );
    throw error;
  }
};

const descriptionFilterOutreaches = (searchTerm, filterQuery) => {
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
    )
  );
};

export const fetchPendingPosts = async (
  tab,
  searchValue,
  sortBy,
  lastVisible = null,
  pageSize = 6,
  direction = "next",
  pageHistory = []
) => {
  let totalOutReachRef, pastOutreachRef;
  if (tab === "outreaches") {
    pastOutreachRef = query(
      collection(db, outreachEvents_collection),
      where("status", "==", "pending")
    );
    totalOutReachRef = pastOutreachRef;

    if (searchValue) {
      const descriptionQuery = descriptionFilterOutreaches(
        searchValue,
        totalOutReachRef
      );
      totalOutReachRef = descriptionQuery;
    }
    switch (sortBy) {
      case "Oldest First":
        totalOutReachRef = query(totalOutReachRef, orderBy("eventDate", "asc"));
        break;
      case "Alphabetical":
        totalOutReachRef = query(totalOutReachRef, orderBy("title", "asc"));
        break;
      default:
        totalOutReachRef = query(
          totalOutReachRef,
          orderBy("eventDate", "desc")
        );
    }
  } else {
    pastOutreachRef = query(
      collection(db, visitLogs_collection),
      where("status", "==", "pending")
    );
    totalOutReachRef = pastOutreachRef;

    if (searchValue) {
      const descriptionQuery = descriptionFilter(searchValue, totalOutReachRef);
      totalOutReachRef = descriptionQuery;
    }
    switch (sortBy) {
      case "Oldest First":
        totalOutReachRef = query(totalOutReachRef, orderBy("dateTime", "asc"));
        break;
      case "Alphabetical":
        totalOutReachRef = query(
          totalOutReachRef,
          orderBy("description", "asc")
        );
        break;
      default:
        totalOutReachRef = query(totalOutReachRef, orderBy("dateTime", "desc"));
    }
  }

  pastOutreachRef = query(totalOutReachRef, limit(pageSize));

  //Handle Forward pagination
  if (lastVisible && direction === "next") {
    pastOutreachRef = query(pastOutreachRef, startAfter(lastVisible));
  }

  // Handle Backward pagination
  if (lastVisible && direction === "prev" && pageHistory.length > 2) {
    pastOutreachRef = query(
      pastOutreachRef,
      startAfter(pageHistory[pageHistory.length - 3])
    );
  }

  let outReachData = await getDocs(pastOutreachRef);
  const records = await Promise.all(
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
  return {
    totalRecords: totalRecords.data().count,
    records,
    lastDoc,
    pageHistory,
  };
};

export const fetchHomeVisitLogs = async () => {
  try {
    const visitLogsRef = query(
      collection(db, visitLogsNew_collection),
      where("status", "==", "approved"), // Filter applied
      orderBy("timeStamp", "desc"),
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

export const fetchPersonalVisitLogById = async (visitLogId) => {
  try {
    const visitLogRef = doc(db, visitLogs_collection, visitLogId);
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

export const ToggleApproveStatus = async function (documentId) {
  try {
    const docRef = doc(db, visitLogs_collection, documentId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return;
    }
    const data = docSnap.data();
    let newApprovalStatus = data.approved === true ? false : true;
    await updateDoc(docRef, { approved: newApprovalStatus });
  } catch (error) {
    console.error("Error updating document:", error.message);
  }
};
