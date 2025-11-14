import React, { useState, useEffect, useCallback, useRef } from "react";
import OutreachEventCard from "./Community/OutreachEventCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation } from "react-router-dom";
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
import collectionMapping from "../utils/firestoreCollections.js";

// Utility function to get current timezone abbreviation
const getCurrentTimezone = () => {
  return new Intl.DateTimeFormat("en-US", {
    timeZoneName: "short",
  })
    .formatToParts(new Date())
    .find((part) => part.type === "timeZoneName")?.value || "";
};

const outreachEvents_collection = collectionMapping.outreachEvents;

const OUTREACHES_PER_PAGE = 6;

const createDefaultCursorFields = () => ({
  lastVisible: null,
  pageSize: OUTREACHES_PER_PAGE,
  direction: "next",
  pageHistory: []
});

const cloneCursorFields = (fields) => ({
  lastVisible: fields?.lastVisible || null,
  pageSize: fields?.pageSize || OUTREACHES_PER_PAGE,
  direction: fields?.direction || "next",
  pageHistory: Array.isArray(fields?.pageHistory) ? [...fields.pageHistory] : []
});

let cachedPastOutreachState = null;

const parsePageParam = (search) => {
  const params = new URLSearchParams(search);
  const pageValue = parseInt(params.get("page") || "1", 10);
  if (Number.isNaN(pageValue) || pageValue < 1) {
    return 1;
  }
  return pageValue;
};

const AllPastOutreachEvents = () => {
  const cachedState = cachedPastOutreachState;
  const location = useLocation();
  const initialPageFromUrl = parsePageParam(location.search);
  const initialPageIndex = Math.max(initialPageFromUrl - 1, 0);

  const defaultStartDate = cachedState?.startDateTime
    ? new Date(cachedState.startDateTime)
    : (() => {
        const d = new Date();
        d.setDate(d.getDate() - 7);
        return d;
      })();

  const defaultEndDate = cachedState?.endDateTime
    ? new Date(cachedState.endDateTime)
    : new Date();

  const defaultSelectedStartDate = cachedState?.selectedStartDate
    ? new Date(cachedState.selectedStartDate)
    : defaultStartDate;

  const defaultSelectedEndDate = cachedState?.selectedEndDate
    ? new Date(cachedState.selectedEndDate)
    : defaultEndDate;

  const [events, setEvents] = useState(cachedState?.events || []);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState(cachedState?.searchTerm || "");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(
    cachedState?.debouncedSearchTerm ?? cachedState?.searchTerm ?? ""
  );

  const [cityToSearch, setCityToSearch] = useState(
    cachedState?.cityToSearch || ""
  );
  const [debouncedCityToSearch, setDebouncedCityToSearch] = useState(
    cachedState?.debouncedCityToSearch ??
      cachedState?.cityToSearch ??
      ""
  );

  const [startDateTime, setStartDateTime] = useState(defaultStartDate);
  const [selectedStartDate, setSelectedStartDate] = useState(
    defaultSelectedStartDate
  );
  const [endDateTime, setEndDateTime] = useState(defaultEndDate);
  const [selectedEndDate, setSelectedEndDate] = useState(defaultSelectedEndDate);
  const [filterType, setFilterType] = useState(cachedState?.filterType || "date");

  const [totaloutreaches, setTotalOutreaches] = useState(
    cachedState?.totaloutreaches || 0
  );
  const [filteredTotal, setFilteredTotal] = useState(
    cachedState?.filteredTotal || 0
  );
  const [currentPage, setCurrentPage] = useState(
    cachedState?.currentPage ?? initialPageIndex
  );
  const [totalPages, setTotalPages] = useState(cachedState?.totalPages || 0);
  const [isFiltered, setIsFiltered] = useState(cachedState?.isFiltered || false);
  const [cursorFields, setCursorFields] = useState(() =>
    cachedState?.cursorFields
      ? { ...cloneCursorFields(cachedState.cursorFields), direction: "current" }
      : createDefaultCursorFields()
  );

  const navigate = useNavigate();
  const directionResetTimeoutRef = useRef(null);
  const hasSyncedUrlRef = useRef(false);
  const currentPageRef = useRef(currentPage);

  const triggerDirectionChange = useCallback((direction) => {
    setCursorFields((prev) => ({
      ...prev,
      direction: ""
    }));

    if (directionResetTimeoutRef.current) {
      clearTimeout(directionResetTimeoutRef.current);
    }

    directionResetTimeoutRef.current = setTimeout(() => {
      setCursorFields((prev) => ({
        ...prev,
        direction
      }));
    }, 0);
  }, []);

  useEffect(() => {
    return () => {
      if (directionResetTimeoutRef.current) {
        clearTimeout(directionResetTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  const handleNavigateHome = () => {
    cachedPastOutreachState = null;
    navigate("/");
  };

  useEffect(() => {
    const hasActiveFilter = searchTerm.trim() !== '' || cityToSearch.trim() !== '';
    
    if (!hasActiveFilter && isFiltered) {
      setTotalPages(Math.ceil(totaloutreaches / OUTREACHES_PER_PAGE));
    }
    
    setIsFiltered(hasActiveFilter);
  }, [searchTerm, cityToSearch, totaloutreaches]);

  const updateUrlPage = useCallback(
    (pageIndex, replace = false) => {
      if (typeof window === "undefined") {
        return;
      }
      const currentSearchValue = window.location.search;
      const params = new URLSearchParams(currentSearchValue);
      const pageNumber = pageIndex + 1;
      if (pageNumber <= 1) {
        params.delete("page");
      } else {
        params.set("page", String(pageNumber));
      }
      const currentSearch = currentSearchValue.startsWith("?")
        ? currentSearchValue.slice(1)
        : currentSearchValue;
      const newSearch = params.toString();
      if (newSearch === currentSearch) {
        return;
      }
      navigate(
        {
          pathname: location.pathname,
          search: newSearch ? `?${newSearch}` : ""
        },
        { replace }
      );
    },
    [location.pathname, navigate]
  );

  useEffect(() => {
    updateUrlPage(currentPage, !hasSyncedUrlRef.current);
    hasSyncedUrlRef.current = true;
  }, [currentPage, updateUrlPage]);

  useEffect(() => {
    const pageFromUrl = Math.max(parsePageParam(location.search) - 1, 0);
    const currentPageFromState = currentPageRef.current;
    if (pageFromUrl !== currentPageFromState) {
      const direction = pageFromUrl > currentPageFromState ? "next" : "prev";
      setCurrentPage(pageFromUrl);
      triggerDirectionChange(direction);
    }
  }, [location.search, triggerDirectionChange]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
  
    return () => clearTimeout(delaySearch);
  }, [searchTerm]);
  
  useEffect(() => {
    const delayCitySearch = setTimeout(() => {
      setDebouncedCityToSearch(cityToSearch);
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
            where("eventDate", ">=", startDateTime),
            where("eventDate", "<=", endDateTime),
            orderBy("eventDate", "desc")
          );
        } else {
          countQuery = query(
            collection(db, outreachEvents_collection),
            where("status", "==", "approved"),
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
        setTotalPages(Math.ceil(tot / OUTREACHES_PER_PAGE));
      } catch (error) {
        console.error("Error fetching total count:", error);
      }
    };
    getTotalCount();
  }, [cityToSearch, startDateTime, endDateTime]);

  useEffect(() => {
    if (!cursorFields.direction) {
      return;
    }

    const fetchData = async () => {
      const shouldShowLoader = !(
        cursorFields.direction === "current" && events.length > 0
      );

      if (shouldShowLoader) {
        setIsLoading(true);
      }

      setErrorMessage("");
  
      try {
        const {
          fetchedEvents,
          lastVisible,
          pageHistory,
          totalFilteredEvents
        } = await fetchPaginatedPastOutreachEvents(
          debouncedCityToSearch,
          startDateTime,
          endDateTime,
          debouncedSearchTerm,
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

        if (debouncedSearchTerm.trim() !== '' || debouncedCityToSearch.trim() !== '') {
          setFilteredTotal(totalFilteredEvents || 0);
          setTotalPages(Math.ceil((totalFilteredEvents || 0) / OUTREACHES_PER_PAGE));
        }
      } catch (error) {
        setErrorMessage(error.message);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [cursorFields.direction, debouncedCityToSearch, startDateTime, endDateTime, debouncedSearchTerm]);

  useEffect(() => {
    if (typeof window !== "undefined" && cachedState?.scrollPosition !== undefined) {
      window.scrollTo(0, cachedState.scrollPosition);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleScroll = () => {
      cachedPastOutreachState = {
        ...(cachedPastOutreachState || {}),
        scrollPosition: window.scrollY,
      };
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const previousScrollPosition =
      cachedPastOutreachState?.scrollPosition ?? (typeof window !== "undefined" ? window.scrollY : 0);

    cachedPastOutreachState = {
      events,
      searchTerm,
      debouncedSearchTerm,
      cityToSearch,
      debouncedCityToSearch,
      startDateTime,
      selectedStartDate,
      endDateTime,
      selectedEndDate,
      filterType,
      totaloutreaches,
      filteredTotal,
      currentPage,
      totalPages,
      isFiltered,
      cursorFields: cloneCursorFields(cursorFields),
      scrollPosition: previousScrollPosition
    };
  }, [
    events,
    searchTerm,
    debouncedSearchTerm,
    cityToSearch,
    debouncedCityToSearch,
    startDateTime,
    selectedStartDate,
    endDateTime,
    selectedEndDate,
    filterType,
    totaloutreaches,
    filteredTotal,
    currentPage,
    totalPages,
    isFiltered,
    cursorFields
  ]);
  
  const resetPagination = () => {
    setCursorFields(createDefaultCursorFields());
    setCurrentPage(0);
    
    if (searchTerm.trim() === '' && cityToSearch.trim() === '') {
      setTotalPages(Math.ceil(totaloutreaches / OUTREACHES_PER_PAGE));
    }
  };
  
  const handleSearchChange = (e) => {
    const value = e.target.value.trim();
    setSearchTerm(value);
      resetPagination();
  };

  const handleStartDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setSelectedStartDate(newDate);
    setStartDateTime(newDate);
    resetPagination();
  };
  
  const handleEndDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setSelectedEndDate(newDate);
    setEndDateTime(newDate);
    resetPagination();
  };

  // const handleStartDateChange = (e) => {
  //   setSelectedStartDate(new Date(e.target.value));
  // };

  // const applyStartDateFilter = () => {
  //   setStartDateTime(selectedStartDate);
  //   resetPagination();
  // };

  // const handleEndDateChange = (e) => {
  //   setSelectedEndDate(new Date(e.target.value));
  // };

  // const applyEndDateFilter = () => {
  //   setEndDateTime(selectedEndDate);
  // resetPagination();
  // };

  const handleCityChange = (e) => {
    setCityToSearch(e.target.value.trim());
    resetPagination();
  };
  
  const handleClickPrev = () => {
    if (currentPage === 0) return;
    setCurrentPage((prev) => prev - 1);
    triggerDirectionChange("prev");
  };
  
  const handleClickNext = () => {
    if (currentPage >= totalPages - 1) return;
    setCurrentPage((prev) => prev + 1);
    triggerDirectionChange("next");
  };

  const getTotalToDisplay = () => {
    if (isFiltered) {
      return filteredTotal > 0 ? filteredTotal : events.length;
    } else {
      return totaloutreaches;
    }
  };

  const getDisplayCount = () => {
    if (isFiltered) {
      return events.length;
    } else {
      return Math.min((currentPage + 1) * OUTREACHES_PER_PAGE, totaloutreaches);
    }
  };

  const displayCount = getDisplayCount();
  const totalToDisplay = getTotalToDisplay();

  const renderPaginationButtons = () => {
    const buttons = [];

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
          onClick={handleNavigateHome}
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
                        setSelectedStartDate(date);
                        setStartDateTime(date);
                        resetPagination();
                      }}
                      selectsStart
                      startDate={selectedStartDate}
                      endDate={selectedEndDate}
                      placeholderText={`Select Start Date (${getCurrentTimezone()})`}
                      className="py-1 px-1 border border-gray-300 rounded-lg text-sm w-[100px]"
                    />
                    <span>|</span>
                    <DatePicker
                      selected={selectedEndDate}
                      onChange={(date) => {
                        setSelectedEndDate(date);
                        setEndDateTime(date);
                        resetPagination();
                      }}
                      selectsEnd
                      startDate={selectedStartDate}
                      endDate={selectedEndDate}
                      placeholderText={`Select End Date (${getCurrentTimezone()})`}
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
