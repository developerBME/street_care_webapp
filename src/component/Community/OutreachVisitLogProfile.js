import React, { useState, useEffect } from "react";
import OutreachVisitLogCard from "./OutreachVisitLogCard";
import { fetchEvents } from "../EventCardService";
import { fetchVisitLogs } from "../VisitLogCardService";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
   
const OutreachVisitLogProfile = () => {  

  const [visibleItems, setVisibleItems] = useState(3);
  const loadMore = () => {
    setVisibleItems((prev) => prev + 3);
  };

  const cardData = [
    {
      userName: "William Smith",
      title: "BK Fort Green Outreach",
      eventDate: "Sept 9, 2023 SAT 5:00pm",
      location: {
        street: "200 Eastern Pkwy",
        city: "Brooklyn",
        state: "NY",
        zipcode: "11238",
      },
      helpType: "Childcare Specialist needed",
      totalSlots: 20,
      interests: 5,
    },
    {
      userName: "William Smith",
      title: "BK Fort Green Outreach",
      eventDate: "Sept 9, 2023 SAT 5:00pm",
      location: {
        street: "200 Eastern Pkwy",
        city: "Brooklyn",
        state: "NY",
        zipcode: "11238",
      },
      helpType: "Childcare Specialist needed",
      totalSlots: 20,
      interests: 5,
    },
    {
      userName: "William Smith",
      title: "BK Fort Green Outreach",
      eventDate: "Sept 9, 2023 SAT 5:00pm",
      location: {
        street: "200 Eastern Pkwy",
        city: "Brooklyn",
        state: "NY",
        zipcode: "11238",
      },
      helpType: "Childcare Specialist needed",
      totalSlots: 20,
      interests: 5,
    },
  ];
  
  const [events, setEvents] = useState([]);
  const [visitLogs, setVisitLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eventsDisplay, setEventsDisplay] = useState([]);
  const [, setStates] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await fetchEvents();
      const visitLogsData = await fetchVisitLogs();
      setVisitLogs(visitLogsData)
      // Filter events to get only past events
      const upcomingEvents = eventsData
        .filter((event) => {
          const eventDate = new Date(event.eventDate.seconds * 1000);
          return eventDate >= new Date(); // Check if the event date is before the current date
        })
      // Sort events in place based on their date
      upcomingEvents.sort((a, b) => a.eventDate - b.eventDate);

      setEvents(upcomingEvents);
      // Extract states and remove duplicates
      const extractedStates = [...new Set(upcomingEvents.map(event => event.location.state))];
      setStates(extractedStates);
      
    };

    fetchData();
  }, []);
 
  useEffect(() => {
    setEventsDisplay(events);
    // searchRef.current = "";
  }, [events]);

  useEffect(() => {
    if (eventsDisplay.length > 0) {
      setIsLoading(false);
    }
  }, [eventsDisplay]);


  return (
    <div>
        <div className="flex items-center justify-between">
            <div className="md:inline-flex items-center text-center mb-7 space-y-2 md:space-y-0">
                <p className="font-medium text-xl lg:text-2xl text-[#212121] font-bricolage">
                Outreach Visit Log
                </p>
                <button className="text-sm font-medium font-['DM Sans'] leading-tight lg:text-[12px] text-white bg-[#6840E0] px-6 py-2.5 lg:px-6 lg:py-2.5 rounded-full sm:hidden">
                Create an Outreach
                </button>
            </div>

            </div>
            {isLoading?(
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
                <EventCardSkeleton />
                <EventCardSkeleton />
                <EventCardSkeleton />
            </div>
            ):(<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
            {(visitLogs.slice(0,3).map((visitLogData) => (
            <OutreachVisitLogCard visitLogCardData={visitLogData}/>
                )))}


        </div>)}
            
            {visibleItems < cardData.length && (
            <button
                className="w-full px-6 py-2.5 rounded-full text-sm font-medium text-violet-950 font-['DM Sans'] border border-stone-300"
                onClick={loadMore}
            >
                Load More
            </button>
            )}
    </div>

   );
};

export default OutreachVisitLogProfile;