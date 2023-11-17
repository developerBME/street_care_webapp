import React, { useState, useEffect, useRef } from "react";
import OutreachEventCard from "./Community/OutreachEventCard";
import {
  formatDate,
  fetchEvents,
  fetchOfficialEvents,
} from "./EventCardService";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const AllOutreachEvents = () => {
  const [events, setEvents] = useState([]);
  const [offevents, setOffevents] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef("");
  const [eventsDisplay, setEventsDisplay] = useState([]);

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
          x.title.search(searchRef.current.value) > -1 ||
          x.userName.search(searchRef.current.value) > -1
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
          <p className=" font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
            {" "}
            Upcoming outreach events
          </p>
          <div className="mt-5">
            <input
              label="Search"
              placeholder="Search"
              ref={searchRef}
              onChange={searchChange}
            ></input>
          </div>
          {/*<div className=" w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              <Eventcard />
              <Eventcard />
              <div className=" md:col-span-2 lg:col-span-1">
                <Eventcard />
              </div>
  </div> */}
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
