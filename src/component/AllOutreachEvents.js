import React, { useState, useEffect, useRef } from "react";
import OutreachEventCard from "./Community/OutreachEventCard";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import EventCardSkeleton from "./Skeletons/EventCardSkeleton";
import { Modal } from "@mui/material";
import OutreachSignupModal from "./Community/OutreachSignupModal";
import RSVPConfirmationModal from "./UserProfile/RSVPConfirmationModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserTypeInfo from "./UserTypeInfo";
import { 
  getCountFromServer, 
  collection, 
  query, 
  where, 
  orderBy, 
} from "firebase/firestore";
import { db } from "./firebase";
import { fetchPaginatedEvents } from "./EventCardService.js";

const AllOutreachEvents = ({ loggedIn }) => {
  const navigate = useNavigate();

  const [cursorFields, setCursorFields] = useState({
    lastVisible: null,
    pageSize: 6,
    direction: "next",
    pageHistory: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const [searchDescription, setSearchDescription] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d;
  });
  const [cityToSearch, setCityToSearch] = useState("");

  const searchCity = useRef("");

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showWithdrawnModal, setShowWithdrawnModal] = useState(false);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [totalOutreaches, setTotalOutreaches] = useState(0);
  const [cumulativeEventsCount, setCumulativeEventsCount] = useState(0);

  useEffect(() => {
    const getTotalCount = async () => {
      try {
        let countQuery;
        if (filterOption === "city" && cityToSearch.trim() !== "") {
          countQuery = query(
            collection(db, "outreachEvents"),
            where("location.city", "==", cityToSearch),
            where("eventDate", ">=", new Date()),
            orderBy("eventDate", "asc")
          );
        } else if (filterOption === "datePeriod") {
          countQuery = query(
            collection(db, "outreachEvents"),
            where("eventDate", ">=", startDate),
            where("eventDate", "<=", endDate),
            orderBy("eventDate", "asc")
          );
        } else {
          countQuery = query(
            collection(db, "outreachEvents"),
            where("eventDate", ">=", new Date()),
            orderBy("eventDate", "asc")
          );
        }
        const snapshot = await getCountFromServer(countQuery);
        const tot = snapshot.data().count;
        setTotalOutreaches(tot);
      } catch (error) {
        console.error("Error fetching total count:", error);
      }
    };
    getTotalCount();
  }, [filterOption, startDate, endDate, cityToSearch]);
  

  useEffect(() => {
    const getEvents = async () => {
      setIsLoading(true);
      try {
        const {
          events: fetchedEvents,
          lastVisible: newLastVisible,
          pageHistory: newPageHistory,
          totalFilteredEvents
        } = await fetchPaginatedEvents(
          filterOption === "city" ? cityToSearch : "",
          filterOption === "datePeriod" ? startDate : new Date(),
          filterOption === "datePeriod" ? endDate : new Date("9999-12-31"),
          searchDescription,
          cursorFields.lastVisible,
          cursorFields.pageSize,
          cursorFields.direction,
          cursorFields.pageHistory
        );
        
        console.log("fetchedEvents", fetchedEvents);
        
        setEvents(fetchedEvents);
        setCursorFields((prev) => ({
          ...prev,
          lastVisible: newLastVisible,
          pageHistory: newPageHistory
        }));
  
        if (searchDescription.trim()) {
          setTotalOutreaches(totalFilteredEvents);
          setCumulativeEventsCount(fetchedEvents.length);
        } else {
          setTotalOutreaches((prev) => prev || totalFilteredEvents);
          setCumulativeEventsCount((prevCount) => {
            if (cursorFields.direction === "next") {
              return prevCount + fetchedEvents.length;
            }
            if (cursorFields.direction === "prev") {
              return Math.max(prevCount - events.length, fetchedEvents.length);
            }
            return fetchedEvents.length;
          });
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
      setIsLoading(false);
    };
  
    getEvents();
  }, [cursorFields.direction, filterOption, startDate, endDate, cityToSearch, searchDescription, triggerEffect]);  
  
  const resetPagination = () => {
    setCursorFields({
      lastVisible: null,
      pageSize: 6,
      direction: "next",
      pageHistory: []
    });
    setCurrentPage(1);
    setCumulativeEventsCount(0);
  };
  
  const handleFilterChange = (e) => {
    const selected = e.target.value;
    setFilterOption(selected);
    resetPagination();
    setTotalOutreaches(0);
  };

  const searchCityChange = () => {
    setCurrentPage(1);
    setCityToSearch(searchCity.current.value);
    setCursorFields({ lastVisible: null, pageSize: 6, direction: "next", pageHistory: [] });
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
    setCursorFields((prev) => ({ ...prev, direction: "" }));
    setTimeout(() => {
      setCursorFields((prev) => ({ ...prev, direction: "next" }));
    }, 0);
  };

  const handlePrev = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
    setCursorFields((prev) => ({ ...prev, direction: "" }));
    setTimeout(() => {
      setCursorFields((prev) => ({ ...prev, direction: "prev" }));
    }, 0);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={handlePrev}
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
        >
          <IoIosArrowBack />
        </button>
      );
    }
   
    if (events.length === cursorFields.pageSize && currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={handleNext}
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
        >
          <IoIosArrowForward />
        </button>
      );
    }
    return buttons;
  };

  const openModal = (event) => {
    if (loggedIn) {
      setSelectedEvent(event);
    }
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

  const searchChange = (e) => {
    const searchTerm = e.target.value.trim();
    setSearchDescription(searchTerm);
  
    setCursorFields({
      lastVisible: null,
      pageSize: 6,
      direction: "next",
      pageHistory: []
    });
    setCurrentPage(1);
    setCumulativeEventsCount(0);
  
    if (!searchTerm) {
      setTotalOutreaches((prev) => prev);
      setCumulativeEventsCount(0);
    }
  };  

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl bg-white text-black">
        <div
          className="absolute flex mt-[-50px] items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <IoIosArrowBack className="w-6 h-6" />
          <p className="font-bricolage text-xl font-bold leading-7">
            Return to Home
          </p>
        </div>
        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
          <div className="lg:flex gap-1 justify-between mb-12">
            <div>
              <p className="font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58] lg:mt-2">
                Upcoming outreach events
              </p>
            </div>
            <div className="flex items-center gap-4 mt-6 lg:mt-0">
              <label className="relative text-gray-400 focus-within:text-gray-600">
                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  placeholder="Search by Description"
                  value={searchDescription}
                  onChange={searchChange}
                  onBlur={() => {
                    if (searchDescription.trim() === "") {
                      resetPagination();
                      setTotalOutreaches(0);
                    }
                  }}
                  className="form-input w-fit md:w-[16rem] lg:w-[16rem] py-2 px-2 border border-[#CACACA] placeholder-gray-400 text-gray-500 block pl-10 rounded-2xl"
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
              <div className="flex items-center">
                <label className="mr-2 text-gray-500 font-medium">
                  Filter:
                </label>
                <select
                  value={filterOption}
                  onChange={handleFilterChange}
                  className="form-select w-fit md:w-[8rem] py-2 px-2 border border-[#CACACA] text-gray-500 bg-white block rounded-2xl"
                  style={{ borderRadius: "0px" }}
                >
                  <option value="">None</option>
                  <option value="datePeriod">Date Period</option>
                  <option value="city">City</option>
                </select>
              </div>
              {filterOption === "city" && (
                <input
                  type="text"
                  name="searchCity"
                  id="searchCity"
                  placeholder="Search City"
                  ref={searchCity}
                  onChange={searchCityChange}
                  className="form-input w-fit md:w-[12rem] lg:w-[8rem] py-2 px-2 border border-[#CACACA] placeholder-gray-400 text-gray-500 block pl-2 rounded-2xl"
                  style={{ borderRadius: "0px" }}
                />
              )}
              {filterOption === "datePeriod" && (
                <div className="flex items-center gap-2">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      setCursorFields({ lastVisible: null, pageSize: 6, direction: "next", pageHistory: [] });
                      setCurrentPage(1);
                    }}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Select Start Date"
                    className="form-input w-fit md:w-[9rem] lg:w-[9rem] py-2 px-2 border border-[#CACACA] text-gray-500 block"
                  />
                  <p>To</p>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => {
                      setEndDate(date);
                      setCursorFields({ lastVisible: null, pageSize: 6, direction: "next", pageHistory: [] });
                      setCurrentPage(1);
                    }}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Select End Date"
                    className="form-input w-fit md:w-[9rem] lg:w-[9rem] py-2 px-2 border border-[#CACACA] text-gray-500 block"
                  />
                </div>
              )}
            </div>
          </div>
          <UserTypeInfo />

          <div className="flex justify-between items-center mt-8 w-full mb-11">
            <p className="text-gray-600">
              Showing {cumulativeEventsCount} of {searchDescription ? totalOutreaches : totalOutreaches} events
            </p>
            <div className="flex justify-end">{renderPaginationButtons()}</div>
          </div>
          {isLoading ? (
            <div className="w-full flex flex-wrap gap-4">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : (
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.length > 0 ? (
                events.map((eventData) => (
                  <OutreachEventCard key={eventData.id} cardData={eventData} />
                ))
              ) : (
                <p>No results found</p>
              )}
            </div>
          )}

          <div className="flex justify-between items-center mt-8 w-full">
            <p className="text-gray-600">
              Showing {cumulativeEventsCount} of {searchDescription ? totalOutreaches : totalOutreaches} events
            </p>
            <div className="flex justify-end">{renderPaginationButtons()}</div>
          </div>
        </div>
      </div>
      <Modal open={!!selectedEvent}>
        <OutreachSignupModal
          data={selectedEvent}
          closeModal={closeModal}
          onSignUp={onSignUp}
          onEventWithdraw={onEventWithdraw}
        />
      </Modal>
      <Modal open={showSignUpModal}>
        <RSVPConfirmationModal closeModal={closeSignUpModal} type="edit" />
      </Modal>
      <Modal open={showWithdrawnModal}>
        <RSVPConfirmationModal closeModal={closeWithdrawModal} type="withdraw" />
      </Modal>
    </div>
  );
};

export default AllOutreachEvents;
