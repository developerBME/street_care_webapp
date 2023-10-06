import React, { useState, useEffect } from "react";
import userImg from "../../images/user.jpeg"
import verifiedImg from "../../images/verified_purple.png"
import wavingHand from "../../images/waving_hand.png"
import CustomButton from "../Buttons/CustomButton";
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from "../firebase"; // Importing the auth instance

const OutreachEventCard = () => {
    // const { name, eventName, eventDate, location, req } = cardData
    const [events, setEvents] = useState([]);

    useEffect(() => {
      const fetchEvents = async () => {
        const eventCollection = collection(db, "outreachEvents");
        const eventSnapshot = await getDocs(eventCollection);
        let eventsData = [];

            for (const doc of eventSnapshot.docs) {
                const eventData = doc.data();
                const userName = await fetchUserName(eventData.uid);
                eventsData.push({
                    ...eventData,
                    userName: userName,
                    id: doc.id
                });
            }

          // Sort the events based on the eventDate (from soonest to latest)
          eventsData.sort((date1, date2) => {
              const date_1 = new Date(date1.eventDate.seconds * 1000);
              const date_2 = new Date(date2.eventDate.seconds * 1000);
              return date_1 - date_2;
          });

            setEvents(eventsData);
      };
  
      fetchEvents();
    }, []);

    // Fetch user's name from `users` collection based on `uid`
    const fetchUserName = async (uid) => {
        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            return userDoc.data().username || ''; // Return the user's name
        } else {
            console.error("No user found with uid:", uid);
            return '';  // Return an empty string if user not found
        }
    }
  
    function formatDate(dateObj) {
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
    
  
    return (
        <>
            {events.map(event => (
                <div className="bg-[#F5EEFE] w-[340px] lg:w-full rounded-2xl mb-4">
                    <div className="inline-flex items-center px-5 pt-6 pb-3 space-x-2">
                        <img src={userImg} className="w-8 h-8 rounded-full" />
                        <div className="font-normal font-['Inter'] text-[13px] ">{event.userName}</div>
                        <img src={verifiedImg} className="w-5 h-5" />
                    </div>
                    <div className="px-5 py-2 space-y-2 w-full">
                        <div className="font-medium text-[16px] font-bricolage">{event.title}</div>
                        <div className="font-semibold font-['Inter'] text-[12px] text-[#37168B]">{formatDate(new Date(event.eventDate.seconds * 1000))}</div>
                        <div className="font-normal font-['Inter'] text-[#444746] text-[12px]">{event.location.add1}, {event.location.add2}, {event.location.state}, {event.location.zipcode}</div>
                        <div className="w-full inline-flex items-center bg-white px-4 py-2 space-x-2.5 rounded-2xl">
                            <img src={wavingHand} />
                            <div className="font-normal font-['Inter'] text-[12px] text-[#181818]">{event.helpType}</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-5 pt-2 pb-4 gap-16">
                        <CustomButton label="RSVP" name="buttonlight" />
                        <div className="font-normal font-['Inter'] text-[12px]">Open Spots: {event.totalSlots - event.interests}/{event.totalSlots}</div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default OutreachEventCard