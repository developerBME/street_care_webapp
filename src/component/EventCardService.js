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
        let currentParticipants = eventData.participants;
        const userName = await fetchUserName(eventData.uid);

        // Fix this 

        

        if (currentParticipants && fAuth.currentUser){

            const userQuery = query(
            collection(db, "users"),
            where("uid", "==", fAuth?.currentUser?.uid)
            );
            const userDocRef = await getDocs(userQuery);
            const userDocID = userDocRef.docs[0].id;
            
            if (currentParticipants.includes(userDocID)) {
            eventsData.push({
                ...eventData,
                userName: userName,
                eventDate: formatDate(new Date(eventData.eventDate.seconds * 1000)),
                id: doc.id,
                label: "EDIT"
            });
            }
            else{
                eventsData.push({
                    ...eventData,
                    userName: userName,
                    eventDate: formatDate(new Date(eventData.eventDate.seconds * 1000)),
                    id: doc.id,
                    label: "RSVP"
                });
            }
        } else {
            eventsData.push({
                ...eventData,
                userName: userName,
                eventDate: formatDate(new Date(eventData.eventDate.seconds * 1000)),
                id: doc.id,
                label: "RSVP"
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
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        return userDoc.data().username || ''; 
    } else {
        console.error("No user found with uid:", uid);
        return ''; 
    }
}


export const fetchUserEvents = async (uid) => {
    const userRef = doc(db, "users", uid);
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
    
    if (label === 'RSVP'){
    e.preventDefault();
    const fAuth = getAuth();
    onAuthStateChanged(fAuth, async (user) => {
        if (user) {
            console.log("Found user");

            try {
                const ref = doc(db, "outreachEvents", id);
        
                const userQuery = query(
                    collection(db, "users"),
                    where("uid", "==", fAuth?.currentUser?.uid)
                  );
                const userDocRef = await getDocs(userQuery);
                const userDocID = userDocRef.docs[0].id;
                console.log(userDocID)
                const userRef = doc(db, "users", userDocID);
        
                // const userRef = doc(db,"users",fAuth.currentUser.uid);
        
                // console.log(userQuery)
                // console.log("posting to db")
                // console.log(helpType)
                // const docSnap = await getDocs(userQuery);

                // outreach event collection
                const docSnap = await getDoc(ref);
                let currentParticipants = docSnap.data().participants || [];
                
                // users collection
                const userSnap = await getDoc(userRef);
                let currentEvents = userSnap.data().outreachEvents || [];
                // console.log(currentParticipants)
                // console.log(currentEvents)
        
                if (currentParticipants.includes(userDocID)){
                    console.log("user exists in event")
                    const newParticipants = [...currentParticipants];
                    console.log(newParticipants)
                } else {
                    const newParticipants = [...currentParticipants, userDocID];
                    console.log(newParticipants);
                    const eventDocUpdate = doc(db, "outreachEvents", id);
                    const updateRef = await updateDoc(eventDocUpdate, {
                        participants: newParticipants,
                      });
                    console.log("successfully added to outreach events collection");
                }
        
                if (currentEvents.includes(id)){
                    console.log("Event exists for this user")
                } else {
                    const newEvents = [...currentEvents,id];
                    const userDocUpdate = doc(db, "users", userDocID);
                    const userUpdateRef = await updateDoc(userDocUpdate, {
                        outreachEvents: newEvents,
                      });
                    console.log("successfully added to outreach users collection")
                }
        
                // if (docSnap.exists()) {
                //     // No need to update, just leave a logged in state
                //     console.log("Update can be done");
                //     console.log(docSnap.data().participants);
                //     // console.log("Document data:", docSnap.data());
                //   } else {
                //     console.log("not found")
                //   }
                // const updateRef = await updateDoc(eventDocUpdate, {
                //     participants: [...participants],
                //   });
        
                // const userDocID = docSnap.docs[0].id;
                // console.log(userDocID)
        
                // docSnap.forEach((doc) => {
                //     // doc.data() is never undefined for query doc snapshots
                //     console.log(doc.id, " => ", doc.data().participants);
                //   });
            } catch (error) {
              console.log(error)
            }

        } else {
            console.log("USER NOT FOUND!");
            navigate("/login", { replace: true });
        }
    });

    // console.log("user id ", fAuth.currentUser.uid)
    // console.log("doc id ", id);
    // const ref = query(collection(db, "outreachEvents"),where('id', '==',id));
    // try {
    //     const ref = doc(db, "outreachEvents", id);

    //     const userQuery = query(
    //         collection(db, "users"),
    //         where("uid", "==", fAuth?.currentUser?.uid)
    //       );
    //     const userDocRef = await getDocs(userQuery);
    //     const userDocID = userDocRef.docs[0].id;
    //     const userRef = doc(db, "users", userDocID);

    //     // const userRef = doc(db,"users",fAuth.currentUser.uid);

    //     // console.log(userQuery)
    //     // console.log("posting to db")
    //     // console.log(helpType)
    //     // const docSnap = await getDocs(userQuery);
    //     const docSnap = await getDoc(ref);
    //     let currentParticipants = docSnap.data().participants || [];
    //     const userSnap = await getDoc(userRef);
    //     console.log(userSnap)
    //     let currentEvents = userSnap.data().outreachEvents;
    //     console.log(currentParticipants)

    //     if (currentParticipants.includes(fAuth.currentUser.uid)){
    //         console.log("already present")
    //         const newParticipants = [...currentParticipants];
    //         console.log(newParticipants)
    //     } else {
    //         console.log("to be added")
    //         const newParticipants = [...currentParticipants, fAuth.currentUser.uid];
    //         console.log(newParticipants);
    //         const eventDocUpdate = doc(db, "outreachEvents", id);
    //         const updateRef = await updateDoc(eventDocUpdate, {
    //             participants: newParticipants,
    //           });
    //     }

    //     if (!currentEvents){
    //         const newEvents = [id];
    //         const userDocUpdate = doc(db, "users", fAuth.currentUser.uid);
    //         const userUpdateRef = await updateDoc(userDocUpdate, {
    //             outreachEvents: newEvents,
    //           }); 
    //     } else if (currentEvents && currentEvents.includes(id)){
    //         console.log("Event exists in user collection")
    //     } else {
    //         const newEvents = [...currentEvents,id];
    //         const userDocUpdate = doc(db, "users", fAuth.currentUser.uid);
    //         const userUpdateRef = await updateDoc(userDocUpdate, {
    //             outreachEvents: newEvents,
    //           }); 
    //     }

    //     // if (docSnap.exists()) {
    //     //     // No need to update, just leave a logged in state
    //     //     console.log("Update can be done");
    //     //     console.log(docSnap.data().participants);
    //     //     // console.log("Document data:", docSnap.data());
    //     //   } else {
    //     //     console.log("not found")
    //     //   }
    //     // const updateRef = await updateDoc(eventDocUpdate, {
    //     //     participants: [...participants],
    //     //   });

    //     // const userDocID = docSnap.docs[0].id;
    //     // console.log(userDocID)

    //     // docSnap.forEach((doc) => {
    //     //     // doc.data() is never undefined for query doc snapshots
    //     //     console.log(doc.id, " => ", doc.data().participants);
    //     //   });
    // } catch (error) {
    //   console.log(error)
    // }
  } else {
    console.log("EDIT BUTTON")
  }
}