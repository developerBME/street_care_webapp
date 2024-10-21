import React, { useState, useEffect, useRef } from "react";
import OutreachEventCard from "./Community/OutreachEventCard";
import {
  fetchEvents,
  fetchByCityOrStates,
} from "./EventCardService";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import search_icon from "../images/search_icon.png";
import EventCardSkeleton from "./Skeletons/EventCardSkeleton";
import { formatDate } from "./HelperFunction";

const AllPastOutreachEvents = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [outreachPerPages] = useState(6);
  const navigate = useNavigate();
  const searchRef = useRef("");
  const [eventsDisplay, setEventsDisplay] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [cityToSearch, setCityToSearch] = useState("");
  const [filterType, setFilterType] = useState("date");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  const [isLoading, setIsLoading] = useState(false);

  const [endDateTime, setEndDateTime] = useState(() => {
    const today = new Date();
    return today;
  });

  const [startDateTime, setStartDateTime] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() - 7);
    return today;
  });

  useEffect(() => {
    fetchCity();
  }, [currentPage, cityToSearch, startDateTime, endDateTime]);

  useEffect(() => {
    setEventsDisplay(events);
  }, [events]);

  useEffect(() => {
    if (eventsDisplay.length > 0) {
      setIsLoading(false);
    }
  }, [eventsDisplay]);

  const fetchCity = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const { tot, outreachByLoc } = await fetchByCityOrStates(
        cityToSearch,
        startDateTime,
        endDateTime,
        currentPage,
        outreachPerPages
      );

      if (outreachByLoc.length > 0) {
        const pastEvents = outreachByLoc.filter((event) => {
          const eventDate = event?.eventDate?.seconds
            ? new Date(event.eventDate.seconds * 1000)
            : event.eventDate;
          return eventDate < new Date();
        });

        setEvents(pastEvents);
        setTotalPages(Math.ceil(tot / outreachPerPages) - 1);
      } else {
        throw new Error(
          "No past outreach events found for the selected date range."
        );
      }
    } catch (error) {
      setErrorMessage(error.message);
      setEvents([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  const searchChange = () => {
    setEventsDisplay(
      events.filter(
        (x) =>
          x.title.toLowerCase().includes(searchRef.current.value.toLowerCase()) ||
          x.userName.toLowerCase().includes(searchRef.current.value.toLowerCase())
      )
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFilterSelect = (filter) => {
    setFilterType(filter);
    setIsDropdownOpen(false);
  };

  const renderFilterDropdown = () => (
    <div className="absolute bg-white border border-gray-300 rounded-lg mt-2 z-10">
      <button
        onClick={() => handleFilterSelect("date")}
        className="block w-full px-4 py-2 text-left hover:bg-gray-200"
      >
        Date Period
      </button>
      <button
        onClick={() => handleFilterSelect("city")}
        className="block w-full px-4 py-2 text-left hover:bg-gray-200"
      >
        City
      </button>
    </div>
  );

  const handleStartDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setStartDateTime(newDate);
  };

  const handleEndDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setEndDateTime(newDate);
  };

  return (
    <div className="relative flex flex-col items-center ">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl bg-white text-black">
        <div className="items-center justify-center px-4 py-8 lg:px-24 lg:py-16 h-full w-full rounded-2xl bg-[#F7F7F7]">
          <div className="lg:flex justify-between items-center space-y-4 lg:space-y-0">
            <div className="lg:w-1/3">
              <p className="font-bricolage font-medium text-xl md:text-[35px] text-[#1F0A58] lg:mt-2">
                Past outreach events
              </p>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:w-2/3 space-y-2 lg:space-y-0 lg:space-x-2">
              <div className="relative w-full lg:w-auto lg:flex-grow">
                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  placeholder="Search Outreach Events"
                  ref={searchRef}
                  onChange={searchChange}
                  className="form-input w-full py-1 px-3 border border-[#CACACA] placeholder-gray-400 text-xs md:text-sm lg:text-base text-gray-500 appearance-none block pl-10 rounded-lg focus:ring-1 focus:ring-[#1F0A58]"
                />
              </div>
              <div className="flex items-center space-x-2 relative">
                <div className="flex items-center">
                  <span className="text-gray-700 text-xs md:text-sm">Filter:</span>
                  <div className="relative ml-1">
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center bg-white border border-gray-300 px-3 py-1 rounded-lg text-s text-gray-700 whitespace-nowrap"
                    >
                      {filterType === "date" ? "Date Period" : "City"}
                      <IoIosArrowDown className="ml-1" />
                    </button>
                    {isDropdownOpen && renderFilterDropdown()}
                  </div>
                </div>

                {filterType === "date" && (
                  <>
                    <div>
                      <input
                        type="date"
                        value={startDateTime.toISOString().split("T")[0]}
                        onChange={handleStartDateChange}
                        className="form-input py-1 px-2 border border-gray-300 rounded-lg text-xs md:text-sm"
                      />
                    </div>
                    <span>|</span>
                    <div>
                      <input
                        type="date"
                        value={endDateTime.toISOString().split("T")[0]}
                        onChange={handleEndDateChange}
                        className="form-input py-1 px-2 border border-gray-300 rounded-lg text-xs md:text-sm"
                      />
                    </div>
                  </>
                )}

                {filterType === "city" && (
                  <div>
                    <input
                      type="text"
                      value={cityToSearch}
                      onChange={(e) => setCityToSearch(e.target.value)}
                      placeholder="Select City"
                      className="form-input py-1 px-2 border border-gray-300 rounded-lg text-xs md:text-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8 w-full">
            <p className="text-gray-600">
              Showing {eventsDisplay.length} of {totalPages * outreachPerPages} events
            </p>

            <div className="flex justify-end">
              {/* Pagination buttons */}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-between items-center w-full h-fit">
              {/* Loading skeleton */}
            </div>
          ) : (
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              {eventsDisplay.length > 0 &&
                eventsDisplay.map((eventData) => (
                  <OutreachEventCard
                    isPastEvent={true}
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
        </div>
      </div>
    </div>
  );
};

export default AllPastOutreachEvents;
