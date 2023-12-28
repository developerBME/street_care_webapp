import React, { useState, useEffect } from "react";
import OutreachVisitLogCard from "./OutreachVisitLogCard";
import { fetchEvents, formatDate } from "../EventCardService";
import { fetchVisitLogs } from "../VisitLogCardService";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import NoOutreachDoc from "./NoOutreachDoc";
   
const OutreachVisitLogProfile = () => {  

  const [visibleItems, setVisibleItems] = useState(3);
  const loadMore = () => {
    setVisibleItems((prev) => prev + 3);
  };
  
  const [events, setEvents] = useState([]);
  const [visitLogs, setVisitLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eventsDisplay, setEventsDisplay] = useState([]);
  const [, setStates] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
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
      
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
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
        </div>
      </div>

      {isLoading ? (
        <div className=" sm:block sm:overflow-x-auto overflow-y-hidden flex justify-between items-center w-full">
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
        </div>
      ) : (
        <>
          {visitLogs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-2 mb-6">
              {visitLogs.slice(0, visibleItems).map((visitLogData, index) => (
                <div key={index} className="p-2">
                  <OutreachVisitLogCard visitLogCardData={visitLogData} />
                </div>
              ))}
            </div>
          )}

          {visibleItems < visitLogs.length && (
            <button
              className="w-fit rounded-[100px] border border-[#C8C8C8] flex-col justify-center items-center gap-2 flex text-center text-[#1F0A58] hover:bg-[#1F0A58] hover:text-white text-[13px] font-medium font-dmsans leading-tight self-stretch px-6 py-2.5 mt-7"
              onClick={loadMore}
            >
              Load More
            </button>
          )}

          {visitLogs.length === 0 && <NoOutreachDoc />}
        </>
      )}
    </div>
  );
};

export default OutreachVisitLogProfile;