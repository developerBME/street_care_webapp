import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const OFFICIAL_EVENTS_COLLECTION = "officialEvents";
const OUTREACH_EVENTS_COLLECTION = "outreachEvents";
const USERS_COLLECTION = "users";

export const fetchEvents = async () => {
  const oureachEventsRef = collection(db, OUTREACH_EVENTS_COLLECTION);
  const eventSnapshot = await getDocs(oureachEventsRef);
  let outreachEvents = [];
  const fAuth = getAuth();
  onAuthStateChanged(fAuth, (user) => {
    if (user) {
      console.log("Found user");
    } else {
      console.log("USER NOT FOUND!");
    }
  });
  for (const doc of eventSnapshot.docs) {
    const eventData = doc.data();
    const result = await fetchUserDetails(eventData.uid);
    const userName = result.username;
    const photoUrl = result.photoUrl;

    let currentParticipants = eventData.participants || [];
    outreachEvents.push({
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
    });
  }
  return outreachEvents;
};

export const fetchOfficialEvents = async () => {
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
};

export const fetchnewsEvents = async () => {

  const NewsCardData = [
    {
      NewsTitle:
        "Military Families event for Street Care on Giving Tuesday, 12/1!",
      NewsDate: "Sep 1,2022",
      NewsContent: "Teams of military families will make care kits for us.",
    },
    {
      NewsTitle: "Thank You to Maryland Team who helps Street Care Monthly!",
      NewsDate: "Jan 18,2022",
      NewsContent:
        "Our Maryland Team is out on the streets in the greater Baltimore area monthly helping those homeless in need",
    },
    {
      NewsTitle: "Thank You to the United Methodist Church for Grant!",
      NewsDate: "Jan 18,2022",
      NewsContent:
        "Thank You to the United Methodist church (Baltimore-Washington DC) for rewarding BME Maryland partners with a grant for SC",
    },
    {
      NewsTitle:
        "Military Families event for Street Care on Giving Tuesday, 12/1!",
      NewsDate: "Sep 1,2022",
      NewsContent: "Teams of military families will make care kits for us.",
    },
    {
      NewsTitle: "Thank You to Maryland Team who helps Street Care Monthly!",
      NewsDate: "Jan 18,2022",
      NewsContent:
        "Our Maryland Team is out on the streets in the greater Baltimore area monthly helping those homeless in need",
    },
    {
      NewsTitle: "Thank You to the United Methodist Church for Grant!",
      NewsDate: "Jan 18,2022",
      NewsContent:
        "Thank You to the United Methodist church (Baltimore-Washington DC) for rewarding BME Maryland partners with a grant for SC",
    },
    {
      NewsTitle:
        "Military Families event for Street Care on Giving Tuesday, 12/1!",
      NewsDate: "Sep 1,2022",
      NewsContent: "Teams of military families will make care kits for us.",
    },
    {
      NewsTitle: "Thank You to Maryland Team who helps Street Care Monthly!",
      NewsDate: "Jan 18,2022",
      NewsContent:
        "Our Maryland Team is out on the streets in the greater Baltimore area monthly helping those homeless in need",
    },
    {
      NewsTitle: "Thank You to the United Methodist Church for Grant!",
      NewsDate: "Jan 18,2022",
      NewsContent:
        "Thank You to the United Methodist church (Baltimore-Washington DC) for rewarding BME Maryland partners with a grant for SC",
    },
    
  ];


  return NewsCardData;
}

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

const fetchUserDetails = async (uid) => {
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
    return {
      username: userDoc.data().username || "",
      photoUrl: userDoc.data().photoUrl || ""
  };
  } else {
    console.error("No user found with uid:", uid);
    return "";
  }
};

export const fetchEventById = async (eventId) => {
  // Reference to the specific document in the outreach events collection
  const eventRef = doc(db, OUTREACH_EVENTS_COLLECTION, eventId);
  
  const eventSnap = await getDoc(eventRef);
  
  // Check if the document exists
  if (!eventSnap.exists()) {
      console.error("Event not found with id:", eventId);
      return null;
  }
  
  const eventData = eventSnap.data();
  
  const result = eventData.uid ? await fetchUserDetails(eventData.uid) : "Unknown User";
  const userName = result.username;
  const photoUrl = result.photoUrl;
  let currentParticipants = eventData.participants || [];
  const formattedDate = eventData.eventDate ? formatDate(new Date(eventData.eventDate.seconds * 1000)) : "No Date";

  return {
      ...eventData,
      userName,
      eventDate: formattedDate,
      id: eventSnap.id,
      photoUrl,
      nop: currentParticipants.length,
  };
};


export const fetchUserEvents = async (uid) => {
  const userQuery = query(
    collection(db, USERS_COLLECTION),
    where("uid", "==", uid)
  );
  const userDocRef = await getDocs(userQuery);
  const userDocID = userDocRef.docs[0].id;
  // reference for the userdoc
  const userRef = doc(db, USERS_COLLECTION, userDocID);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    console.error("User not found:", uid);
    return [];
  }

  const eventIds = userDoc.data().outreachEvents || [];
  const eventsData = [];

  for (let eventId of eventIds) {
    const eventRef = doc(db, OUTREACH_EVENTS_COLLECTION, eventId);
    const eventDoc = await getDoc(eventRef);
    if (eventDoc.exists()) {
      const eventData = eventDoc.data();
      eventsData.push({
        ...eventData,
        id: eventDoc.id
      });
    }
  }

  return eventsData;
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

    // if user exists, check user.outreachevents, else navigate to login page.
    onAuthStateChanged(fAuth, async (user) => {
      if (user) {
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
          }

          // check if event exists in current user and add if not
          if (currentEvents.includes(id)) {
            console.log("Event exists for this user");
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

            console.log("successfully added outreach to users collection");
          }
          setLabel2("EDIT");
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("USER NOT FOUND!");
        navigate("/login", { replace: true });
      }
    });
  } else {
    console.log("EDIT BUTTON");
    const fAuth = getAuth();
    onAuthStateChanged(fAuth, async (user) => {
      if (user) {
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
            }
          } else {
            console.log("event not found in the user");
          }
          setLabel2("RSVP");
          if (typeof refresh == "function"){
            refresh();
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        navigate("/login", { replace: true });
      }
    });
  }
};
