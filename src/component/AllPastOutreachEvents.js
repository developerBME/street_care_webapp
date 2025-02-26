import React, { useState, useEffect, useRef } from "react";
import OutreachEventCard from "./Community/OutreachEventCard";
import { useNavigate } from "react-router-dom";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import EventCardSkeleton from "./Skeletons/EventCardSkeleton";
import { formatDate } from "./HelperFunction";
import UserTypeInfo from "./UserTypeInfo";
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter, 
  getDocs, 
  getCountFromServer 
} from "firebase/firestore";
import {fetchPaginatedPastOutreachEvents} from "./EventCardService.js";
import { db } from "./firebase";

const AllPastOutreachEvents = () => {
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [cityToSearch, setCityToSearch] = useState("");
  const [startDateTime, setStartDateTime] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d;
  });
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [filterType, setFilterType] = useState("date");

  const [totaloutreaches, setTotalOutreaches] = useState(0);
  const outreachPerPages = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [cumulativeEventsCount, setCumulativeEventsCount] = useState(0);
  const [cursorFields, setCursorFields] = useState({
    lastVisible: null,
    pageSize: outreachPerPages,
    direction: "next",
    pageHistory: []
  });

  const navigate = useNavigate();
  const searchRef = useRef("");
  const searchCityRef = useRef("");

  useEffect(() => {
    const getTotalCount = async () => {
      try {
        let countQuery;
        if (!cityToSearch || cityToSearch.trim() === "") {
          countQuery = query(
            collection(db, "outreachEvents"),
            where("eventDate", "<", new Date()), 
            where("eventDate", ">=", startDateTime),
            where("eventDate", "<=", endDateTime),
            orderBy("eventDate", "desc")
          );
        } else {
          countQuery = query(
            collection(db, "outreachEvents"),
            where("location.city", "==", cityToSearch),
            where("eventDate", "<", new Date()),
            where("eventDate", ">=", startDateTime),
            where("eventDate", "<=", endDateTime),
            orderBy("eventDate", "desc")
          );
        }
        const snapshot = await getCountFromServer(countQuery);
        const tot = snapshot.data().count;
        setTotalOutreaches(tot);
        setTotalPages(Math.ceil(tot / outreachPerPages));
      } catch (error) {
        console.error("Error fetching total count:", error);
      }
    };
    getTotalCount();
  }, [cityToSearch, startDateTime, endDateTime]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const { fetchedEvents, lastVisible, pageHistory } = await fetchPaginatedPastOutreachEvents(
          cityToSearch,
          startDateTime,
          endDateTime,
          cursorFields.lastVisible,
          cursorFields.pageSize,
          cursorFields.direction,
          cursorFields.pageHistory
        );
  
        setEvents(fetchedEvents);
        setCursorFields((prev) => ({
          ...prev,
          lastVisible: lastVisible,
          pageHistory: pageHistory
        }));
  
        setCumulativeEventsCount((prevCount) => {
          if (cursorFields.direction === "next") {
            return prevCount + fetchedEvents.length;
          }
          if (cursorFields.direction === "prev") {
            return Math.max(prevCount - events.length, fetchedEvents.length);
          }
          return fetchedEvents.length;
        });
      } catch (error) {
        setErrorMessage(error.message);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [cursorFields.direction, cityToSearch, startDateTime, endDateTime, currentPage]);
  

  const resetPagination = () => {
    setCursorFields({
      lastVisible: null,
      pageSize: outreachPerPages,
      direction: "next",
      pageHistory: []
    });
    setCurrentPage(0);
    setCumulativeEventsCount(0); 
  };
  

  const handleStartDateChange = (e) => {
    setStartDateTime(new Date(e.target.value));
    resetPagination();
  };

  const handleEndDateChange = (e) => {
    setEndDateTime(new Date(e.target.value));
    resetPagination();
  };

  const handleCityChange = (e) => {
    setCityToSearch(e.target.value);
    resetPagination();
  };

  const handleClickPrev = () => {
    if (currentPage === 0) return;
    setCurrentPage((prev) => prev - 1);
    setCursorFields((prev) => ({ ...prev, direction: "" }));
    setTimeout(() => {
      setCursorFields((prev) => ({ ...prev, direction: "prev" }));
    }, 0);
  };

  const handleClickNext = () => {
    if (currentPage >= totalPages - 1) return;
    setCurrentPage((prev) => prev + 1);
    setCursorFields((prev) => ({ ...prev, direction: "" }));
    setTimeout(() => {
      setCursorFields((prev) => ({ ...prev, direction: "next" }));
    }, 0);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const pageRange = 1;

    if (currentPage > 0) {
      buttons.push(
        <button
          key="prev"
          onClick={handleClickPrev}
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
        >
          <IoIosArrowBack />
        </button>
      );
    }

    for (
      let i = Math.max(0, currentPage - pageRange);
      i <= Math.min(totalPages - 1, currentPage + pageRange);
      i++
    ) {
      buttons.push(
        <button
          key={i}
          onClick={() => {
            setCurrentPage(i);
            resetPagination();
          }}
          className={`mx-1 px-3 py-1 rounded-full ${
            currentPage === i
              ? "bg-[#1F0A58] text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {i + 1}
        </button>
      );
    }

    if (currentPage < totalPages - 1) {
      buttons.push(
        <button
          key="next"
          onClick={handleClickNext}
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
        >
          <IoIosArrowForward />
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="relative flex flex-col items-center ">
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
        <div className="items-center justify-center px-4 py-8 lg:px-24 lg:py-16 h-full w-full rounded-2xl bg-[#F7F7F7]">
          <div className="lg:flex justify-between items-center space-y-4 lg:space-y-0">
            <div className="lg:w-1/3">
              <p className="font-bricolage font-medium text-xl md:text-[35px] text-[#1F0A58] lg:mt-2">
                Past outreach events
              </p>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:w-2/3 space-y-2 lg:space-y-0 lg:space-x-2">
              <div className="relative w-full lg:w-auto">
                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  placeholder="Search Outreach Events"
                  ref={searchRef}
                  className="form-input w-full py-1 px-3 border border-[#CACACA] placeholder-gray-400 text-xs md:text-sm lg:text-base text-gray-500 rounded-lg focus:ring-1 focus:ring-[#1F0A58]"
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <span className="text-gray-700 text-xs md:text-sm">
                    Filter:
                  </span>
                  <button
                    onClick={() => {
                      setFilterType((prev) => (prev === "date" ? "city" : "date"));
                      resetPagination();
                    }}
                    className="flex items-center bg-white border border-gray-300 px-3 py-1 rounded-lg text-xs md:text-sm text-gray-700"
                  >
                    {filterType === "date" ? "Date Period" : "City"}
                    <IoIosArrowDown className="ml-1" />
                  </button>
                </div>
                {filterType === "date" && (
                  <>
                    <input
                      type="date"
                      value={startDateTime.toISOString().split("T")[0]}
                      onChange={handleStartDateChange}
                      className="form-input py-1 px-2 border border-gray-300 rounded-lg text-xs md:text-sm"
                    />
                    <span>|</span>
                    <input
                      type="date"
                      value={endDateTime.toISOString().split("T")[0]}
                      onChange={handleEndDateChange}
                      className="form-input py-1 px-2 border border-gray-300 rounded-lg text-xs md:text-sm"
                    />
                  </>
                )}
                {filterType === "city" && (
                  <input
                    type="text"
                    value={cityToSearch}
                    onChange={handleCityChange}
                    placeholder="Enter City"
                    className="form-input py-1 px-2 border border-gray-300 rounded-lg text-xs md:text-sm"
                  />
                )}
              </div>
            </div>
          </div>
          <UserTypeInfo />
          <div className="flex justify-between items-center mt-8 w-full">
            <p className="text-gray-600">
              Showing {cumulativeEventsCount} of {totaloutreaches} events
            </p>
            <div className="flex justify-end">{renderPaginationButtons()}</div>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-center mt-4">{errorMessage}</p>
          )}
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-fit">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : (
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              {events.length > 0 ? (
                events.map((eventData) => (
                  <OutreachEventCard
                    isPastEvent={true}
                    key={eventData.id}
                    cardData={eventData}
                  />
                ))
              ) : (
                <p>No past events found.</p>
              )}
            </div>
          )}
          <div className="flex justify-between items-center mt-8 w-full">
            <p className="text-gray-600">
            Showing {cumulativeEventsCount} of {totaloutreaches} events
            </p>
            <div className="flex justify-end">{renderPaginationButtons()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPastOutreachEvents;
