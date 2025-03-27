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
  or,
 } from "firebase/firestore";
 import { db } from "./firebase";
 import { getAuth, onAuthStateChanged } from "firebase/auth";
 import logEvent from "./FirebaseLogger";
 import { Timestamp } from 'firebase/firestore';
 import { fetchUserName, formatDate, getNumberOfPages } from "./HelperFunction";
 
 const OFFICIAL_EVENTS_COLLECTION = "officialEvents";
 const OUTREACH_EVENTS_COLLECTION = "outreachEventsDev";
 const PAST_OUTREACH_EVENTS_COLLECTION = "outreachEventsDev";
// const PAST_OUTREACH_EVENTS_COLLECTION = "pastOutreachEvents";
 const USERS_COLLECTION = "users";
 // const PERSONAL_VISIT_LOG = "personalVisitLog";
 
 
 export const fetchEvents = async () => {
  try {
    const oureachEventsRef = collection(db, OUTREACH_EVENTS_COLLECTION);
    const approvedEventsQuery = query(
      oureachEventsRef,
      where("status", "==", "approved")
    );
    const eventSnapshot = await getDocs(approvedEventsQuery);

    // Collecting all unique user IDs
    const userIds = new Set();
    // eventSnapshot.docs.forEach((doc) => userIds.add(doc.data().uid));
    eventSnapshot.docs.forEach((doc) => {
      const uid = doc.data().uid;
      if (uid) {
        userIds.add(uid);
      } else {
        console.log('Document missing uid:', doc.id);
      }
    });
    // Batch fetch user details
    const userDetails = await fetchUserDetailsBatch(Array.from(userIds));

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

    return outreachEvents;
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchEvents in EventCardService.js- ${error.message}`
    );
    throw error;
  }
};

export async function calculateNumberOfPagesForOutreach(outreachesPerPage) {
  return getNumberOfPages(outreachesPerPage, OUTREACH_EVENTS_COLLECTION);
}

export async function fetchUserDetailsBatch(userIds) {
  const userDetails = {};
  // Firestore limits 'in' queries to 10 items
  const chunks = splitArrayIntoChunksOfLen(userIds, 10);

  for (const chunk of chunks) {
    const userQuery = query(
      collection(db, USERS_COLLECTION),
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

export const fetchPastOutreachEvents = async () => {
  try {
    const pastOureachEventsRef = collection(
      db,
      PAST_OUTREACH_EVENTS_COLLECTION
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
    const officialEventsRef = collection(db, OFFICIAL_EVENTS_COLLECTION);
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
      collection(db, USERS_COLLECTION),
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
      collection(db, USERS_COLLECTION),
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
    // const userRef = doc(db, USERS_COLLECTION, userDocID);
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
    const eventRef = doc(db, OUTREACH_EVENTS_COLLECTION, eventId);

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
    const eventRef = doc(db, OUTREACH_EVENTS_COLLECTION, eventId);
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
    const outreachQuery = query(collection(db, OUTREACH_EVENTS_COLLECTION));
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
          ? doc(db, OFFICIAL_EVENTS_COLLECTION, id)
          : doc(db, OUTREACH_EVENTS_COLLECTION, id);
        // find the userdoc with uid of the current user
        const userQuery = query(
          collection(db, USERS_COLLECTION),
          where("uid", "==", fAuth?.currentUser?.uid)
        );
        const userDocRef = await getDocs(userQuery);
        const userDocID = userDocRef.docs[0].id;
        // reference for the userdoc
        const userRef = doc(db, USERS_COLLECTION, userDocID);
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
            ? doc(db, OFFICIAL_EVENTS_COLLECTION, id)
            : doc(db, OUTREACH_EVENTS_COLLECTION, id);
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
          const userDocUpdate = doc(db, USERS_COLLECTION, userDocID);
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
          ? doc(db, OFFICIAL_EVENTS_COLLECTION, id)
          : doc(db, OUTREACH_EVENTS_COLLECTION, id);
        // find the userdoc with uid of the current user
        const userQuery = query(
          collection(db, USERS_COLLECTION),
          where("uid", "==", fAuth?.currentUser?.uid)
        );
        const userDocRef = await getDocs(userQuery);
        const userDocID = userDocRef.docs[0].id;
        // reference for the userdoc
        const userRef = doc(db, USERS_COLLECTION, userDocID);
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
            ? doc(db, OFFICIAL_EVENTS_COLLECTION, id)
            : doc(db, OUTREACH_EVENTS_COLLECTION, id);
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
          const userDocUpdate = doc(db, USERS_COLLECTION, userDocID);
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

    const pastOutreachRef = collection(db, PAST_OUTREACH_EVENTS_COLLECTION);
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
      PAST_OUTREACH_EVENTS_COLLECTION
    );
    const outreachDocRef = await getDocs(pastOureachEventsRef);

    const totaloutreaches = outreachDocRef.size;
    // const totaloutreaches = count(outreachDocRef.data())
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
      PAST_OUTREACH_EVENTS_COLLECTION
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
        collection(db, PAST_OUTREACH_EVENTS_COLLECTION),
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

        const userIds = new Set();
        snapshots.docs.forEach((doc) => {
          const uid = doc.data().uid;
          if (uid) {
            userIds.add(uid);
          } else {
            console.log('Document missing uid:', doc.id);
          }
        });
        // Batch fetch user details
        const userDetails = await fetchUserDetailsBatch(Array.from(userIds));

        while (outreachPerPages < totaloutreaches) {
          const outreachDocRef = await getDocs(outreachByLocationQuery);
          console.log("Test7:");
          // console.log('outreachDocRef:'+outreachDocRef);
          let outreachByLoc = [];
          for (const doc of outreachDocRef.docs) {
            const pastOutreachData = doc.data();
            const id = doc.id;
            // console.log('id wrt loc: '+id);
            outreachByLoc.push({
              ...pastOutreachData,
              userName: userDetails[pastOutreachData.uid]?.username || "",
              userType: userDetails[pastOutreachData.uid]?.userType || "",
              id: id,
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
      collection(db, PAST_OUTREACH_EVENTS_COLLECTION),
      where("location.city", "==", searchValue),
      where("eventDate", ">=", startDate),
      where("eventDate", "<=", endDate)
    );
    const snapshots = await getDocs(pastOutreachRef);
    const tot = snapshots.size;
    console.log("total snapshots:" + tot);
    const start_Index = outreachPerPages * curr_page;
    const init_doc = snapshots.docs[start_Index];

    // Full text search - Search filtering by City/State fields matching exact value
    if (tot != 0) {
      console.log("Test1:");

      const outreachByLocationQuery = query(
        pastOutreachRef,
        startAt(init_doc),
        limit(outreachPerPages)
      );

      while (outreachPerPages < totaloutreaches) {
        const outreachDocRef = await getDocs(outreachByLocationQuery);
        console.log("Test2:");
        // console.log('outreachDocRef:'+outreachDocRef);
        let outreachByLoc = [];
        for (const doc of outreachDocRef.docs) {
          const pastOutreachData = doc.data();
          const id = doc.id;
          // console.log('id wrt loc: '+id);
          outreachByLoc.push({
            ...pastOutreachData,
            // userName: userDetails[pastOutreachData.uid]?.username || "",
            // userType: userDetails[pastOutreachData.uid]?.userType || "",
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
    // console.log('outreachByLoc: '+outreachByLoc);
  } catch (error) {
    logEvent(
      "STREET_CARE_ERROR",
      `error on fetchByCityOrState AllPastOrtreachEvents.js- ${error.message}`
    );
    throw error;
  }
};
/* 
const cityToSearch = ""; 
const startDateTime = new Date("2020-07-01"); 
const endDateTime = new Date("2023-07-01");
const curr_page=0;
const outreachPerPages = 5;


(async () => {
try {
  // const totaloutreaches = await fetchPastOutreaches()
  const outreachByLocation = await fetchByCityOrStates(cityToSearch, startDateTime, endDateTime, curr_page, outreachPerPages);
  console.log("Fetched outreach data:", outreachByLocation);
  // console.log('fetchPastOutreaches: '+ await fetchPastOutreaches());

} catch (error) {
  console.error("Error fetching outreach data:", error);
}
})();

*/
// const test1 = await ('Ottawa','07/24/2021', '09/24/2021');

// code by Adarsh ends..................

export const fetchUserOutreaches = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User is not logged in.");
    }

    const userQuery = query(
      collection(db, OUTREACH_EVENTS_COLLECTION),
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

//  export async function calculateNumberOfPagesForOutreach(outreachPerPage, currentPage=0){
//   const testoutreachRef = query(collection(db, PAST_OUTREACH_EVENTS_COLLECTION), orderBy("createdAt", "asc"));
//   const snapshot = await getDocs(testoutreachRef);
//   // console.log('Data : '+snapshot.docs);
//   const startIndex = outreachPerPage*currentPage;
//   const startDoc = snapshot.docs[startIndex];
//   // console.log('starting is: '+ startDoc);

//   // const firstdoc=snapshot.docs(startAt);
//   // console.log('starting is: '+ firstdoc);

//   const outreachRef = query(collection(db, PAST_OUTREACH_EVENTS_COLLECTION),  orderBy("createdAt", "asc"), startAt(startDoc), limit(outreachPerPage))

//   const outres = await getDocs(outreachRef);
//   // console.log('outres '+ outres.docs);
//   outres.forEach((doc)=>{
//     // console.log(doc.data());
//   //   console.log(doc.id); //printing the pagination ids
//   });
//   return outres;

//  }

//  const test = await calculateNumberOfPagesForOutreach(5,0)

export const fetchTopOutreaches = async () => {
  try {
    const outreachRef = collection(db, OUTREACH_EVENTS_COLLECTION);

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

//  const testlatestfunc = await fetchTopOutreaches();
//  console.log(testlatestfunc);

export async function fetchUnapprovedOutreaches() {
  const colRef = collection(db, OUTREACH_EVENTS_COLLECTION);

  const q = query(colRef, where("approved", "==", false));

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    console.log(
      `No unapproved documents found in '${OUTREACH_EVENTS_COLLECTION}'`
    );
    return [];
  }

  const unapprovedDocs = [];
  snapshot.forEach((doc) => {
    unapprovedDocs.push({ id: doc.id, ...doc.data() });
  });

  console.log(
    `Unapproved documents from '${OUTREACH_EVENTS_COLLECTION}':`,
    unapprovedDocs
  );
  return unapprovedDocs;
}

// fetchUnapprovedOutreaches();

export async function fetchUnapprovedPastOutreaches() {
  const colRef = collection(db, PAST_OUTREACH_EVENTS_COLLECTION);

  const q = query(colRef, where("approved", "==", "Unapproved"));

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    console.log(
      `No unapproved documents found in '${PAST_OUTREACH_EVENTS_COLLECTION}'`
    );
    return [];
  }

  const unapprovedDocs = [];
  snapshot.forEach((doc) => {
    unapprovedDocs.push({ id: doc.id, ...doc.data() });
  });

  console.log(
    `Unapproved documents from '${PAST_OUTREACH_EVENTS_COLLECTION}':`,
    unapprovedDocs
  );
  return unapprovedDocs;
}

// fetchUnapprovedPastOutreaches();

export const ToggleApproveStatus = async function (documentId) {
  try {
    const docRef = doc(db, OUTREACH_EVENTS_COLLECTION, documentId);
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