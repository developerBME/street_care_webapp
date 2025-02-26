import React, { useState, useEffect, useRef } from "react";
import OutreachVisitLogCard from "./Community/OutreachVisitLogCard";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { 
  fetchPaginatedPublicVisitLogs,getApprovedVisitLogsCount, fetchPublicVisitLogs } from "./VisitLogCardService";
import EventCardSkeleton from "./Skeletons/EventCardSkeleton";
import { parse } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserTypeInfo from "./UserTypeInfo";
import { Directions } from "@mui/icons-material";

const AllOutreachVisitLog = () => {
  const navigate = useNavigate();
  //const [visitLogs, setVisitLogs] = useState([]);
  const [filteredVisitLogs, setFilteredVisitLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [startDate, setStartDate] = useState(new Date("2024-01-02"));
  const [endDate, setEndDate] = useState(new Date());
  const [cityToSearch, setCityToSearch] = useState("");
  const [searchValue,setSearchValue] = useState("")
  const [totalPages,setTotalPages] = useState(0)
  const logsPerPage = 6;
  const [currentPageLength,setCurrentPageLength]=useState(logsPerPage)
  const [cursorFields,setCursorFields] = useState({"lastVisible":null,"pageSize" : logsPerPage,"direction":"next","pageHistory":[],"pastOutreachRef":null})
  const searchRef = useRef("");
  const searchCity = useRef(""); // Reference for the search city input
  const [filterData,setFilterData] = useState({city:"",startDate:new Date("2024-01-02"),endDate:new Date()})
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  // useEffect(()=>{
  //   const getTotalPages = async()=>{
  //     let total = await getApprovedVisitLogsCount()
  //     setTotalPages(total)
  //   }
  //   getTotalPages()
  // },[])

  useEffect(() => {
    const getVisitLogs = async () => {
      if(!cursorFields.direction)return
      const visitLogsData= await fetchPublicVisitLogs(
        filterData.city,
        filterData.startDate,
        filterData.endDate,
        cursorFields.lastVisible,
        cursorFields.pageSize,
        cursorFields.direction,
        cursorFields.pageHistory);
        cursorFields.lastVisible = visitLogsData.lastVisible;
        cursorFields.pageHistory = visitLogsData.pageHistory;
        setTotalPages(visitLogsData.totalRecords)
        // cursorFields.pastOutreachRef = visitLogsData.pastOutreachRef;
        //setVisitLogs(visitLogsData.visitLogs);
        //console.log(visitLogsData)
        setFilteredVisitLogs(visitLogsData.visitLogs);
        setIsLoading(false);
    };
    getVisitLogs();
  }, [filterData.city, filterData.startDate, filterData.endDate,cursorFields.direction]);
  // const searchChange = () => {
  //   const searchValue = searchRef.current.value.toLowerCase();
  //   setFilteredVisitLogs(
  //     visitLogs.filter((x) => {
  //       return (
  //         (x.title && x.title.toLowerCase().includes(searchValue)) ||
  //         (x.userName && x.userName.toLowerCase().includes(searchValue)) ||
  //         (x.location?.city &&
  //           x.location.city.toLowerCase().includes(searchValue)) ||
  //         (x.description && x.description.toLowerCase().includes(searchValue))
  //       );
  //     })
  //   );
  // };

  const handleSortChange = (e) => {
    //setFilteredVisitLogs(filteredVisitLogs);
    const sortBy = e.target.value;
    setSortOption(sortBy);
    setFilterData({city:"",startDate:new Date("2024-01-02"),endDate:new Date()})
    setCursorFields({"lastVisible":null,"pageSize" : logsPerPage,"direction":"next","pageHistory":[],"pastOutreachRef":null})
    //setFilteredVisitLogs(visitLogs);
  };

  // const filterByDate = () => {
  //   const sortedLogs = visitLogs.filter((log) => {
  //     const dateFormat = "MMM d, yyyy EEE hh:mm a"; // Define the date format
  //     const logDate = parse(log.eventDate, dateFormat, new Date());
  //     console.log(log.eventDate);
  //     if (startDate && logDate < startDate) return false;
  //     if (endDate && logDate > endDate) return false;
  //     return true;
  //   });

  //   setFilteredVisitLogs(sortedLogs);
  // };

  // useEffect(() => {
  //   if (sortOption === "datePeriod") {
  //     filterByDate();
  //   }
  // }, [startDate, endDate, sortOption]);


  // // Get current logs based on pagination
  // const indexOfLastLog = currentPage * logsPerPage;
  // const indexOfFirstLog = indexOfLastLog - logsPerPage;
  // const currentLogs = filteredVisitLogs.slice(indexOfFirstLog, indexOfLastLog);

  // Change page

  const returnTarget = "/";
  const returnText = "Return to Home";

  const onPageChange = (page) => {
    setCurrentPage(page);
  };


  const handleNext = () =>{
    onPageChange(currentPage + 1)
    setCurrentPageLength((prev)=>(prev+filteredVisitLogs.length))
    // Reset direction to force an update
  setCursorFields((prev) => ({ ...prev, direction: "" })); 

  // Set it to 'next' after a slight delay
  setTimeout(() => {
    setCursorFields((prev) => ({ ...prev, direction: "next" }));
  }, 0); 
  }
  const handlePrev=()=>{
    onPageChange(currentPage - 1)
    setCurrentPageLength((prev)=>(prev-filteredVisitLogs.length))
    setCursorFields((prev) => ({ ...prev, direction: "" })); 

    setTimeout(() => {
      setCursorFields((prev) => ({ ...prev, direction: "prev" }));
    }, 0); 
  }
  const renderPaginationButtons = () => {
    const buttons = [];
    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => handlePrev()}
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
          onClick={() => handleNext()}
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
        >
          <IoIosArrowForward />
        </button>
      );
    }

    return buttons;
  };

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFilterData((prev)=>({...prev,[name]:value}))
    setCursorFields({"lastVisible":null,"pageSize" : logsPerPage,"direction":"next","pageHistory":[],"pastOutreachRef":null})
  }

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
                  onChange={e=>setSearchValue(e.target.value)}
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
                  value={filterData.city}
                  onChange={handleChange}
                  className="form-input w-fit md:w-[12rem] lg:w-[8rem] py-2 px-2 border border-[#CACACA] placeholder-gray-400 text-gray-500 appearance-none block pl-2 rounded-2xl"
                  style={{ borderRadius: "0px" }}
                />
              )}

              {/* Conditional rendering of DatePickers */}
              {sortOption === "datePeriod" && (
                <DatePicker
                  selected={filterData.startDate}
                  onChange={handleChange}
                  selectsStart
                  startDate={filterData.startDate}
                  endDate={filterData.endDate}
                  value={filterData.startDate}
                  placeholderText="Select Start Date"
                  className="form-input w-fit py-2 px-2 border border-[#CACACA] text-gray-500 appearance-none block"
                />
              )}
              {sortOption === "datePeriod" && (
                <DatePicker
                  selected={filterData.endDate}
                  onChange={handleChange}
                  selectsEnd
                  startDate={filterData.startDate}
                  endDate={filterData.endDate}
                  value={filterData.endDate}
                  placeholderText="Select End Date"
                  className="form-input w-fit py-2 px-2 border border-[#CACACA] text-gray-500 appearance-none block"
                />
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
              {/* Pagination */}
              <div className="flex justify-between items-center mt-8 w-full">
                <p className="text-gray-600">
                  Showing {currentPageLength} of {totalPages}{" "}
                  events
                </p>
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
