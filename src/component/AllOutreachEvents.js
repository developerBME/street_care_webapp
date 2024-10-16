import React, { useState, useEffect, useRef } from "react";
import OutreachEventCard from "./Community/OutreachEventCard";
import { fetchEvents } from "./EventCardService";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import EventCardSkeleton from "./Skeletons/EventCardSkeleton";
import { Modal } from "@mui/material";
import OutreachSignupModal from "./Community/OutreachSignupModal";
import RSVPConfirmationModal from "./UserProfile/RSVPConfirmationModal";
import { parse } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "./HelperFunction";


// Main component for displaying all outreach events
const AllOutreachEvents = () => {

  const renderPaginationButtons = () => {
    const buttons = [];
    const pageRange = 1;

    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => onPageChange(currentPage - 1)}
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
        >
          <IoIosArrowBack/>
        </button>
      );
    }

    if (currentPage > pageRange + 1) {
      buttons.push(
        <button
          key="first"
          onClick={() => onPageChange(1)}
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
        >
          1
        </button>
      );
      buttons.push(<span key="ellipsis-start" className="mx-1">...</span>);
    }

    for (let i = Math.max(1, currentPage - pageRange); i <= Math.min(totalPages, currentPage + pageRange); i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`mx-1 px-3 py-1 rounded-full ${
            currentPage === i ? "bg-[#1F0A58] text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - pageRange) {
      buttons.push(<span key="ellipsis-end" className="mx-1">...</span>);
      buttons.push(
        <button
          key="last"
          onClick={() => onPageChange(totalPages)}
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
        >
          {totalPages}
        </button>
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => onPageChange(currentPage + 1)}
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
        >
          <IoIosArrowForward/>
        </button>
      );
    }

    return buttons;
  };

  // State variables
  const [events, setEvents] = useState([]); // Stores all events
  const [eventsDisplay, setEventsDisplay] = useState([]); // Stores events to be displayed based on search and pagination
  const [isLoading, setIsLoading] = useState(true); // Loading state for fetching events
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [eventsPerPage] = useState(6); // Number of events per page

  const navigate = useNavigate();
  const searchRef = useRef(""); // Reference for the search input
  const searchCity = useRef(""); // Reference for the search city input
  const [visibleCards, setVisibleCards] = useState(12);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showWithdrawnModal, setShowWithdrawnModal] = useState(false);
  const [triggerEffect, setTriggerEffect] = useState(false);

  const [filterOption, setfilterOption] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date().setDate(new Date().getDate() + 7)
  );

  const handleFilterChange = (e) => {
    setEventsDisplay(events);
    const filterBy = e.target.value;
    setfilterOption(filterBy);
  };

  const loadMore = () => {
    setVisibleCards((prev) => prev + 12);
  };

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const onSignUp = () => {
    setSelectedEvent(null);
    setShowSignUpModal(true);
    setIsLoading(true);
  };

  const closeSignUpModal = () => {
    setShowSignUpModal(false);
    setTriggerEffect((prev) => !prev);
  };

  const onEventWithdraw = () => {
    setSelectedEvent(null);
    setShowWithdrawnModal(true);
    setIsLoading(true);
    setTriggerEffect((prev) => !prev);
  };

  const closeWithdrawModal = () => {
    setShowWithdrawnModal(false);
  };

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

  useEffect(() => {
    fetchData();
  }, [triggerEffect]);

  useEffect(() => {
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
          x.userName.toLowerCase().includes(searchValue) ||
          x.location.city.toLowerCase().includes(searchValue) ||
          x.description.toLowerCase().includes(searchValue)
      )
    );
    setCurrentPage(1); // Reset to first page after search
  };

  // Handle search city input change
  const searchCityChange = () => {
    setCurrentPage(1);
    const searchValue = searchCity.current.value.toLowerCase();
    setEventsDisplay(
      events.filter((x) => x.location.city.toLowerCase().includes(searchValue))
    );
    setCurrentPage(1); // Reset to first page after search
  };

  //Handling filter by date period
  const filterByDate = () => {
    const sortedEvents = events.filter((event) => {
      if (startDate && event.eventDate.toDate() < startDate) return false;
      if (endDate && event.eventDate.toDate() > endDate) return false;
      return true;
    });

    setEventsDisplay(sortedEvents);
  };

  useEffect(() => {
    if (filterOption === "datePeriod") {
      setCurrentPage(1);
      filterByDate();
    }
  }, [startDate, endDate, filterOption]);

  // Handle page change for pagination
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the indices for slicing events for the current page
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = eventsDisplay.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  const totalPages = Math.ceil(eventsDisplay.length / eventsPerPage); // Calculate total pages

  // Color variables
  const inactiveBgColor = "bg-white";
  const inactiveTextColor = "text-black";
  const inactiveBorderColor = "border-[#9B82CF]";
  const activeBgColor = "bg-[#E0D7EC]";
  const activeTextColor = "text-black";
  const activeBorderColor = "border-[#1F0A58]";

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
          <div className="lg:flex gap-1 justify-between mb-12">
            <div className="">
              <p className="font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58] lg:mt-2">
                Upcoming outreach events
              </p>
            </div>
            <div className="flex items-center gap-4 mt-6 lg:mt-0">
              {/* Search input */}
              <label className="relative text-gray-400 focus-within:text-gray-600">
                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  placeholder="Search Outreach Events"
                  ref={searchRef}
                  onChange={searchChange}
                  className="form-input w-fit md:w-[16rem] lg:w-[16rem] py-2 px-2 border border-[#CACACA] placeholder-gray-400 text-gray-500 appearance-none block pl-10 rounded-2xl"
                  style={{ borderRadius: "0px" }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  strokeWidth="2.0"
                  stroke="currentColor"
                  className="w-5 h-5 pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </label>

              {/* Sort by filter */}
              <div className="flex items-center mt-6 lg:mt-0">
                <label className="mr-2 text-gray-500 font-medium">
                  Filter:
                </label>
                <select
                  value={filterOption}
                  onChange={handleFilterChange}
                  className="form-select w-fit md:w-[8rem] py-2 px-2 border border-[#CACACA] text-gray-500 bg-white appearance-none block rounded-2xl"
                  style={{ borderRadius: "0px" }}
                >
                  <option value="">None</option>
                  <option value="datePeriod">Date Period</option>
                  <option value="city">City</option>
                </select>
              </div>

              {/* Conditional rendering of City search */}
              {filterOption === "city" && (
                <input
                  type="text"
                  name="searchCity"
                  id="searchCity"
                  placeholder="Search City"
                  ref={searchCity}
                  onChange={searchCityChange}
                  className="form-input w-fit md:w-[12rem] lg:w-[8rem] py-2 px-2 border border-[#CACACA] placeholder-gray-400 text-gray-500 appearance-none block pl-2 rounded-2xl"
                  style={{ borderRadius: "0px" }}
                />
              )}

              {/* Conditional rendering of DatePickers */}
              {filterOption === "datePeriod" && (
                <div className="flex items-center mt-6 lg:mt-0 gap-2">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Select Start Date"
                    className="form-input w-fit md:w-[9rem] lg:w-[9rem] py-2 px-2 border border-[#CACACA] text-gray-500 appearance-none block"
                  />
                  <p>To</p>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Select End Date"
                    className="form-input w-fit md:w-[9rem] lg:w-[9rem] py-2 px-2 border border-[#CACACA] text-gray-500 appearance-none block"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Pagination buttons */}
          {/* Add event count and pagination at the bottom */}
          <div className="flex justify-between items-center mt-8 w-full mb-11">
            <p className="text-gray-600">
              Showing {currentEvents.length} of {eventsDisplay.length} events
            </p>

            <div className="flex justify-end">
              {renderPaginationButtons()}
            </div>
          </div>

          {/* Display loading skeletons or events */}
          {isLoading ? (
            <div className="w-full flex overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : (
            <div className="w-full flex overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-1">
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
                    openModal={() =>
                      openModal({
                        ...eventData,
                        eventDate: eventData.eventDate?.seconds
                          ? formatDate(
                              new Date(eventData.eventDate.seconds * 1000)
                            )
                          : eventData.eventDate,
                      })
                    }
                  />
                ))
              ) : (
                <p>No results found</p>
              )}
            </div>
          )}

          {/* Pagination buttons */}
          {/* Add event count and pagination at the bottom */}
          <div className="flex justify-between items-center mt-8 w-full">
            <p className="text-gray-600">
              Showing {currentEvents.length} of {eventsDisplay.length} events
            </p>

            <div className="flex justify-end">
              {renderPaginationButtons()}
            </div>
          </div>

        </div>
      </div>
      <Modal open={!!selectedEvent}>
        <OutreachSignupModal
          data={{ ...selectedEvent }}
          closeModal={closeModal}
          onSignUp={onSignUp}
          onEventWithdraw={onEventWithdraw}
        />
      </Modal>
      <Modal open={showSignUpModal}>
        <RSVPConfirmationModal closeModal={closeSignUpModal} type="edit" />
      </Modal>
      <Modal open={showWithdrawnModal}>
        <RSVPConfirmationModal
          closeModal={closeWithdrawModal}
          type="withdraw"
        />
      </Modal>
    </div>
  );
};

export default AllOutreachEvents;
