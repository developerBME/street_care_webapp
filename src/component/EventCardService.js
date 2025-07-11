import {
  collection,
  getDocs,
  getDoc,
  doc,
  orderBy,
  updateDoc,
  query,
  where,
  limit,
  startAt,
  startAfter,
  or,
  and,
  getCountFromServer,
  endBefore,
} from "firebase/firestore";
import { db } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import logEvent from "./FirebaseLogger";
import { Timestamp } from "firebase/firestore";
import { fetchUserName, formatDate, getNumberOfPages } from "./HelperFunction";
import collectionMapping from "../utils/firestoreCollections";

const users_collection = collectionMapping.users;
const visitLogs_collection = collectionMapping.visitLogs;
const outreachEvents_collection = collectionMapping.outreachEvents;
const officialEvents_collection = collectionMapping.officialEvents;

const descriptionFilter = (searchTerm,filterQuery)=>{
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

const cityFilter = (city,filterQuery)=>{
  return query(
    filterQuery,
    where('location.city', '>=', city),
    where('location.city', '<=', city + '\uf8ff')
    );
}

const dateFilter = (startDate,endDate,filterQuery) =>{
  return query(
    filterQuery,
    where("eventDate", ">=", startDate),
    where("eventDate", "<=", endDate)
    );
}

const timeFilter = (filterQuery,isPast) =>{
  return query(
    filterQuery,
    isPast ? where("eventDate","<=",new Date()) : where("eventDate",">=",new Date())
  )
}

export const fetchEvents = async (
  searchValue,
  city,
  startDate,
  endDate,
  isDateFilter = false,
  isTimeFilter = false,
  timeframe,
  lastVisible = null,
  pageSize = 6,
  direction = "next",
  pageHistory = []
) => {
  try {
    let totalOutReachRef, pastOutreachRef
    pastOutreachRef = query(collection(db, outreachEvents_collection),where("status", "==", "approved"))
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

    if(isTimeFilter){
      const timeQuery = timeFilter(totalOutReachRef,timeframe==="past"?true:false)
      totalOutReachRef = timeQuery
    }
    pastOutreachRef = query(totalOutReachRef,orderBy("eventDate", "asc"),limit(pageSize))
    //Handle Forward pagination
    if (lastVisible && direction === "next") {
      pastOutreachRef = query(pastOutreachRef, startAfter(lastVisible));
    }
    
    // Handle Backward pagination
    if (lastVisible && direction === "prev" && pageHistory.length > 2) {
      pastOutreachRef = query(pastOutreachRef, startAfter(pageHistory[pageHistory.length - 3]));
    }
    const eventSnapshot = await getDocs(pastOutreachRef);
    const lastDoc = eventSnapshot.docs[eventSnapshot.docs.length - 1];



    // Collecting all unique user IDs
    const userIds = new Set();
    eventSnapshot.docs.forEach((doc) => {if(doc.data().uid) userIds.add(doc.data().uid)});
   
    // Batch fetch user details
    const userDetails = await fetchUserDetailsBatch(Array.from(userIds));


    const totalRecords = await getCountFromServer(totalOutReachRef);
    const fAuth = getAuth();

    const outreachEvents = eventSnapshot.docs.map((doc) => {
      const eventData = doc.data();
      const currentParticipants = eventData.participants || [];

      return {
        ...eventData,
        userName: userDetails[eventData.uid]?.username || "",
        photoUrl: userDetails[eventData.uid]?.photoUrl || "",
        id: doc.id,
        label:
          fAuth.currentUser &&
          currentParticipants.includes(fAuth?.currentUser?.uid)
            ? "EDIT"
            : "RSVP",
        nop: currentParticipants.length,
        userType: userDetails[eventData.uid]?.userType || "",
      };
    });

    if (direction === "next") {
      pageHistory.push(lastDoc);
    } else if (direction === "prev") {
      pageHistory.pop();
    }

    return {outreachEvents,totalRecords:totalRecords.data().count,lastDoc,pageHistory};
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchEvents in EventCardService.js- ${error.message}`
    );
    throw error;
  }
};

export async function calculateNumberOfPagesForOutreach(outreachesPerPage) {
  return getNumberOfPages(outreachesPerPage, outreachEvents_collection);
}

export async function fetchUserDetailsBatch(userIds) {
  const userDetails = {};
  // Firestore limits 'in' queries to 10 items
  const chunks = splitArrayIntoChunksOfLen(userIds, 10);
  console.log(chunks)
  for (const chunk of chunks) {
    const userQuery = query(
      collection(db, users_collection),
      where("uid", "in", chunk)
    );
    const querySnapshot = await getDocs(userQuery);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      userDetails[data.uid] = {
        username: data.username || "",
        photoUrl: data.photoUrl || "",
        userType: data.Type || "",
      };
    });
  }
  return userDetails;
}

// Helper function to split an array into chunks of a specified length
function splitArrayIntoChunksOfLen(arr, len) {
  var chunks = [],
    i = 0,
    n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
}

export const fetchPaginatedEvents = async (
  city,
  startDate,
  endDate,
  searchDescription = "",
  lastVisible = null,
  pageSize = 6,
  direction = "next",
  pageHistory = []
) => {
  try {
    let eventsQuery;
    const eventsCollection = collection(db, outreachEvents_collection);

    let filters = [
      where("status", "==", "approved"),
      where("eventDate", ">=", startDate),
      orderBy("eventDate", "asc")
    ];

    if (endDate && endDate.getFullYear() < 9000) {
      filters.push(where("eventDate", "<=", endDate));
    }

    if (city && city.trim() !== "") {
      filters.push(where("location.city", ">=", city.trim()));
      filters.push(where("location.city", "<=", city.trim() + '\uf8ff'));
    }

    if (searchDescription && searchDescription.trim() !== "") {
      const searchTerm = searchDescription.trim();
      filters.push(orderBy("description"));
      filters.push(where("description", ">=", searchTerm));
      filters.push(where("description", "<=", searchTerm + "\uf8ff"));
    }

    eventsQuery = query(eventsCollection, ...filters);

    const totalRecordsSnapshot = await getCountFromServer(eventsQuery);
    const totalRecords = totalRecordsSnapshot.data().count;

    let newPageHistory = [...pageHistory];

    if (direction === "next") {
      if (lastVisible) {
        eventsQuery = query(eventsQuery, startAfter(lastVisible), limit(pageSize));
        newPageHistory.push(lastVisible);
      } else {
        eventsQuery = query(eventsQuery, limit(pageSize));
      }
    } else if (direction === "prev") {
      if (newPageHistory.length > 1) {
        newPageHistory.pop();
        
        const prevPageCursor = newPageHistory[newPageHistory.length - 1];
        
        if (prevPageCursor) {
          eventsQuery = query(eventsQuery, startAfter(prevPageCursor), limit(pageSize));
        } else {
          eventsQuery = query(eventsQuery, limit(pageSize));
          newPageHistory = [];
        }
      } else {
        eventsQuery = query(eventsQuery, limit(pageSize));
        newPageHistory = [];
      }
    } else {
      eventsQuery = query(eventsQuery, limit(pageSize));
    }
  
    console.log("Executing query with direction:", direction);
    const snapshot = await getDocs(eventsQuery);

    const userIds = [...new Set(snapshot.docs.map(doc => doc.data().uid))];
    const userDetails = await fetchUserDetailsBatch(userIds);

    const fetchedEvents = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        eventDate:
          data.eventDate && data.eventDate.seconds
            ? formatDate(new Date(data.eventDate.seconds * 1000))
            : "",
        userName: userDetails[data.uid]?.username || "Unknown User",
        photoUrl: userDetails[data.uid]?.photoUrl || "",
        userType: userDetails[data.uid]?.userType || ""
      };
    });

    const lastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

    return { 
      events: fetchedEvents, 
      lastVisible: lastDoc, 
      pageHistory: newPageHistory, 
      totalFilteredEvents: totalRecords 
    };
  } catch (error) {
    console.error("Error fetching paginated events:", error);
    logEvent(
      "STREET_CARE_ERROR",
      `Error fetching paginated events with search: ${error.message}`
    );
    throw error;
  }
};

export const fetchPaginatedPastOutreachEvents = async (
  city,
  startDate,
  endDate,
  searchTerm = "",
  lastVisible = null,
  pageSize = 6,
  direction = "next",
  pageHistory = []
) => {
  try {
    let pastOutreachQuery = query(
      collection(db, outreachEvents_collection),
      where("status", "==", "approved"),
      where("eventDate", "<", new Date()),
      where("eventDate", ">=", startDate),
      where("eventDate", "<=", endDate),
      orderBy("eventDate", "desc")
    );

    if (city && city.trim() !== "") {
      pastOutreachQuery = query(
        pastOutreachQuery,
        where("location.city", ">=", city),
        where("location.city", "<=", city + "\uf8ff")
      );
    }

    if (searchTerm && searchTerm.trim() !== "") {
      pastOutreachQuery = query(
        pastOutreachQuery,
        where("description", ">=", searchTerm),
        where("description", "<=", searchTerm + "\uf8ff")
      );
    }

    const totalRecordsSnapshot = await getCountFromServer(pastOutreachQuery);
    const totalRecords = totalRecordsSnapshot.data().count;

    let paginatedQuery = query(pastOutreachQuery, limit(pageSize));

    if (lastVisible && direction === "next") {
      paginatedQuery = query(paginatedQuery, startAfter(lastVisible));
    } else if (lastVisible && direction === "prev" && pageHistory.length > 2) {
      paginatedQuery = query(paginatedQuery, startAfter(pageHistory[pageHistory.length - 3]));
    }

    const snapshot = await getDocs(paginatedQuery);
    const userIds = [...new Set(snapshot.docs.map(doc => doc.data().uid))];
    const userDetails = await fetchUserDetailsBatch(userIds);

    const fetchedEvents = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        eventDate:
          data.eventDate && data.eventDate.seconds
            ? formatDate(new Date(data.eventDate.seconds * 1000))
            : "",
        userName: userDetails[data.uid]?.username || "Unknown User",
        photoUrl: userDetails[data.uid]?.photoUrl || "",
        userType: userDetails[data.uid]?.userType || ""
      };
    });

    const lastDoc = snapshot.docs[snapshot.docs.length - 1];

    if (direction === "next") {
      pageHistory.push(lastDoc);
    } else if (direction === "prev") {
      pageHistory.pop();
    }

    return { fetchedEvents, lastVisible: lastDoc, pageHistory, totalRecords };
  } catch (error) {
    logEvent("STREET_CARE_ERROR", `Error fetching paginated past outreach events: ${error.message}`);
    throw error;
  }
};

export const fetchPastOutreachEvents = async () => {
  try {
    const pastOureachEventsRef = collection(
      db,
      outreachEvents_collection
    );
    const eventSnapshot = await getDocs(pastOureachEventsRef);

    const userIds = new Set();
    eventSnapshot.docs.forEach((doc) => userIds.add(doc.data().uid));

    // Fetch user details in batch
    const userDetails = await fetchUserDetailsBatch(Array.from(userIds));

    // Process events
    let outreachEvents = eventSnapshot.docs.map((doc) => {
      const eventData = doc.data();
      return {
        ...eventData,
        userName: userDetails[eventData.uid]?.username,
        photoUrl: userDetails[eventData.uid]?.photoUrl,
        id: doc.id,
        nop: eventData.participants?.length || 0,
      };
    });

    return outreachEvents;
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchPastOutreachEvents EventCardService.js- ${error.message}`
    );
    throw error;
  }
};

export const fetchOfficialEvents = async () => {
  try {
    const officialEventsRef = collection(db, officialEvents_collection);
    const snapshot = await getDocs(officialEventsRef);
    const officialEvents = [];
    const fAuth = getAuth();
    onAuthStateChanged(fAuth, (user) => {
      if (user) {
        console.log("Found user");
      } else {
        console.log("USER NOT FOUND!");
      }
    });
    for (const doc of snapshot.docs) {
      const eventData = doc.data();
      let currentParticipants = eventData.participants || [];
      officialEvents.push({
        ...eventData,
        id: doc.id,
        label:
          fAuth.currentUser &&
          currentParticipants.includes(fAuth?.currentUser?.uid)
            ? "EDIT"
            : "RSVP",
        nop: currentParticipants.length,
      });
    }
    return officialEvents;
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchOfficialEvents EventCardService.js- ${error.message}`
    );
    throw error;
  }
};

export const fetchUserTypeDetails = async (uid) => {
  try {
    // Check if uid is valid
    if (!uid) {
      console.warn("Invalid User Id", uid);
      return {
        username: "",
        type: "",
      };
    }
    const userQuery = query(
      collection(db, users_collection),
      where("uid", "==", uid)
    );
    const userDocRef = await getDocs(userQuery);
    // const userDocID = userDocRef.docs[0].id;
    const userData = userDocRef.docs[0]?.data();
    return {
      username: userData?.username || "",
      type: userData?.Type || "",
    };
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchUserTypeDetails EventCardService.js- ${error.message}`
    );
    throw error;
  }
};

export const fetchUserDetails = async (uid) => {
  try {
    // Reference to the uid instead of the docid of the user.
    // Check if uid is valid
    if (!uid) {
      console.warn("Invalid User Id", uid);
      return {
        username: "",
        photoUrl: "",
      };
    }
    const userQuery = query(
      collection(db, users_collection),
      where("uid", "==", uid)
    );
    const userDocRef = await getDocs(userQuery);
    // const userDocID = userDocRef.docs[0].id;
    const userData = userDocRef.docs[0]?.data();
    return {
      username: userData?.username || "",
      photoUrl: userData?.photoUrl || "",
      userType: userData?.Type || "",
    };
    // reference for the userdoc
    // const userRef = doc(db, users_collection, userDocID);
    // const userDoc = await getDoc(userRef);
    // if (userDoc.exists()) {
    //   return {
    //     username: userDoc.data().username || "",
    //     photoUrl: userDoc.data().photoUrl || "",
    //   };
    // } else {
    //   console.error("No user found with uid:", uid);
    //   return "";
    // }
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchUserDetails EventCardService.js- ${error.message}`
    );
    throw error;
  }
};

export const fetchEventById = async (eventId) => {
  try {
    // Reference to the specific document in the outreach events collection
    const eventRef = doc(db, outreachEvents_collection, eventId);

    const eventSnap = await getDoc(eventRef);

    // Check if the document exists
    if (!eventSnap.exists()) {
      console.error("Event not found with id:", eventId);
      return null;
    }

    const eventData = eventSnap.data();

    const result = eventData.uid
      ? await fetchUserDetails(eventData.uid)
      : "Unknown User";
    const userName = result.username;
    const photoUrl = result.photoUrl;
    let currentParticipants = eventData.participants || [];
    const formattedDate = eventData.eventDate
      ? formatDate(new Date(eventData.eventDate.seconds * 1000))
      : "No Date";

    return {
      ...eventData,
      userName,
      eventDate: formattedDate,
      id: eventSnap.id,
      photoUrl,
      nop: currentParticipants.length,
      userType: result.userType,
    };
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchEventById EventCardService.js- ${error.message}`
    );
    throw error;
  }
};

export const isUserParticipantInEvent = async (eventId, userId) => {
  try {
    const eventRef = doc(db, outreachEvents_collection, eventId);
    const eventSnap = await getDoc(eventRef);

    if (!eventSnap.exists()) {
      console.warn(`Event with ID ${eventId} does not exist.`);
      return false;
    }

    const eventData = eventSnap.data();
    const participants = eventData.participants || [];

    return participants.includes(userId);
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `Error checking participant in event (${eventId}): ${error.message}`
    );
    throw error;
  }
};

export const fetchUserSignedUpOutreaches = async (uid) => {
  try {
    const fAuth = getAuth();
    const outreachQuery = query(collection(db, outreachEvents_collection));
    const snapshot = await getDocs(outreachQuery);

    let userSignedUpOutreaches = [];

    for (const doc of snapshot.docs) {
      const eventData = doc.data();
      if (eventData.participants && eventData.participants.includes(uid)) {
        const result = await fetchUserDetails(eventData.uid);
        const userName = result.username;
        const photoUrl = result.photoUrl;

        let currentParticipants = eventData.participants || [];
        userSignedUpOutreaches.push({
          ...eventData,
          userName: userName,
          id: doc.id,
          label:
            fAuth.currentUser &&
            currentParticipants.includes(fAuth?.currentUser?.uid)
              ? "EDIT"
              : "RSVP",
          nop: currentParticipants.length,
          photoUrl: photoUrl,
          userType: result.userType,
        });
      }
    }

    return userSignedUpOutreaches;
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchUserSignedUpOutreaches in EventCardService.js- ${error.message}`
    );
    throw error;
  }
};

export const handleRsvp = async (
  e,
  id,
  label,
  navigate,
  label2,
  setLabel2,
  isBMEFlow,
  refresh
) => {
  // check if button is going to RSVP or EDIT
  if (label2 === "RSVP") {
    e.preventDefault();
    const fAuth = getAuth();
    const currentUser = fAuth.currentUser;

    if (!currentUser) {
      navigate("/login");
      return;
    }
    // if user exists, check user.outreachevents, else navigate to login page.
    if (currentUser) {
      try {
        // reference for the event clicked on
        const eventRef = isBMEFlow
          ? doc(db, officialEvents_collection, id)
          : doc(db, outreachEvents_collection, id);
        // find the userdoc with uid of the current user
        const userQuery = query(
          collection(db, users_collection),
          where("uid", "==", fAuth?.currentUser?.uid)
        );
        const userDocRef = await getDocs(userQuery);
        const userDocID = userDocRef.docs[0].id;
        // reference for the userdoc
        const userRef = doc(db, users_collection, userDocID);
        // outreach event collection
        const docSnap = await getDoc(eventRef);
        // current participants in the eventdoc
        let currentParticipants = docSnap.data().participants || [];

        // current events in userdoc
        const userSnap = await getDoc(userRef);
        let currentEvents =
          (isBMEFlow
            ? userSnap.data().officialEvents
            : userSnap.data().outreachEvents) || [];

        // check if user exists in current participants and add if not
        if (currentParticipants.includes(fAuth.currentUser.uid)) {
        } else {
          const newParticipants = [
            ...currentParticipants,
            fAuth.currentUser.uid,
          ];
          console.log(newParticipants);
          const eventDocUpdate = isBMEFlow
            ? doc(db, officialEvents_collection, id)
            : doc(db, outreachEvents_collection, id);
          const updateRef = await updateDoc(eventDocUpdate, {
            participants: newParticipants,
          });
          console.log("successfully added to user to outreach collection");
          // alert('Signed up for event')
        }

        // check if event exists in current user and add if not
        if (currentEvents.includes(id)) {
          console.log("Event exists for this user");
          // alert("Event exists for this user");
        } else {
          const newEvents = [...currentEvents, id];
          const userDocUpdate = doc(db, users_collection, userDocID);
          if (isBMEFlow) {
            const userUpdateRef = await updateDoc(userDocUpdate, {
              officialEvents: newEvents,
            });
          } else {
            const userUpdateRef = await updateDoc(userDocUpdate, {
              outreachEvents: newEvents,
            });
          }

          logEvent(
            "STREET_CARE_INFO_OUTREACH",
            "RSVP added for user" + fAuth.currentUser.uid
          );

          console.log("successfully added outreach to users collection");
        }
        setLabel2("EDIT");
      } catch (error) {
        console.log(error);
        logEvent("STREET_CARE_ERROR", `error on rsvp- ${error.message}`);
        throw error;
      }
    } else {
      console.log("USER NOT FOUND!");
      navigate("/login");
    }
  } else {
    console.log("EDIT BUTTON");
    const fAuth = getAuth();
    const currentUser = fAuth.currentUser;

    if (!currentUser) {
      navigate("/login");
      return;
    }
    if (currentUser) {
      console.log("Found user");
      try {
        // reference for the event clicked on
        const eventRef = isBMEFlow
          ? doc(db, officialEvents_collection, id)
          : doc(db, outreachEvents_collection, id);
        // find the userdoc with uid of the current user
        const userQuery = query(
          collection(db, users_collection),
          where("uid", "==", fAuth?.currentUser?.uid)
        );
        const userDocRef = await getDocs(userQuery);
        const userDocID = userDocRef.docs[0].id;
        // reference for the userdoc
        const userRef = doc(db, users_collection, userDocID);
        // outreach event collection
        const docSnap = await getDoc(eventRef);
        // current participants in the eventdoc
        let currentParticipants = docSnap.data().participants || [];

        // current events in userdoc
        const userSnap = await getDoc(userRef);
        let currentEvents =
          (isBMEFlow
            ? userSnap.data().officialEvents
            : userSnap.data().outreachEvents) || [];

        // check if user exists in current participants and remove if exists
        if (currentParticipants.includes(fAuth.currentUser.uid)) {
          console.log("removing from event");
          const eventDocUpdate = isBMEFlow
            ? doc(db, officialEvents_collection, id)
            : doc(db, outreachEvents_collection, id);
          const i = currentParticipants.indexOf(fAuth.currentUser.uid);
          if (i > -1) {
            currentParticipants.splice(i, 1);
            const updateRef = await updateDoc(eventDocUpdate, {
              participants: currentParticipants,
            });
          }
        } else {
          console.log("User not found in the event");
        }

        // check if event exists in current user and remove if exists
        if (currentEvents.includes(id)) {
          console.log("removing from user");
          navigate(`/outreachsignup/${id}`);
          // alert('Withdrew from event');
          const userDocUpdate = doc(db, users_collection, userDocID);
          const i = currentEvents.indexOf(id);
          if (i > -1) {
            currentEvents.splice(i, 1);
            if (isBMEFlow) {
              const userUpdateRef = await updateDoc(userDocUpdate, {
                officialEvents: currentEvents,
              });
            } else {
              const userUpdateRef = await updateDoc(userDocUpdate, {
                outreachEvents: currentEvents,
              });
            }
            logEvent(
              "STREET_CARE_INFO_OUTREACH",
              "RSVP edited for user" + userDocID
            );
          }
        } else {
          console.log("event not found in the user");
        }
        setLabel2("RSVP");

        if (typeof refresh == "function") {
          refresh();
        }
      } catch (error) {
        console.log(error);
        logEvent("STREET_CARE_ERROR", `error on rsvp edit- ${error.message}`);
        throw error;
      }
    } else {
      navigate("/login", { replace: true });
    }
  }
};

export const fetchByCityOrState = async (searchValue, startDate, endDate) => {
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

    const pastOutreachRef = collection(db, outreachEvents_collection);
    // Full text search - Search filtering by City/State fields matching exact value

    const outreachByLocationQuery = query(
      pastOutreachRef,
      where("location.city", "==", searchValue),
      where("eventDate", ">=", startDate),
      where("eventDate", "<=", endDate)
    );

    const outreachDocRef = await getDocs(outreachByLocationQuery);

    console.log(outreachDocRef);

    let outreachByLoc = [];
    for (const doc of outreachDocRef.docs) {
      const pastOutreachData = doc.data();
      const id = doc.id;

      outreachByLoc.push({
        ...pastOutreachData,
        id: id,
      });
    }
    console.log(outreachByLoc);
    return outreachByLoc;
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchByCityOrState AllPastOrtreachEvents.js- ${error.message}`
    );
    throw error;
  }
};

//@code by Adarsh starts -------

export const fetchPastOutreaches = async () => {
  try {
    const pastOureachEventsRef = collection(
      db,
      outreachEvents_collection
    );
    const outreachDocRef = await getDocs(pastOureachEventsRef);

    const totaloutreaches = outreachDocRef.size;
    return totaloutreaches;
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchPastOutreachEvents EventCardService.js- ${error.message}`
    );
    throw error;
  }
};

export const fetchByCityOrStates = async (
  searchValue,
  startDate,
  endDate,
  curr_page,
  outreachPerPages
) => {
  try {
    const pastOureachEventsRef = collection(
      db,
      outreachEvents_collection
    );
    const outreachDocRef = await getDocs(pastOureachEventsRef);

    const totaloutreaches = outreachDocRef.size;
    // const totaloutreaches = count(outreachDocRef.data())
    // return totaloutreaches;
    if (
      !searchValue ||
      typeof searchValue !== "string" ||
      searchValue == "" ||
      searchValue == ""
    ) {
      const pastOutreachRef = query(
        collection(db, outreachEvents_collection),
        where("eventDate", ">=", startDate),
        where("eventDate", "<=", endDate),
        orderBy("eventDate", "desc")
      );
      const snapshots = await getDocs(pastOutreachRef);
      const tot = snapshots.size;
      console.log("tot:" + tot);

      if (tot != 0) {
        const start_Index = outreachPerPages * curr_page;
        const init_doc = snapshots.docs[start_Index];

        const outreachByLocationQuery = query(
          pastOutreachRef,
          startAt(init_doc),
          limit(outreachPerPages)
        );

        while (outreachPerPages < totaloutreaches) {
          const outreachDocRef = await getDocs(outreachByLocationQuery);
          let outreachByLoc = [];
          for (const doc of outreachDocRef.docs) {
            const pastOutreachData = doc.data();
            const result = await fetchUserDetails(pastOutreachData.uid);
            const userName = result.username;
            const photoUrl = result.photoUrl;
            const userType = result.userType;
            const id = doc.id;
            outreachByLoc.push({
              ...pastOutreachData,
              id: id,
              userName,
              photoUrl,
              userType,
            });
          }
          return { tot, outreachByLoc };
        }
      }

      console.error("No PastOutreaches available for the given date range");
      throw new Error(
        "No PastOutreaches available for the given date range and city"
      );
    }

    if (!(startDate instanceof Date) || isNaN(startDate)) {
      console.error("Invalid start date");
      return;
    }
    if (!(endDate instanceof Date) || isNaN(endDate)) {
      console.error("Invalid end date");
      return;
    }
    // const pastOutreachRef = collection(db, PAST_OUTREACH_EVENTS_COLLECTION);
    const pastOutreachRef = query(
      collection(db, outreachEvents_collection),
      where("location.city", "==", searchValue),
      where("eventDate", ">=", startDate),
      where("eventDate", "<=", endDate)
    );
    const snapshots = await getDocs(pastOutreachRef);
    const tot = snapshots.size;
    const start_Index = outreachPerPages * curr_page;
    const init_doc = snapshots.docs[start_Index];

    // Full text search - Search filtering by City/State fields matching exact value
    if (tot != 0) {

      const outreachByLocationQuery = query(
        pastOutreachRef,
        startAt(init_doc),
        limit(outreachPerPages)
      );

      while (outreachPerPages < totaloutreaches) {
        const outreachDocRef = await getDocs(outreachByLocationQuery);
        let outreachByLoc = [];
        for (const doc of outreachDocRef.docs) {
          const pastOutreachData = doc.data();
          const id = doc.id;
          outreachByLoc.push({
            ...pastOutreachData,
            id: id,
          });
        }
        return { tot, outreachByLoc };
      }
    }
    console.error(
      "No PastOutreaches available for the given date range and city"
    );
    throw new Error(
      "No PastOutreaches available for the given date range and city"
    );
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchByCityOrState AllPastOrtreachEvents.js- ${error.message}`
    );
    throw error;
  }
};

export const fetchUserOutreaches = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User is not logged in.");
    }

    const userQuery = query(
      collection(db, outreachEvents_collection),
      where("uid", "==", user.uid)
    );

    const eventSnapshot = await getDocs(userQuery);
    let userOutreaches = [];

    for (const doc of eventSnapshot.docs) {
      const eventData = doc.data();
      const result = await fetchUserDetails(eventData.uid);
      const userName = result.username;
      const photoUrl = result.photoUrl;

      let currentParticipants = eventData.participants || [];
      userOutreaches.push({
        ...eventData,
        userName: userName,
        id: doc.id,
        label: user && currentParticipants.includes(user.uid) ? "EDIT" : "RSVP",
        nop: currentParticipants.length,
        photoUrl: photoUrl,
        userType: result.userType,
      });
    }

    return userOutreaches;
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchUserOutreaches in EventCardService.js- ${error.message}`
    );
    throw error;
  }
};

export const fetchTopOutreaches = async () => {
  try {
    const outreachRef = collection(db, outreachEvents_collection);

    // // Create query to fetch the latest 6 records based on creation date
    const latestRecordsQuery = query(
      outreachRef,
      orderBy("eventDate", "desc"),
      limit(6)
    );

    const snapshots = await getDocs(latestRecordsQuery);

    let outreaches = [];
    for (const doc of snapshots.docs) {
      const outreachData = doc.data();
      const id = doc.id;
      const userName = await fetchUserName(outreachData.uid);
      outreaches.push({
        ...outreachData,
        userName: userName,
        id: id,
      });
    }
    console.log(outreaches);
    return outreaches;
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `Error in fetchLatestRecords - ${error.message}`
    );
    throw error;
  }
};

export async function fetchUnapprovedOutreaches() {
  const colRef = collection(db, outreachEvents_collection);

  const q = query(colRef, where("approved", "==", false));

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    console.log(
      `No unapproved documents found in '${outreachEvents_collection}'`
    );
    return [];
  }

  const unapprovedDocs = [];
  snapshot.forEach((doc) => {
    unapprovedDocs.push({ id: doc.id, ...doc.data() });
  });

  console.log(
    `Unapproved documents from '${outreachEvents_collection}':`,
    unapprovedDocs
  );
  return unapprovedDocs;
}

// fetchUnapprovedOutreaches();

export async function fetchUnapprovedPastOutreaches() {
  const colRef = collection(db, outreachEvents_collection);

  const q = query(colRef, where("approved", "==", "Unapproved"));

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    console.log(
      `No unapproved documents found in '${outreachEvents_collection}'`
    );
    return [];
  }

  const unapprovedDocs = [];
  snapshot.forEach((doc) => {
    unapprovedDocs.push({ id: doc.id, ...doc.data() });
  });

  console.log(
    `Unapproved documents from '${outreachEvents_collection}':`,
    unapprovedDocs
  );
  return unapprovedDocs;
}

// fetchUnapprovedPastOutreaches();

export const ToggleApproveStatus = async function (documentId) {
  try {
    const docRef = doc(db, outreachEvents_collection, documentId);
    const docSnap = await getDoc(docRef);

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
