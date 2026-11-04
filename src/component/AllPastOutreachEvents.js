import React, { useState, useEffect, useCallback, useRef } from "react";
import OutreachEventCard from "./Community/OutreachEventCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import EventCardSkeleton from "./Skeletons/EventCardSkeleton";
import UserTypeInfo from "./UserTypeInfo";
import {
  collection,
  query,
  where,
  orderBy,
  getCountFromServer,
} from "firebase/firestore";
import { fetchPaginatedPastOutreachEvents } from "./EventCardService.js";
import { db } from "./firebase";

import collectionMapping from "../utils/firestoreCollections.js";

const outreachEvents_collection = collectionMapping.outreachEvents;

const OUTREACHES_PER_PAGE = 6;

const createDefaultCursorFields = () => ({
  lastVisible: null,
  pageSize: OUTREACHES_PER_PAGE,
  direction: "next",
  pageHistory: [],
});

const cloneCursorFields = (fields) => ({
  lastVisible: fields?.lastVisible || null,
  pageSize: fields?.pageSize || OUTREACHES_PER_PAGE,
  direction: fields?.direction || "next",
  pageHistory: Array.isArray(fields?.pageHistory)
    ? [...fields.pageHistory]
    : [],
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
    cachedState?.debouncedSearchTerm ?? cachedState?.searchTerm ?? "",
  );

  const [cityToSearch, setCityToSearch] = useState(
    cachedState?.cityToSearch || "",
  );
  const [debouncedCityToSearch, setDebouncedCityToSearch] = useState(
    cachedState?.debouncedCityToSearch ?? cachedState?.cityToSearch ?? "",
  );

  const [startDateTime, setStartDateTime] = useState(defaultStartDate);
  const [selectedStartDate, setSelectedStartDate] = useState(
    defaultSelectedStartDate,
  );
  const [endDateTime, setEndDateTime] = useState(defaultEndDate);
  const [selectedEndDate, setSelectedEndDate] = useState(
    defaultSelectedEndDate,
  );
 const [filterType, setFilterType] = useState(
  cachedState?.filterType || "",
);

  const [totaloutreaches, setTotalOutreaches] = useState(
    cachedState?.totaloutreaches || 0,
  );
  const [filteredTotal, setFilteredTotal] = useState(
    cachedState?.filteredTotal || 0,
  );
  const [currentPage, setCurrentPage] = useState(
    cachedState?.currentPage ?? initialPageIndex,
  );
  const [totalPages, setTotalPages] = useState(cachedState?.totalPages || 0);
  const [isFiltered, setIsFiltered] = useState(
    cachedState?.isFiltered || false,
  );
  const [cursorFields, setCursorFields] = useState(() =>
    cachedState?.cursorFields
      ? { ...cloneCursorFields(cachedState.cursorFields), direction: "current" }
      : createDefaultCursorFields(),
  );

  const navigate = useNavigate();
  const directionResetTimeoutRef = useRef(null);
  const hasSyncedUrlRef = useRef(false);
  const currentPageRef = useRef(currentPage);

  const triggerDirectionChange = useCallback((direction) => {
    setCursorFields((prev) => ({
      ...prev,
      direction: "",
    }));

    if (directionResetTimeoutRef.current) {
      clearTimeout(directionResetTimeoutRef.current);
    }

    directionResetTimeoutRef.current = setTimeout(() => {
      setCursorFields((prev) => ({
        ...prev,
        direction,
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

  const returnTarget = -1;
  const returnText = "Go Back";

  const handleGoBack = () => {
    cachedPastOutreachState = null;
    if (window.history.length > 2) {
      navigate(returnTarget);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const hasActiveFilter =
      searchTerm.trim() !== "" || cityToSearch.trim() !== "";

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
          search: newSearch ? `?${newSearch}` : "",
        },
        { replace },
      );
    },
    [location.pathname, navigate],
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
            orderBy("eventDate", "desc"),
          );
        } else {
          countQuery = query(
            collection(db, outreachEvents_collection),
            where("status", "==", "approved"),
            where("location.city", "==", cityToSearch),
            where("eventDate", "<", new Date()),
            where("eventDate", ">=", startDateTime),
            where("eventDate", "<=", endDateTime),
            orderBy("eventDate", "desc"),
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
        const { fetchedEvents, lastVisible, pageHistory, totalFilteredEvents } =
          await fetchPaginatedPastOutreachEvents(
            debouncedCityToSearch,
            startDateTime,
            endDateTime,
            debouncedSearchTerm,
            cursorFields.lastVisible,
            cursorFields.pageSize,
            cursorFields.direction,
            cursorFields.pageHistory,
          );

        setEvents(fetchedEvents);
        setCursorFields((prev) => ({
          ...prev,
          lastVisible: lastVisible,
          pageHistory: pageHistory,
        }));

        if (
          debouncedSearchTerm.trim() !== "" ||
          debouncedCityToSearch.trim() !== ""
        ) {
          setFilteredTotal(totalFilteredEvents || 0);
          setTotalPages(
            Math.ceil((totalFilteredEvents || 0) / OUTREACHES_PER_PAGE),
          );
        }
      } catch (error) {
        setErrorMessage(error.message);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [
    cursorFields.direction,
    debouncedCityToSearch,
    startDateTime,
    endDateTime,
    debouncedSearchTerm,
  ]);

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
      cachedPastOutreachState?.scrollPosition ??
      (typeof window !== "undefined" ? window.scrollY : 0);

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
      scrollPosition: previousScrollPosition,
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
    cursorFields,
  ]);

  const resetPagination = () => {
    setCursorFields(createDefaultCursorFields());
    setCurrentPage(0);

    if (searchTerm.trim() === "" && cityToSearch.trim() === "") {
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
        </button>,
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
        </button>,
      );
    }
    return buttons;
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl bg-white text-black">
        <div
          className="absolute flex mt-[-50px] items-center cursor-pointer"
          onClick={handleGoBack}
        >
          <IoIosArrowBack className="w-6 h-6" />
          <p className="font-bricolage text-xl font-bold leading-7">
            {returnText}
          </p>
        </div>

        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
          <div className="flex items-center gap-4 mb-6 w-full">
            <div>
              <p className="font-bricolage font-medium text-[34px] xl:text-[38px] text-[#1F0A58] whitespace-nowrap">
                Past Outreach Events
              </p>
            </div>

            <div className="flex items-center gap-3 flex-nowrap shrink-0">
              <label className="relative text-gray-400 focus-within:text-gray-600">
                <input
                  type="text"
                  placeholder="Search by Description"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="form-input w-[210px] py-2 px-2 border border-[#CACACA] placeholder-gray-400 text-gray-500 block pl-10 rounded-2xl"
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
                  value={filterType}
                  onChange={(e) => {
                    setFilterType(e.target.value);
                    resetPagination();
                  }}
                  className="form-select w-fit md:w-[8rem] py-2 px-3 border border-[#CACACA] text-gray-500 bg-white block rounded-2xl"
                >
                  <option value="">None</option>
                  <option value="date">Date Period</option>
                  <option value="city">City</option>
                </select>
              </div>

              {filterType === "date" && (
                <div className="flex items-center gap-2">
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
                    placeholderText="Select Start Date"
                    className="form-input w-[125px] py-2 px-2 border border-[#CACACA] text-gray-500 block rounded-2xl"
                  />

                  <p>To</p>

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
                    placeholderText="Select End Date"
                    className="form-input w-[125px] py-2 px-2 border border-[#CACACA] text-gray-500 block rounded-2xl"
                  />
                </div>
              )}

              {filterType === "city" && (
                <input
                  type="text"
                  value={cityToSearch}
                  onChange={handleCityChange}
                  placeholder="Search City"
                  className="form-input w-fit md:w-[12rem] lg:w-[8rem] py-2 px-2 border border-[#CACACA] placeholder-gray-400 text-gray-500 block pl-2 rounded-2xl"
                />
              )}
            </div>
          </div>

          <UserTypeInfo />

          <div className="flex justify-between items-center mt-8 w-full mb-11">
            <p className="text-gray-600"></p>
            <div className="flex justify-end">{renderPaginationButtons()}</div>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center mt-4">{errorMessage}</p>
          )}

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