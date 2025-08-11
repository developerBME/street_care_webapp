import React, { useState, useEffect } from "react";
import OutreachEventCard from "./Community/OutreachEventCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import EventCardSkeleton from "./Skeletons/EventCardSkeleton";
import UserTypeInfo from "./UserTypeInfo";
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getCountFromServer 
} from "firebase/firestore";
import {fetchPaginatedPastOutreachEvents} from "./EventCardService.js";
import { db } from "./firebase";
import { PastOutreachContext } from "../context/pastOutreachEventProvider.js";
import collectionMapping from "../utils/firestoreCollections.js";

const outreachEvents_collection = collectionMapping.outreachEvents;

const AllPastOutreachEvents = () => {
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  
  const [cityToSearch, setCityToSearch] = useState("");
  const [debouncedCityToSearch, setDebouncedCityToSearch] = useState("");

  const {pastOutreachEventState,setPastOutreachEventState} = PastOutreachContext()
  const [startDateTime, setStartDateTime] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d;
  });
  const [selectedStartDate, setSelectedStartDate] = useState(pastOutreachEventState.startDateTime);
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(pastOutreachEventState.endDateTime);
  const [filterType, setFilterType] = useState("date");

  const [totaloutreaches, setTotalOutreaches] = useState(0);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const outreachPerPages = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);
  // const [cursorFields, setCursorFields] = useState({
  //   lastVisible: null,
  //   pageSize: outreachPerPages,
  //   direction: "next",
  //   pageHistory: []
  // });

  const navigate = useNavigate();

  // useEffect(()=>{
  //   if(!pastOutreachEventState.lastVisible) return;
  //   setCursorFields((prev) => ({
  //     ...prev,
  //     lastVisible: pastOutreachEventState.lastVisible,
  //     pageHistory: pastOutreachEventState.pageHistory
  //   }));
  // },[pastOutreachEventState.lastVisible])

  useEffect(() => {
    const hasActiveFilter = searchTerm.trim() !== '' || cityToSearch.trim() !== '';
    
    if (!hasActiveFilter && isFiltered) {
      setTotalPages(Math.ceil(totaloutreaches / outreachPerPages));
    }
    
    setIsFiltered(hasActiveFilter);
  }, [searchTerm, cityToSearch, totaloutreaches]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setPastOutreachEventState((prev)=>({...prev, debouncedSearchTerm: searchTerm }));
    }, 500);
  
    return () => clearTimeout(delaySearch);
  }, [searchTerm]);
  
  useEffect(() => {
    const delayCitySearch = setTimeout(() => {
      setPastOutreachEventState((prev)=>({...prev, debouncedCityToSearch: cityToSearch }));
    }, 500);
  
    return () => clearTimeout(delayCitySearch); 
  }, [cityToSearch]);

  useEffect(() => {
    const getTotalCount = async () => {
      try {
        let countQuery;
        if (!cityToSearch || cityToSearch.trim() === "") {
          countQuery = query(
            collection(db, outreachEvents_collection),
            where("status", "==", "approved"),
            where("eventDate", "<", new Date()), 
            where("eventDate", ">=", pastOutreachEventState.startDateTime),
            where("eventDate", "<=", pastOutreachEventState.endDateTime),
            orderBy("eventDate", "desc")
          );
        } else {
          countQuery = query(
            collection(db, outreachEvents_collection),
            where("status", "==", "approved"),
            where("location.city", "==", cityToSearch),
            where("eventDate", "<", new Date()),
            where("eventDate", ">=", pastOutreachEventState.startDateTime),
            where("eventDate", "<=", pastOutreachEventState.endDateTime),
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
  }, [cityToSearch, pastOutreachEventState.startDateTime, pastOutreachEventState.endDateTime]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage("");
  
      try {
        const { fetchedEvents, lastVisible, pageHistory, totalFilteredEvents } = await fetchPaginatedPastOutreachEvents(
          pastOutreachEventState.debouncedCityToSearch,
          pastOutreachEventState.startDateTime,
          pastOutreachEventState.endDateTime,
          pastOutreachEventState.debouncedSearchTerm,
          pastOutreachEventState.lastVisible,
          pastOutreachEventState.pageSize,
          pastOutreachEventState.direction,
          pastOutreachEventState.pageHistory
        );
  
        setEvents(fetchedEvents);

        setPastOutreachEventState((prev)=>({
          ...prev,
          // debouncedCityToSearch: debouncedCityToSearch,
          // startDateTime: startDateTime, 
          // endDateTime: endDateTime,
          // debouncedSearchTerm: debouncedSearchTerm,
          lastVisible: lastVisible,
          pageHistory: pageHistory
        }))
        console.log("Page History:", pageHistory.length);
        // if (pastOutreachEventState.debouncedSearchTerm && pastOutreachEventState.debouncedSearchTerm.trim() !== '' || pastOutreachEventState.debouncedCityToSearch.trim() !== '') {
        //   setFilteredTotal(totalFilteredEvents || 0);
        //   setTotalPages(Math.ceil((totalFilteredEvents || 0) / outreachPerPages));
        // }
      } catch (error) {
        setErrorMessage(error.message);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pastOutreachEventState.direction, pastOutreachEventState.debouncedCityToSearch, pastOutreachEventState.startDateTime, pastOutreachEventState.endDateTime, pastOutreachEventState.debouncedSearchTerm]);
  const resetPagination = () => {
    setPastOutreachEventState((prev)=>({
      ...prev,
      lastVisible: null,
      pageSize: outreachPerPages,
      direction: "next",
      debouncedCityToSearch: "",
      debouncedSearchTerm: "",
      pageHistory: []
    }));
   // setCurrentPage(0);
    
    if (searchTerm.trim() === '' && cityToSearch.trim() === '') {
      setTotalPages(Math.ceil(totaloutreaches / outreachPerPages));
    }
  };
  
  const handleSearchChange = (e) => {
    const value = e.target.value.trim();
    setSearchTerm(value);
      resetPagination();
  };

  useEffect(() => {
    getDisplayCount();
  },[pastOutreachEventState.pageHistory.length])

  const handleCityChange = (e) => {
    setCityToSearch(e.target.value.trim());
    resetPagination();
  };

  const handleClickPrev = () => {
    //if (currentPage === 0) return;
    //setCurrentPage((prev) => prev - 1);
    setPastOutreachEventState((prev) => ({ ...prev, direction: "" }));
    setTimeout(() => {
      setPastOutreachEventState((prev) => ({ ...prev, direction: "prev" }));
    }, 0);
  };

  const handleClickNext = () => {
    //if (currentPage >= totalPages - 1) return;
    //setCurrentPage((prev) => prev + 1);
    setPastOutreachEventState((prev) => ({ ...prev, direction: "" }));
    setTimeout(() => {
      setPastOutreachEventState((prev) => ({ ...prev, direction: "next" }));
    }, 0);
  };

  const getTotalToDisplay = () => {
    if (isFiltered) {
      return filteredTotal > 0 ? filteredTotal : events.length;
    } else {
      return totaloutreaches;
    }
  };
  console.log(pastOutreachEventState.searchTerm, pastOutreachEventState);
  const getDisplayCount = () => {
    if (isFiltered) {
      return events.length;
    } else {
      if(((pastOutreachEventState.pageHistory.length) * outreachPerPages) > totaloutreaches){
        return totaloutreaches;
      }
      else return (pastOutreachEventState.pageHistory.length) * outreachPerPages;
    }
  };

  const displayCount = getDisplayCount();
  const totalToDisplay = getTotalToDisplay();

  const renderPaginationButtons = () => {
    const buttons = [];

    if ((pastOutreachEventState.pageHistory.length) * outreachPerPages > outreachPerPages) {
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

    if ((pastOutreachEventState.pageHistory.length) * outreachPerPages < totaloutreaches) {
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
                  placeholder="Search by description..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="form-input py-1 px-3 border border-[#CACACA] rounded-lg text-sm"
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
                    <DatePicker
                      selected={selectedStartDate}
                      onChange={(date) => {
                        resetPagination();
                        setSelectedStartDate(date);
                        setPastOutreachEventState((prev)=>({...prev, startDateTime: date }));
                      }}
                      selectsStart
                      startDate={selectedStartDate}
                      endDate={selectedEndDate}
                      placeholderText="Select Start Date"
                      className="py-1 px-1 border border-gray-300 rounded-lg text-sm w-[100px]"
                    />
                    <span>|</span>
                    <DatePicker
                      selected={selectedEndDate}
                      onChange={(date) => {
                        resetPagination();
                        setSelectedEndDate(date);
                        setPastOutreachEventState((prev)=>({...prev, endDateTime: date }));
                      }}
                      selectsEnd
                      startDate={selectedStartDate}
                      endDate={selectedEndDate}
                      placeholderText="Select End Date"
                      className="py-1 px-1 border border-gray-300 rounded-lg text-sm w-[100px]"
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
              Showing {displayCount} of {totalToDisplay} events
            </p>
            <div className="flex justify-end">{renderPaginationButtons()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPastOutreachEvents;