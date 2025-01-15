import React, { useState, useEffect, useRef } from "react";
import OutreachVisitLogCard from "./Community/OutreachVisitLogCard";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { fetchPublicVisitLogs } from "./VisitLogCardService";
import EventCardSkeleton from "./Skeletons/EventCardSkeleton";
import { parse } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import verifiedPurple from "../images/verified_purple.png";
import verifiedGreen from "../images/verified.png";
import verifiedBlue from "../images/verified_blue.png";
import verifiedYellow from "../images/verified_yellow.png";

const AllOutreachVisitLog = () => {
  const navigate = useNavigate();
  const [visitLogs, setVisitLogs] = useState([]);
  const [filteredVisitLogs, setFilteredVisitLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [startDate, setStartDate] = useState(new Date("2024-01-02"));
  const [endDate, setEndDate] = useState(new Date());
  const searchRef = useRef("");
  const searchCity = useRef(""); // Reference for the search city input

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 6;

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
      visitLogs.filter((x) => {
        return (
          (x.title && x.title.toLowerCase().includes(searchValue)) ||
          (x.userName && x.userName.toLowerCase().includes(searchValue)) ||
          (x.location?.city &&
            x.location.city.toLowerCase().includes(searchValue)) ||
          (x.description && x.description.toLowerCase().includes(searchValue))
        );
      })
    );
  };

  const handleSortChange = (e) => {
    setFilteredVisitLogs(filteredVisitLogs);
    const sortBy = e.target.value;
    setSortOption(sortBy);
    setFilteredVisitLogs(visitLogs);
  };

  // Handle search city input change
  const searchCityChange = () => {
    const searchValue = searchCity.current.value.toLowerCase();
    setFilteredVisitLogs(
      visitLogs.filter((x) =>
        x.location.city.toLowerCase().includes(searchValue)
      )
    );
  };

  const filterByDate = () => {
    const sortedLogs = visitLogs.filter((log) => {
      const dateFormat = "MMM d, yyyy EEE hh:mm a"; // Define the date format
      const logDate = parse(log.eventDate, dateFormat, new Date());
      console.log(log.eventDate);
      if (startDate && logDate < startDate) return false;
      if (endDate && logDate > endDate) return false;
      return true;
    });

    setFilteredVisitLogs(sortedLogs);
  };

  useEffect(() => {
    if (sortOption === "datePeriod") {
      filterByDate();
    }
  }, [startDate, endDate, sortOption]);

  // Get current logs based on pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredVisitLogs.slice(indexOfFirstLog, indexOfLastLog);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const returnTarget = "/";
  const returnText = "Return to Home";

  const totalPages = Math.ceil(filteredVisitLogs.length / logsPerPage);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const renderPaginationButtons = () => {
    const buttons = [];
    const pageRange = 1;
    // ...Array(
    //   Math.ceil(filteredVisitLogs.length / logsPerPage)
    // ).keys(),

    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => onPageChange(currentPage - 1)}
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
        >
          <IoIosArrowBack />
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
      buttons.push(
        <span key="ellipsis-start" className="mx-1">
          ...
        </span>
      );
    }

    for (
      let i = Math.max(1, currentPage - pageRange);
      i <= Math.min(totalPages, currentPage + pageRange);
      i++
    ) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`mx-1 px-3 py-1 rounded-full ${
            currentPage === i
              ? "bg-[#1F0A58] text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - pageRange) {
      buttons.push(
        <span key="ellipsis-end" className="mx-1">
          ...
        </span>
      );
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
                Visit Logs
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
                  style={{ borderRadius: "0px" }}
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

              {/* Sort by filter */}
              <div className="flex items-center">
                <label className="mr-2 text-gray-500 font-medium">
                  Filter:
                </label>
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className="form-select w-fit md:w-[8rem] py-2 px-2 border border-[#CACACA] text-gray-500 appearance-none block rounded-2xl"
                  style={{ borderRadius: "0px" }}
                >
                  <option value="">None</option>

                  <option value="city">City</option>
                  <option value="datePeriod">Date Period</option>
                </select>
              </div>

              {/* Conditional rendering of City search */}
              {sortOption === "city" && (
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
              {sortOption === "datePeriod" && (
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select Start Date"
                  className="form-input w-fit py-2 px-2 border border-[#CACACA] text-gray-500 appearance-none block"
                />
              )}
              {sortOption === "datePeriod" && (
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select End Date"
                  className="form-input w-fit py-2 px-2 border border-[#CACACA] text-gray-500 appearance-none block"
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-start space-x-4 mt-4">
            {/* Chapter Leader */}
            <div className="flex items-center space-x-2">
              <img
                src={verifiedGreen}
                alt="Chapter Leader"
                className="w-6 h-6"
              />
              <span className="text-sm font-medium text-gray-700">
                Chapter Leader
              </span>
            </div>
            {/* Streetcare Member */}
            <div className="flex items-center space-x-2">
              <img
                src={verifiedPurple}
                alt="Streetcare Member"
                className="w-6 h-6"
              />
              <span className="text-sm font-medium text-gray-700">
                Streetcare Member
              </span>
            </div>
            {/* Streetcare Hub Leader */}
            <div className="flex items-center space-x-2">
              <img
                src={verifiedBlue}
                alt="Streetcare Hub Leader"
                className="w-6 h-6"
              />
              <span className="text-sm font-medium text-gray-700">
                Streetcare Hub Leader
              </span>
            </div>
            {/* Account holder */}
            <div className="flex items-center space-x-2">
              <img
                src={verifiedYellow}
                alt="Account holder"
                className="w-6 h-6"
              />
              <span className="text-sm font-medium text-gray-700">
                Account holder
              </span>
            </div>
          </div>
          {isLoading ? (
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : (
            <>
              <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
                {currentLogs.length > 0 ? (
                  currentLogs.map((visitLogData) => (
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
              {/* Pagination */}
              <div className="flex justify-center mt-8">
                {renderPaginationButtons()}
                {/* {[
                  ...Array(
                    Math.ceil(filteredVisitLogs.length / logsPerPage)
                  ).keys(),
                ].map((i) => (
                  <button
                    key={i + 1}
                    className={`mx-2 px-4 py-2 border rounded-full ${currentPage === i + 1
                        ? "bg-[#E0D7EC] text-black border-[#1F0A58]"
                        : "bg-white text-black border-[#9B82CF]"
                      }`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))} */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOutreachVisitLog;
