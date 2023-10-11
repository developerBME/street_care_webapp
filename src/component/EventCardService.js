import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from "./firebase";


export const fetchEvents = async () => {
    const eventCollection = collection(db, "outreachEvents");
    const eventSnapshot = await getDocs(eventCollection);
    let eventsData = [];

    for (const doc of eventSnapshot.docs) {
        const eventData = doc.data();
        const userName = await fetchUserName(eventData.uid);
        eventsData.push({
            ...eventData,
            userName: userName,
            eventDate: formatDate(new Date(eventData.eventDate.seconds * 1000)),
            id: doc.id
        });
    }

    return eventsData;
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
