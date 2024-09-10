import React, { useState, useEffect, useRef } from "react";
import OutreachEventCard from "./Community/OutreachEventCard";
import { formatDate, fetchEvents } from "./EventCardService";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import EventCardSkeleton from "./Skeletons/EventCardSkeleton";

// Main component for displaying all outreach events
const AllOutreachEvents = () => {
  // State variables
  const [events, setEvents] = useState([]); // Stores all events
  const [eventsDisplay, setEventsDisplay] = useState([]); // Stores events to be displayed based on search and pagination
  const [isLoading, setIsLoading] = useState(true); // Loading state for fetching events
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [eventsPerPage] = useState(12); // Number of events per page

  const navigate = useNavigate();
  const searchRef = useRef(""); // Reference for the search input

  // Fetch events from the server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await fetchEvents();
      const upcomingEvents = eventsData.filter((event) => {
        if (!event.eventDate || !event.eventDate.seconds) {
          return false; // Skip events with undefined eventDate or seconds
        }
        const eventDate = new Date(event.eventDate.seconds * 1000);
        return eventDate >= new Date(); // Filter only upcoming events
      });
      // Sort events by date
      upcomingEvents.sort((a, b) => a.eventDate - b.eventDate);
      setEvents(upcomingEvents);
      setIsLoading(false); // Set loading to false after fetching data
    };

    fetchData();
  }, []);

  // Update displayed events when the events state changes
  useEffect(() => {
    setEventsDisplay(events);
  }, [events]);

  // Handle search input change
  const searchChange = () => {
    const searchValue = searchRef.current.value.toLowerCase();
    setEventsDisplay(
      events.filter(
        (x) =>
          x.title.toLowerCase().includes(searchValue) ||
          x.userName.toLowerCase().includes(searchValue)
      )
    );
    setCurrentPage(1); // Reset to first page after search
  };

  // Handle page change for pagination
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the indices for slicing events for the current page
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
    <div className="relative flex flex-col items-center">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl bg-white text-black">
        {/* Back to home button */}
        <div
          className="absolute flex mt-[-50px] items-center cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <IoIosArrowBack className="w-6 h-6" />
          <p className="font-bricolage text-xl font-bold leading-7">
            Return to Home
          </p>
        </div>

        {/* Main content area */}
        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
          <div className="lg:flex justify-between">
            <div className="">
              <p className="font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58] lg:mt-2">
                Upcoming outreach events
              </p>
            </div>
            <div className="mt-6 lg:mt-0">
              {/* Search input */}
              <label className="relative text-gray-400 focus-within:text-gray-600">
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
                  className="w-6 h-6 pointer-events-none absolute top-6 transform -translate-y-1/2 left-3"
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

          {/* Display loading skeletons or events */}
          {isLoading ? (
            <div className="w-full flex overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3 gap-2">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : (
            <div className="w-full flex overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3 gap-2">
              {currentEvents.length > 0 ? (
                currentEvents.map((eventData) => (
                  <OutreachEventCard
                    key={eventData.id}
                    cardData={{
                      ...eventData,
                      eventDate: formatDate(
                        new Date(eventData.eventDate.seconds * 1000)
                      ),
                    }}
                  />
                ))
              ) : (
                <p>No results found</p>
              )}
            </div>
          )}

          {/* Pagination buttons */}
          <div className="flex justify-center mt-4">
            {[...Array(totalPages).keys()].map((i) => (
              <button
                key={i + 1}
                className={`mx-2 px-4 py-2 border rounded-full ${
                  currentPage === i + 1
                    ? `${activeBgColor} ${activeTextColor} ${activeBorderColor}`
                    : `${inactiveBgColor} ${inactiveTextColor} ${inactiveBorderColor}`
                }`}
                onClick={() => onPageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOutreachEvents;
