import React, { useState, useEffect, useRef } from "react";
import OutreachVisitLogCard from "./Community/OutreachVisitLogCard";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { fetchPublicVisitLogs } from "./VisitLogCardService";
import EventCardSkeleton from "./Skeletons/EventCardSkeleton";
import { parse } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AllOutreachVisitLog = () => {
  const navigate = useNavigate();
  const [visitLogs, setVisitLogs] = useState([]);
  const [filteredVisitLogs, setFilteredVisitLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [startDate, setStartDate] = useState(new Date("2024-01-02"));
  const [endDate, setEndDate] = useState(new Date());
  const searchRef = useRef("");

  useEffect(() => {
    const getVisitLogs = async () => {
      const visitLogsData = await fetchPublicVisitLogs();
      setVisitLogs(visitLogsData);
      setFilteredVisitLogs(visitLogsData);
      setIsLoading(false);
    };
    getVisitLogs();
  }, []);

  const searchChange = () => {
    const searchValue = searchRef.current.value.toLowerCase();
    setFilteredVisitLogs(
      visitLogs.filter(
        (log) =>
          log.location.city.toLowerCase().includes(searchValue) ||
          log.description.toLowerCase().includes(searchValue)
      )
    );
  };

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    setSortOption(sortBy);
  
    if (sortBy === "city") {
      const sortedLogs = [...filteredVisitLogs].sort((a, b) =>
        a.location.city.localeCompare(b.location.city)
      );
      setFilteredVisitLogs(sortedLogs);
    }
  };

  const filterByDate = () => {
    const sortedLogs = visitLogs.filter((log) => {
      const dateFormat = "MMM d, yyyy EEE hh:mm a"; // Define the date format
      const logDate = parse(log.eventDate, dateFormat, new Date());

      if (startDate && logDate < startDate) return false;
      if (endDate && logDate > endDate) return false;
      return true;
    });

    setFilteredVisitLogs(sortedLogs);
  };

  useEffect(() => {
    if (sortOption === "startDate" || sortOption === "endDate") {
      filterByDate();
    }
  }, [startDate, endDate, sortOption]);

  const returnTarget = "/";
  const returnText = "Return to Home";

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl bg-white text-black">
        <div
          className="absolute flex mt-[-50px] items-center cursor-pointer"
          onClick={() => {
            navigate(returnTarget);
          }}
        >
          <IoIosArrowBack className="w-6 h-6" />
          <p className="font-bricolage text-xl font-bold leading-7">
            {returnText}
          </p>
        </div>
        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
          <div className="lg:flex justify-between items-center mb-6">
            <div>
              <p className="font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58] lg:mt-2">
                All Outreach Visit Logs
              </p>
            </div>
            <div className="flex items-center gap-4 mt-6 lg:mt-0">
              {/* Search input */}
              <label className="relative text-gray-400 focus-within:text-gray-600">
                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  placeholder="Search..."
                  ref={searchRef}
                  onChange={searchChange}
                  className="form-input w-fit md:w-[20rem] lg:w-[18rem] py-2 px-2 border border-[#CACACA] placeholder-gray-400 text-gray-500 appearance-none block pl-10 rounded-2xl"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3"
                >
                  <path
                    strokeLinecap="round"
                    
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </label>

              {/* Sort by filter */}
              <div className="flex items-center">
                <label className="mr-2 text-gray-500 font-medium">Filter:</label>
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className="form-select w-fit md:w-[8rem] py-2 px-2 border border-[#CACACA] text-gray-500 appearance-none block rounded-2xl"
                >
                  <option value="startDate">Start Date</option>            
                  <option value="endDate">End Date</option>
                  <option value="city">City</option>
                </select>
              </div>

              {/* Conditional rendering of DatePickers */}
              {sortOption === "startDate" && (
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select Start Date"
                  className="form-input w-fit py-2 px-2 border border-[#CACACA] text-gray-500 appearance-none block rounded-2xl"
                />
              )}
              {sortOption === "endDate" && (
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select End Date"
                  className="form-input w-fit py-2 px-2 border border-[#CACACA] text-gray-500 appearance-none block rounded-2xl"
                />
              )}
            </div>
          </div>
          {isLoading ? (
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOutreachVisitLog;
