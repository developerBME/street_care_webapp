import React, { useState, useEffect, useRef } from "react";
import OutreachEventCard from "../Community/OutreachEventCard";
import { fetchEvents } from "../EventCardService"; 
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import { Modal } from "@mui/material";
import OutreachSignupModal from "../Community/OutreachSignupModal";
import RSVPConfirmationModal from "../UserProfile/RSVPConfirmationModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../HelperFunction"; 
const AdminOutreachEvents = () => {

 

  // State variables
  const [allEvents, setAllEvents] = useState([]); //Stores all the events when first loaded from database
  const [events, setEvents] = useState([]); // Stores all events
  const [eventsDisplay, setEventsDisplay] = useState([]); // Stores events to be displayed based on search and pagination
  const [isLoading, setIsLoading] = useState(true); // Loading state for fetching events
  const navigate = useNavigate();
  const searchRef = useRef(""); // Reference for the search input
  const searchCity = useRef(""); // Reference for the search city input

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showWithdrawnModal, setShowWithdrawnModal] = useState(false);
  const [triggerEffect, setTriggerEffect] = useState(false);

  const [filterOption, setfilterOption] = useState("");
  const [timeframeOption, setTimeframeOption] = useState("");
  const [totalPages,setTotalPages] = useState(0)
  const logsPerPage = 6;
  const [currentPageLength,setCurrentPageLength]=useState(0)
  const [cursorFields,setCursorFields] = useState({"lastVisible":null,"direction":"next","pageHistory":[],"pastOutreachRef":null})
  const [filterData,setFilterData] = useState({city:"",isDateFilter:false,startDate:new Date(),endDate:new Date(new Date().setDate(new Date().getDate() + 7)),searchValue:"",timeFrame:"",isTimeFilter:false})
  


  const handleFilterChange = (e) => {
    //setEventsDisplay(events);
    const filterBy = e.target.value;
    setfilterOption(filterBy);
    //To make sure when the sort option is changed from None to city or date, api is not triggered
    if(filterBy === "")return 
    //To clear the filters in other cases
    setFilterData(prev=>({...prev,city:"",startDate:new Date(),endDate:new Date(new Date().setDate(new Date().getDate() + 7)),isDateFilter:filterBy === "datePeriod" ? true : false }))
    setCursorFields({"lastVisible":null,"pageSize" : logsPerPage,"direction":"next","pageHistory":[],"pastOutreachRef":null})
    setCurrentPageLength(0)
  };

  const handleTimeframeChange = (e) => {
    const timeframe = e.target.value;
    setTimeframeOption(timeframe)
    if(timeframe === "all")setFilterData(prev=>({...prev,isTimeFilter: false,timeFrame:""}))
    else setFilterData(prev=>({...prev,isTimeFilter: true,timeFrame:timeframe}))
    setCursorFields({"lastVisible":null,"pageSize" : logsPerPage,"direction":"next","pageHistory":[],"pastOutreachRef":null})
    setCurrentPageLength(0)
    // if (timeframe === 'all'){
    //         // setEvents(events)
    //         setEventsDisplay(allEvents)
    //     }
    //     else if (timeframe === 'past'){
    //         const pastEvents = allEvents.filter((event) => {
    //             const eventDate = event?.eventDate?.seconds
    //               ? new Date(event.eventDate.seconds * 1000)
    //               : event.eventDate;
    //             return eventDate < new Date();
    //           });
    //           setEvents(pastEvents)
    //         setEventsDisplay(pastEvents)
    //     }
    //     else if (timeframe === 'upcoming'){
    //         const upcomingEvents = allEvents.filter((event) => {
    //             const eventDate = event?.eventDate?.seconds
    //               ? new Date(event.eventDate.seconds * 1000)
    //               : event.eventDate;
    //             return eventDate >= new Date();
    //           });
    //           setEvents(upcomingEvents)
    //         setEventsDisplay(upcomingEvents)
    //     }
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


  useEffect(() => {
    const fetchData = async () => {
    if(!cursorFields.direction)return
    console.log(filterData.searchValue)
    const eventsData = await fetchEvents(
      filterData.searchValue,
      filterData.city,
      filterData.startDate,
      filterData.endDate,
      filterData.isDateFilter,
      filterData.isTimeFilter,
      filterData.timeFrame,
      cursorFields.lastVisible,
      logsPerPage,
      cursorFields.direction,
      cursorFields.pageHistory
    );
    setCursorFields(prev=>({...prev,lastVisible:eventsData.lastDoc,pageHistory:eventsData.pageHistory}))
    setTotalPages(eventsData.totalRecords)
    if(cursorFields.direction ==="next")setCurrentPageLength((prev)=>prev + eventsData.outreachEvents.length)
    console.log(eventsData)
    setAllEvents(eventsData.outreachEvents);
    setEvents(eventsData.outreachEvents);
    setIsLoading(false); // Set loading to false after fetching data
  };
  const delayTimer = setTimeout(()=>{
    fetchData();
  },500)
  return ()=>clearTimeout(delayTimer)
  }, [filterData.city,filterData.searchValue, filterData.isDateFilter, filterData.startDate, filterData.endDate,triggerEffect,cursorFields.direction,filterData.isTimeFilter,filterData.timeFrame]);

  // Update displayed events when the events state changes
  useEffect(() => {
    setEventsDisplay(events);
  }, [events]);


  const handleNext = () =>{
    // Reset direction to force an update
  setCursorFields((prev) => ({ ...prev, direction: "" })); 

  // Set it to 'next' after a slight delay
  setTimeout(() => {
    setCursorFields((prev) => ({ ...prev, direction: "next" }));
  }, 0); 
  }
  const handlePrev=()=>{
    //Handling here since I need length of the records one render before
    setCurrentPageLength((prev)=>(prev-allEvents.length))
    //Reset direction to force an update
    setCursorFields((prev) => ({ ...prev, direction: "" })); 
    setTimeout(() => {
      setCursorFields((prev) => ({ ...prev, direction: "prev" }));
    }, 0); 
  }

  const renderPaginationButtons = () => {
    const buttons = [];
    if (currentPageLength > 6) {
      buttons.push(
        <button
          key="prev"
          onClick={() => handlePrev()}
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
        >
          <IoIosArrowBack className="w-6 h-6" />
        </button>
      );
    }

    if (currentPageLength < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => handleNext()}
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
        >
          <IoIosArrowForward className="w-6 h-6" />
        </button>
      );
    }

    return buttons;
  };

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFilterData((prev)=>({...prev,[name]:value}))
    setCursorFields({"lastVisible":null,"pageSize" : logsPerPage,"direction":"next","pageHistory":[],"pastOutreachRef":null})
    setCurrentPageLength(0)
  }

  const handleDateChange = (date,fieldName) =>{
    setFilterData((prev) => ({ ...prev, [fieldName]: date,isDateFilter: true }));
    setCursorFields({"lastVisible":null,"pageSize" : logsPerPage,"direction":"next","pageHistory":[],"pastOutreachRef":null})
    setCurrentPageLength(0)
  }

 
  return (
    <div className="relative flex flex-col items-center">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl bg-white text-black">
        {/* Back to home button */}
        <div
          className="absolute flex mt-[-50px] items-center cursor-pointer"
          onClick={() => {
            navigate("/admin");
          }}
        >
          <IoIosArrowBack className="w-6 h-6" />
          <p className="font-bricolage text-xl font-bold leading-7">
            Return to Admin
          </p>
        </div>

        {/* Main content area */}
        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
          <div className="lg:flex gap-1 justify-between mb-12">
            <div className="">
              <p className="font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58] lg:mt-2">
                All Outreach Events
              </p>
            </div>
            <div className="flex items-center gap-4 mt-6 lg:mt-0">
            {/* All/Past/Upcoming Outreach Events */}
            <div className="flex items-center mt-6 lg:mt-0">                
                <select
                  name = "timeframeOption"
                  value={timeframeOption}
                  onChange={handleTimeframeChange}
                  className="form-select w-fit md:w-9rem] py-2 px-2 border border-[#CACACA] text-gray-500 bg-white appearance-none block rounded-2xl"
                  style={{ borderRadius: "0px" }}
                >
                  <option value="all">All</option>
                  <option value="past">Past Events</option>
                  <option value="upcoming">Upcoming Events</option>
                </select>
              </div>
                

              {/* Search input */}
              <label className="relative text-gray-400 focus-within:text-gray-600">
                <input
                  type="text"
                  name="searchValue"
                  id="searchText"
                  placeholder="Search Outreach Events"
                  ref={searchRef}
                  onChange={handleChange}
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
                  name="city"
                  id="searchCity"
                  placeholder="Search City"
                  ref={searchCity}
                  onChange={handleChange}
                  className="form-input w-fit md:w-[12rem] lg:w-[8rem] py-2 px-2 border border-[#CACACA] placeholder-gray-400 text-gray-500 appearance-none block pl-2 rounded-2xl"
                  style={{ borderRadius: "0px" }}
                />
              )}

              {/* Conditional rendering of DatePickers */}
              {filterOption === "datePeriod" && (
                <div className="flex items-center mt-6 lg:mt-0 gap-2">
                  <DatePicker
                    selected={filterData.startDate}
                    onChange={(date)=>handleDateChange(date,"startDate")}
                    selectsStart
                    name="startDate"
                    value={filterData.startDate}
                    startDate={filterData.startDate}
                    endDate={filterData.endDate}
                    placeholderText="Select Start Date"
                    className="form-input w-fit md:w-[9rem] lg:w-[9rem] py-2 px-2 border border-[#CACACA] text-gray-500 appearance-none block"
                  />
                  <p>To</p>
                  <DatePicker
                    selected={filterData.endDate}
                    onChange={(date)=>handleDateChange(date,"endDate")}
                    selectsEnd
                    startDate={filterData.startDate}
                    endDate={filterData.endDate}
                    value={filterData.endDate}
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
              Showing {currentPageLength} of {totalPages} events
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
              {eventsDisplay.length > 0 ? (
                eventsDisplay.map((eventData) => (
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
              Showing {currentPageLength} of {totalPages} events
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

export default AdminOutreachEvents;
