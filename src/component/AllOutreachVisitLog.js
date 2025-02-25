import React, { useState, useEffect, useRef } from "react";
import OutreachVisitLogCard from "./Community/OutreachVisitLogCard";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { 
  fetchPaginatedPublicVisitLogs,
  getApprovedVisitLogsCount,
  fetchPublicVisitLogs 
} from "./VisitLogCardService";
import EventCardSkeleton from "./Skeletons/EventCardSkeleton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserTypeInfo from "./UserTypeInfo";

const AllOutreachVisitLog = () => {
  const navigate = useNavigate();
  const [filteredVisitLogs, setFilteredVisitLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [startDate, setStartDate] = useState(new Date("2024-01-02"));
  const [endDate, setEndDate] = useState(new Date());
  const [cityToSearch, setCityToSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const logsPerPage = 6;

  // Cursor state for pagination
  const [cursorFields, setCursorFields] = useState({
    lastVisible: null,
    pageSize: logsPerPage,
    direction: "next",
    pageHistory: []
  });

  const searchRef = useRef("");
  const searchCity = useRef(""); // Reference for the search city input
  const [currentPage, setCurrentPage] = useState(1);

  // Get total pages (count) on mount
  useEffect(() => {
    const getTotalPages = async () => {
      let total = await getApprovedVisitLogsCount();
      setTotalPages(total);
    };
    getTotalPages();
  }, []);

  // Fetch visit logs whenever filters or pagination direction change
  useEffect(() => {
    const getVisitLogs = async () => {
      // Set loading state
      setIsLoading(true);
      const visitLogsData = await fetchPublicVisitLogs(
        cityToSearch,
        startDate,
        endDate,
        cursorFields.lastVisible,
        cursorFields.pageSize,
        cursorFields.direction,
        cursorFields.pageHistory
      );
      // Update pagination state using the setter instead of direct mutation
      setCursorFields(prev => ({
        ...prev,
        lastVisible: visitLogsData.lastVisible,
        pageHistory: visitLogsData.pageHistory
      }));
      setFilteredVisitLogs(visitLogsData.visitLogs);
      setIsLoading(false);
    };
    getVisitLogs();
  }, [cityToSearch, startDate, endDate, cursorFields.direction]);

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    setSortOption(sortBy);
    // Reset filters and pagination state when filter changes
    setStartDate(new Date("2024-01-02"));
    setEndDate(new Date());
    setCityToSearch("");
    setCursorFields(prev => ({ ...prev, lastVisible: null, pageHistory: [] }));
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Navigate to next page
  const handleNext = () => {
    onPageChange(currentPage + 1);
    // Reset direction to force an update
    setCursorFields(prev => ({ ...prev, direction: "" })); 
    // Set it to 'next' after a slight delay
    setTimeout(() => {
      setCursorFields(prev => ({ ...prev, direction: "next" }));
    }, 0); 
  };

  // Navigate to previous page
  const handlePrev = () => {
    onPageChange(currentPage - 1);
    setCursorFields(prev => ({ ...prev, direction: "" })); 
    setTimeout(() => {
      setCursorFields(prev => ({ ...prev, direction: "prev" }));
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
    if (currentPage < totalPages) {
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
          <div className="lg:flex justify-between items-center mb-6">
            <div>
              <p className="font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58] lg:mt-2">
                Visit Logs
              </p>
            </div>
            <div className="flex items-center gap-4 mt-6 lg:mt-0">
              <label className="relative text-gray-400 focus-within:text-gray-600">
                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  placeholder="Search..."
                  ref={searchRef}
                  className="form-input w-fit md:w-[20rem] lg:w-[18rem] py-2 px-2 border border-[#CACACA] placeholder-gray-400 text-gray-500 block pl-10 rounded-2xl"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.0"
                  stroke="currentColor"
                  className="w-5 h-5 pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3"
                >
                  <path
                    strokeLinecap="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </label>
              <div className="flex items-center">
                <label className="mr-2 text-gray-500 font-medium">Filter:</label>
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className="form-select w-fit md:w-[8rem] py-2 px-2 border border-[#CACACA] text-gray-500 block rounded-2xl"
                >
                  <option value="">None</option>
                  <option value="city">City</option>
                  <option value="datePeriod">Date Period</option>
                </select>
              </div>
              {sortOption === "city" && (
                <input
                  type="text"
                  name="searchCity"
                  id="searchCity"
                  placeholder="Search City"
                  ref={searchCity}
                  onChange={(e) => setCityToSearch(e.target.value)}
                  className="form-input w-fit md:w-[12rem] lg:w-[8rem] py-2 px-2 border border-[#CACACA] placeholder-gray-400 text-gray-500 block pl-2 rounded-2xl"
                />
              )}
              {sortOption === "datePeriod" && (
                <>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Select Start Date"
                    className="form-input w-fit py-2 px-2 border border-[#CACACA] text-gray-500 block"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Select End Date"
                    className="form-input w-fit py-2 px-2 border border-[#CACACA] text-gray-500 block"
                  />
                </>
              )}
            </div>
          </div>
          <UserTypeInfo />
          {isLoading ? (
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : (
            <>
              <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
                {filteredVisitLogs.length > 0 ? (
                  filteredVisitLogs.map((visitLogData) => (
                    <OutreachVisitLogCard
                      key={visitLogData.id}
                      visitLogCardData={visitLogData}
                    />
                  ))
                ) : (
                  <p className="col-span-3 text-center text-gray-500">
                    No logs found.
                  </p>
                )}
              </div>
              <div className="flex justify-center mt-8">
                {renderPaginationButtons()}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOutreachVisitLog;
