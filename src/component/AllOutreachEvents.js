import React, { useState, useEffect, useRef } from "react";
import OutreachEventCard from "./Community/OutreachEventCard";
import { formatDate, fetchEvents } from "./EventCardService";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import EventCardSkeleton from "./Skeletons/EventCardSkeleton";

const AllOutreachEvents = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(6);
  const navigate = useNavigate();
  const searchRef = useRef("");
  const [eventsDisplay, setEventsDisplay] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState(12);
  const loadMore = () => {
    setVisibleCards((prev) => prev + 12);
  };

  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await fetchEvents();
      const upcomingEvents = eventsData.filter((event) => {
        const eventDate = event?.eventDate?.seconds
          ? new Date(event.eventDate.seconds * 1000)
          : event.eventDate;
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

  useEffect(() => {
    if (eventsDisplay.length > 0) {
      setIsLoading(false);
    }
  }, [eventsDisplay]);

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

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = eventsDisplay.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const totalPages = Math.ceil(eventsDisplay.length / eventsPerPage);
  
  
  const renderPaginationButtons = () => {
    const buttons = [];
    const pageRange = 3;
  
    if (currentPage > 1) {
      buttons.push(
        <button
          key="first"
          onClick={() => paginate(1)}
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
        >
          1
        </button>
      );
    }
  
      if (currentPage > 1) {
        buttons.push(
          <button
            key="prev"
            onClick={() => paginate(currentPage - 1)}
            className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
          >
            Prev
          </button>
        );
      }
  
      for (let i = Math.max(1, currentPage - pageRange); i <= Math.min(totalPages, currentPage + pageRange); i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === i ? "bg-[#1F0A58] text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            {i}
          </button>
        );
      }
  
      if (currentPage < totalPages) {
        buttons.push(
          <button
            key="next"
            onClick={() => paginate(currentPage + 1)}
            className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
          >
            Next
          </button>
        );
      }
  
    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="last"
          onClick={() => paginate(totalPages)}
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
        >
          {totalPages}
        </button>
      );
    }
  
    return buttons;
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
          <div className=" lg:flex justify-between">
            <div className="">
              <p className=" font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58] lg:mt-2">
                {" "}
                Upcoming outreach events
              </p>
            </div>
            <div className=" mt-6 lg:mt-0">
              <label class="relative text-gray-400 focus-within:text-gray-600 ">
                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  placeholder="Search Outreach Events"
                  ref={searchRef}
                  onChange={searchChange}
                  className="form-input w-fit md:w-[27rem] lg:w-[25rem] py-3 px-2 border border-[#CACACA] placeholder-gray-400 text-gray-500 appearance-none block pl-12 rounded-2xl"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 pointer-events-none absolute top-6 transform -translate-y-1/2 left-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </label>
            </div>
          </div>

          <>
            {isLoading ? (
              // <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2">
              <div className="w-full flex overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3 gap-2">
                <EventCardSkeleton />
                <EventCardSkeleton />
                <EventCardSkeleton />
              </div>
            ) : (
              // <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2">
              <div className="w-full flex overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3 gap-2">
                {currentEvents.length > 0 &&
                  currentEvents.map((eventData) => (
                    <OutreachEventCard
                      key={eventData.id}
                      cardData={{
                        ...eventData,
                        eventDate: eventData?.eventDate?.seconds
                          ? formatDate(
                              new Date(eventData.eventDate.seconds * 1000)
                            )
                          : eventData.eventDate,
                      }}
                    />
                  ))}
              </div>
            )}
          </>
          <div className="flex justify-center mt-8">
            {renderPaginationButtons()}
          </div>
          {/* <>
            {isLoading ? (
              <div className="flex justify-between items-center w-full h-fit">
                <EventCardSkeleton />
                <EventCardSkeleton />
                <EventCardSkeleton />
              </div>
            ) : (
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
            )}
          </> */}
          {visibleCards < eventsDisplay.length && (
            <button
              className="w-fit rounded-[100px] border border-[#C8C8C8] flex-col justify-center items-center gap-2 flex text-center text-[#1F0A58] hover:bg-[#1F0A58] hover:text-white text-[13px] font-medium font-dmsans leading-tight self-stretch px-6 py-2.5"
              onClick={loadMore}
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOutreachEvents;
