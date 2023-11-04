import React, { useState, useEffect } from "react";
import OutreachEventCard from "./Community/OutreachEventCard";
import {
  formatDate,
  fetchEvents,
  fetchOfficialEvents,
} from "./EventCardService";

const AllOutreachEvents = () => {
  const [events, setEvents] = useState([]);
  const [offevents, setOffevents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await fetchEvents();

      // Sort events in place based on their date
      eventsData.sort((a, b) => a.eventDate - b.eventDate);

      setEvents(eventsData);
    };
    const fetchOfficialData = async () => {
      const eventsData = await fetchOfficialEvents();
      // Sort events in place based on their date
      eventsData.sort((a, b) => a.eventDate - b.eventDate);
      setOffevents(eventsData);
    };

    fetchData();
    fetchOfficialData();
  }, []);

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-4 lg:mx-40 mt-32 rounded-2xl bg-white text-black ">
          {" "}
          <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] ">
            <p className=" font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
              {" "}
              Upcoming outreach events
            </p>
            {/*<div className=" w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              <Eventcard />
              <Eventcard />
              <div className=" md:col-span-2 lg:col-span-1">
                <Eventcard />
              </div>
  </div> */}
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              {events.map((eventData) => (
                <OutreachEventCard
                  key={eventData.id}
                  cardData={{
                    ...eventData,
                    eventDate: formatDate(
                      new Date(eventData.eventDate.seconds * 1000)
                    ),
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOutreachEvents;
