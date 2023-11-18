import React, { useState, useEffect, useRef } from "react";
import OutreachEventCard from "./Community/OutreachEventCard";
import {
  formatDate,
  fetchEvents,
} from "./EventCardService";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import search_icon from "../images/search_icon.png";

const AllOutreachEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef("");
  const [eventsDisplay, setEventsDisplay] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await fetchEvents();
      const upcomingEvents = eventsData.filter((event) => {
        const eventDate = new Date(event.eventDate.seconds * 1000);
        return eventDate >= new Date(); // Check if the event date is before the current date
      });
      // Sort events in place based on their date
      upcomingEvents.sort((a, b) => a.eventDate - b.eventDate);

      setEvents(upcomingEvents);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setEventsDisplay(events);
    // searchRef.current = "";
  }, [events]);

  const searchChange = () => {
    console.log(searchRef.current.value);
    console.log(events[0]);
    setEventsDisplay(
      events.filter(
        (x) =>
          x.title.toLowerCase().search(searchRef.current.value.toLowerCase()) >
            -1 ||
          x.userName
            .toLowerCase()
            .search(searchRef.current.value.toLowerCase()) > -1
      )
    );
  };

  return (
    <div className="relative flex flex-col items-center ">
      <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl bg-white text-black ">
        {/*  */}
        <div
          className=" absolute flex mt-[-50px] items-center cursor-pointer "
          onClick={() => {
            navigate("/");
          }}
        >
          <IoIosArrowBack className=" w-6 h-6" />{" "}
          <p className=" font-bricolage text-xl font-bold leading-7">
            Return to Home
          </p>
        </div>
        {/*  */}

        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] ">
          
        <div className="flex">
                <p className=" font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58] lg:mt-2">
                  {" "}
                  Upcoming outreach events
                </p>
                <div className="ml-5 flex">
                      <label class="relative text-gray-400 focus-within:text-gray-600 block">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 pointer-events-none absolute top-6 transform -translate-y-1/2 left-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                          </svg>
                          <input type="email" name="email" id="email" placeholder="Search" ref={searchRef}
                            onChange={searchChange} class="form-input border py-3 px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block pl-12 focus:outline-none rounded-2xl"/>
                      </label>
                </div>
        </div>
          
          <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              {eventsDisplay.length > 0 &&
                eventsDisplay.map((eventData) => (
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
            {eventsDisplay.length < 1 && <p>No results found</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOutreachEvents;
