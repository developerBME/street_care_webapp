import { collection, getDocs, getDoc, doc, updateDoc, query, where } from 'firebase/firestore';
import { db } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth"

export const fetchEvents = async () => {
    const eventCollection = collection(db, "outreachEvents");
    const eventSnapshot = await getDocs(eventCollection);
    let eventsData = [];
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
        const userName = await fetchUserName(eventData.uid);

        let currentParticipants = eventData.participants || [];
        if (fAuth.currentUser && currentParticipants.includes(fAuth?.currentUser?.uid)){
            eventsData.push({
                ...eventData,
                userName: userName,
                eventDate: formatDate(new Date(eventData.eventDate.seconds * 1000)),
                id: doc.id,
                label: "EDIT",
                nop: currentParticipants.length
            });
        } else {
            eventsData.push({
                ...eventData,
                userName: userName,
                eventDate: formatDate(new Date(eventData.eventDate.seconds * 1000)),
                id: doc.id,
                label: "RSVP",
                nop: currentParticipants.length
            });
        }
    }
    return eventsData;
}

export const fetchOfficialEvents = async () => {
    const officialEventsRef = collection(db, "officialEvents");
    const snapshot = await getDocs(officialEventsRef);
    const officialEvents = [];
    for (const doc of snapshot.docs) {
        const eventData = doc.data();
        officialEvents.push({
            ...eventData,
            eventDate: formatDate(new Date(eventData.eventDate.seconds * 1000)),
            id: doc.id,
            label:"RSVP"
        });
    }
    return officialEvents;
}

const fetchUserName = async (uid) => {
    // Reference to the uid instead of the docid of the user.
    const userQuery = query(
        collection(db, "users"),
        where("uid", "==", uid)
      );
    const userDocRef = await getDocs(userQuery);
    const userDocID = userDocRef.docs[0].id;
    // reference for the userdoc
    const userRef = doc(db, "users", userDocID);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        return userDoc.data().username || ''; 
    } else {
        console.error("No user found with uid:", uid);
        return ''; 
    }
}


export const fetchUserEvents = async (uid) => {
    const userQuery = query(
        collection(db, "users"),
        where("uid", "==", uid)
      );
    const userDocRef = await getDocs(userQuery);
    const userDocID = userDocRef.docs[0].id;
    // reference for the userdoc
    const userRef = doc(db, "users", userDocID);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
        console.error("User not found:", uid);
        return [];
    }

    const eventIds = userDoc.data().outreachEvents || [];
    const eventsData = [];

    for (let eventId of eventIds) {
        const eventRef = doc(db, "outreachEvents", eventId);
        const eventDoc = await getDoc(eventRef);
        if (eventDoc.exists()) {
            const eventData = eventDoc.data();
            eventsData.push({
                ...eventData,
                id: eventDoc.id,
                eventDate: formatDate(new Date(eventData.eventDate.seconds * 1000))
            });
        }
    }

    return eventsData;
}

export function formatDate(dateObj) {
    // Extract date parts manually for custom format
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    
    const month = monthNames[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const weekday = days[dateObj.getDay()];
    
    // Extract hours, minutes, and the AM/PM part
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  
    return `${month} ${day}, ${year} ${weekday} ${formattedTime}`;
  }


export const handleRsvp = async (e, id, label, navigate) => {
    
    // check if button is going to RSVP or EDIT
    if (label === 'RSVP'){
    e.preventDefault();
    const fAuth = getAuth();

    // if user exists, check user.outreachevents, else navigate to login page.
    onAuthStateChanged(fAuth, async (user) => {
        if (user) {
            try {
                // reference for the event clicked on
                const eventRef = doc(db, "outreachEvents", id);
                // find the userdoc with uid of the current user
                const userQuery = query(
                    collection(db, "users"),
                    where("uid", "==", fAuth?.currentUser?.uid)
                  );
                const userDocRef = await getDocs(userQuery);
                const userDocID = userDocRef.docs[0].id;
                // reference for the userdoc
                const userRef = doc(db, "users", userDocID);
                // outreach event collection
                const docSnap = await getDoc(eventRef);
                // current participants in the eventdoc
                let currentParticipants = docSnap.data().participants || [];
                
                // current events in userdoc
                const userSnap = await getDoc(userRef);
                let currentEvents = userSnap.data().outreachEvents || [];

                // check if user exists in current participants and add if not
                if (currentParticipants.includes(fAuth.currentUser.uid)){
                } else {
                    const newParticipants = [...currentParticipants, fAuth.currentUser.uid];
                    console.log(newParticipants);
                    const eventDocUpdate = doc(db, "outreachEvents", id);
                    const updateRef = await updateDoc(eventDocUpdate, {
                        participants: newParticipants,
                      });
                    console.log("successfully added to user to outreach collection")
                }

                // check if event exists in current user and add if not 
                if (currentEvents.includes(id)){
                    console.log("Event exists for this user")
                } else {
                    const newEvents = [...currentEvents,id];
                    const userDocUpdate = doc(db, "users", userDocID);
                    const userUpdateRef = await updateDoc(userDocUpdate, {
                        outreachEvents: newEvents,
                      });
                    console.log("successfully added outreach to users collection")
                }
            } catch (error) {
              console.log(error)
            }
        } else {
            console.log("USER NOT FOUND!");
            navigate("/login", { replace: true });
        }
    });
} else {
    console.log("EDIT BUTTON")
    const fAuth = getAuth();
    onAuthStateChanged(fAuth, async (user) => {
        if (user) {
            console.log("Found user");
            try {
                // reference for the event clicked on
                const eventRef = doc(db, "outreachEvents", id);
                // find the userdoc with uid of the current user
                const userQuery = query(
                    collection(db, "users"),
                    where("uid", "==", fAuth?.currentUser?.uid)
                  );
                const userDocRef = await getDocs(userQuery);
                const userDocID = userDocRef.docs[0].id;
                // reference for the userdoc
                const userRef = doc(db, "users", userDocID);
                // outreach event collection
                const docSnap = await getDoc(eventRef);
                // current participants in the eventdoc
                let currentParticipants = docSnap.data().participants || [];
                
                // current events in userdoc
                const userSnap = await getDoc(userRef);
                let currentEvents = userSnap.data().outreachEvents || [];

                // check if user exists in current participants and remove if exists
                if (currentParticipants.includes(fAuth.currentUser.uid)){
                    console.log("removing from event")
                    const eventDocUpdate = doc(db, "outreachEvents", id);
                    const i = currentParticipants.indexOf(fAuth.currentUser.uid)
                    if (i > -1){
                        currentParticipants.splice(i,1);
                        const updateRef = await updateDoc(eventDocUpdate, {
                            participants: currentParticipants,
                          });
                    }
                } else {
                    console.log("User not found in the event")
                }

                // check if event exists in current user and remove if exists
                if (currentEvents.includes(id)){
                    console.log("removing from user")
                    const userDocUpdate = doc(db, "users", userDocID);
                    const i = currentEvents.indexOf(id)
                    if (i > -1){
                        currentEvents.splice(i,1);
                        const userUpdateRef = await updateDoc(userDocUpdate, {
                            outreachEvents: currentEvents,
                          });
                        }
                } else {
                    console.log("event not found in the user")
                }
            } catch (error) {
              console.log(error)
            }
        } else {
            navigate("/login", { replace: true });
        }
    });
    
}
}