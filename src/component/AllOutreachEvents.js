import React, { useState, useEffect, useRef, useCallback } from "react";
import OutreachEventCard from "./Community/OutreachEventCard";
import { useNavigate, useLocation } from "react-router-dom";
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

let cachedUpcomingOutreachState = null;

const parsePageParam = (search) => {
  const params = new URLSearchParams(search);
  const pageValue = parseInt(params.get("page") || "1", 10);
  if (Number.isNaN(pageValue) || pageValue < 1) {
    return 1;
  }
  return pageValue;
};

const AllOutreachEvents = ({ loggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const cachedState = cachedUpcomingOutreachState;
  const initialPageFromUrl = parsePageParam(location.search);

  const defaultStartDate = cachedState?.startDate
    ? new Date(cachedState.startDate)
    : new Date();

  const defaultEndDate = cachedState?.endDate
    ? new Date(cachedState.endDate)
    : (() => {
        const d = new Date();
        d.setDate(d.getDate() + 7);
        return d;
      })();

  const [cursorFields, setCursorFields] = useState(() =>
    cachedState?.cursorFields
      ? { ...cloneCursorFields(cachedState.cursorFields), direction: "current" }
      : createDefaultCursorFields()
  );
  
  const [currentPage, setCurrentPage] = useState(
    cachedState?.currentPage ?? initialPageFromUrl
  );
  const [events, setEvents] = useState(cachedState?.events || []);
  const [isLoading, setIsLoading] = useState(!(cachedState?.events?.length));
  const [totalPages, setTotalPages] = useState(cachedState?.totalPages || 0);

  const [searchDescription, setSearchDescription] = useState(
    cachedState?.searchDescription || ""
  );
  const [debouncedSearchDescription, setDebouncedSearchDescription] = useState(
    cachedState?.debouncedSearchDescription ??
      cachedState?.searchDescription ??
      ""
  );
  const [filterOption, setFilterOption] = useState(cachedState?.filterOption || "");
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [cityToSearch, setCityToSearch] = useState(
    cachedState?.cityToSearch || ""
  );
  const [debouncedCityToSearch, setDebouncedCityToSearch] = useState(
    cachedState?.debouncedCityToSearch ??
      cachedState?.cityToSearch ??
      ""
  );
  const searchCity = useRef("");
  const [errorMessage, setErrorMessage] = useState("");
  const [filteredTotal, setFilteredTotal] = useState(
    cachedState?.filteredTotal || 0
  );
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showWithdrawnModal, setShowWithdrawnModal] = useState(false);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [totalOutreaches, setTotalOutreaches] = useState(
    cachedState?.totalOutreaches || 0
  );
  const [cumulativeEventsCount, setCumulativeEventsCount] = useState(
    cachedState?.cumulativeEventsCount || 0
  );
  const [paginationTrigger, setPaginationTrigger] = useState(
    cachedState?.paginationTrigger || 0
  );

  const searchDescriptionTimer = useRef(null);
  const citySearchTimer = useRef(null);
  const isInitialSearchEffect = useRef(true);
  const isInitialCityEffect = useRef(true);
  const hasSyncedUrlRef = useRef(false);
  const currentPageRef = useRef(currentPage);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    if (searchDescriptionTimer.current) {
      clearTimeout(searchDescriptionTimer.current);
    }
    
    searchDescriptionTimer.current = setTimeout(() => {
      setDebouncedSearchDescription(searchDescription);
      if (isInitialSearchEffect.current) {
        isInitialSearchEffect.current = false;
      } else {
        resetPagination();
      }
    }, 500);
    
    return () => {
      if (searchDescriptionTimer.current) {
        clearTimeout(searchDescriptionTimer.current);
      }
    };
  }, [searchDescription]);

  useEffect(() => {
    if (citySearchTimer.current) {
      clearTimeout(citySearchTimer.current);
    }
    
    citySearchTimer.current = setTimeout(() => {
      setDebouncedCityToSearch(cityToSearch);
      if (isInitialCityEffect.current) {
        isInitialCityEffect.current = false;
      } else {
        resetPagination();
      }
    }, 500);
    
    return () => {
      if (citySearchTimer.current) {
        clearTimeout(citySearchTimer.current);
      }
    };
  }, [cityToSearch]);

  useEffect(() => {
    const getTotalCount = async () => {
      try {
        let countQuery;
        if (filterOption === "city" && debouncedCityToSearch.trim() !== "") {
          countQuery = query(
            collection(db, outreachEvents_collection),
            where("status", "==", "approved"),
            where("location.city", "==", debouncedCityToSearch),
            where("eventDate", ">=", new Date()),
            orderBy("eventDate", "asc")
          );
        } else if (filterOption === "datePeriod") {
          countQuery = query(
            collection(db, outreachEvents_collection),
            where("status", "==", "approved"),
            where("eventDate", ">=", startDate),
            where("eventDate", "<=", endDate),
            orderBy("eventDate", "asc")
          );
        } else {
          countQuery = query(
            collection(db, outreachEvents_collection),
            where("status", "==", "approved"),
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
  }, [filterOption, startDate, endDate, debouncedCityToSearch]);
  

  useEffect(() => {
    const getEvents = async () => {
      const shouldShowLoader = !(
        cursorFields.direction === "current" &&
        events.length > 0
      );

      if (shouldShowLoader) {
        setIsLoading(true);
      }

      setErrorMessage("");

      try {
        const {
          events: fetchedEvents,
          lastVisible,
          pageHistory,
          totalFilteredEvents
        } = await fetchPaginatedEvents(
          filterOption === "city" ? debouncedCityToSearch : "",
          filterOption === "datePeriod" ? startDate : new Date(),
          filterOption === "datePeriod" ? endDate : new Date("9999-12-31"),
          debouncedSearchDescription,
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

        if (
          debouncedSearchDescription.trim() !== "" ||
          debouncedCityToSearch.trim() !== ""
        ) {
          setFilteredTotal(totalFilteredEvents || 0);
          setTotalPages(
            Math.ceil((totalFilteredEvents || 0) / OUTREACHES_PER_PAGE)
          );
        } else {
          setFilteredTotal(0);
        }
      } catch (error) {
        setErrorMessage(error.message);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };
    getEvents();
  }, [paginationTrigger, debouncedCityToSearch, startDate, endDate, debouncedSearchDescription, filterOption]);
  
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      cachedState?.scrollPosition !== undefined
    ) {
      window.scrollTo(0, cachedState.scrollPosition);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleScroll = () => {
      cachedUpcomingOutreachState = {
        ...(cachedUpcomingOutreachState || {}),
        scrollPosition: window.scrollY,
      };
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const previousScrollPosition =
      cachedUpcomingOutreachState?.scrollPosition ??
      (typeof window !== "undefined" ? window.scrollY : 0);

    cachedUpcomingOutreachState = {
      events,
      currentPage,
      totalPages,
      searchDescription,
      debouncedSearchDescription,
      filterOption,
      startDate,
      endDate,
      cityToSearch,
      debouncedCityToSearch,
      filteredTotal,
      totalOutreaches,
      cursorFields: cloneCursorFields(cursorFields),
      paginationTrigger,
      cumulativeEventsCount,
      scrollPosition: previousScrollPosition
    };
  }, [
    events,
    currentPage,
    totalPages,
    searchDescription,
    debouncedSearchDescription,
    filterOption,
    startDate,
    endDate,
    cityToSearch,
    debouncedCityToSearch,
    filteredTotal,
    totalOutreaches,
    cursorFields,
    paginationTrigger,
    cumulativeEventsCount
  ]);

  const updateUrlPage = useCallback(
    (page, replace = false) => {
      if (typeof window === "undefined") {
        return;
      }
      const currentSearchValue = window.location.search;
      const params = new URLSearchParams(currentSearchValue);
      if (page <= 1) {
        params.delete("page");
      } else {
        params.set("page", String(page));
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
          search: newSearch ? `?${newSearch}` : "",
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
    const pageFromUrl = parsePageParam(location.search);
    const currentPageFromState = currentPageRef.current;
    if (pageFromUrl !== currentPageFromState) {
      const direction = pageFromUrl > currentPageFromState ? "next" : "prev";
      setCursorFields((prev) => ({
        ...prev,
        direction,
      }));
      setCurrentPage(pageFromUrl);
      setPaginationTrigger((prev) => prev + 1);
    }
  }, [location.search]);
  
  useEffect(() => {
    setTotalPages(Math.ceil(totalOutreaches / OUTREACHES_PER_PAGE));
  }, [totalOutreaches]);

  const resetPagination = () => {
    setCursorFields(createDefaultCursorFields());
    setCurrentPage(1);
    setCumulativeEventsCount(0);
    setPaginationTrigger(prev => prev + 1);
  };
  
  const handleFilterChange = (e) => {
    const selected = e.target.value;
    setFilterOption(selected);
    resetPagination();
    setTotalOutreaches(0);
  };

  const getTotalToDisplay = () => {
    if (debouncedSearchDescription.trim() !== "" || debouncedCityToSearch.trim() !== "") {
      return filteredTotal > 0 ? filteredTotal : events.length;
    } else {
      return totalOutreaches;
    }
  };

  const getDisplayCount = () => {
    if (debouncedSearchDescription.trim() !== "" || debouncedCityToSearch.trim() !== "") {
      return events.length;
    } else {
      return Math.min(currentPage * OUTREACHES_PER_PAGE, totalOutreaches);
    }
  };

  const displayCount = getDisplayCount();
  const totalToDisplay = getTotalToDisplay();

  const searchCityChange = (e) => {
    setCityToSearch(e.target.value);
  };

  const handleNavigateHome = () => {
    cachedUpcomingOutreachState = null;
    navigate("/");
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
    setCursorFields(prev => ({
      ...prev,
      direction: "next"
    }));
    setPaginationTrigger(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
    setCursorFields(prev => ({
      ...prev,
      direction: "prev"
    }));
    setPaginationTrigger(prev => prev + 1);
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
    
    const hasMoreItems = 
      (debouncedSearchDescription.trim() !== "" || debouncedCityToSearch.trim() !== "" || filterOption === "datePeriod") 
        ? currentPage < totalPages
        : currentPage * cursorFields.pageSize < totalOutreaches;
    
    if (hasMoreItems) {
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
    setSearchDescription(e.target.value);
  };  

  return (
    <div className="relative flex flex-col items-center">
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
        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
          <div className="lg:flex gap-1 justify-between mb-12">
            <div>
              <p className="font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58] lg:mt-2">
                Upcoming Outreach Events
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
                  value={cityToSearch}
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
                      resetPagination();
                    }}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText={`Select Start Date (${getCurrentTimezone()})`}
                    className="form-input w-fit md:w-[9rem] lg:w-[9rem] py-2 px-2 border border-[#CACACA] text-gray-500 block"
                  />
                  <p>To</p>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => {
                      setEndDate(date);
                      resetPagination();
                    }}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText={`Select End Date (${getCurrentTimezone()})`}
                    className="form-input w-fit md:w-[9rem] lg:w-[9rem] py-2 px-2 border border-[#CACACA] text-gray-500 block"
                  />
                </div>
              )}
            </div>
          </div>
          <UserTypeInfo />

          <div className="flex justify-between items-center mt-8 w-full mb-11">
            <p className="text-gray-600">
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
              Showing {displayCount} of {totalToDisplay} events
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
