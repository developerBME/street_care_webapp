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
  const [currentPageLength,setCurrentPageLength]=useState(0)
  const [cursorFields,setCursorFields] = useState({"lastVisible":null,"pageSize" : logsPerPage,"direction":"next","pageHistory":[],"pastOutreachRef":null})
  const searchRef = useRef("");
  const searchCity = useRef(""); // Reference for the search city input
  const [filterData,setFilterData] = useState({city:"",startDate:new Date("2024-01-02"),endDate:new Date()})

  useEffect(() => {
    const getVisitLogs = async () => {
      if(!cursorFields.direction)return
      //console.log("in")
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
        if(cursorFields.direction ==="next")setCurrentPageLength((prev)=>prev + visitLogsData.visitLogs.length)
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
    const sortBy = e.target.value;
    setSortOption(sortBy);
    //To make sure when the sort option is changed from None to city or date, api is not triggered
    if(sortOption === "")return 
    //To clear the filters in other cases
    setFilterData({city:"",startDate:new Date("2024-01-02"),endDate:new Date()})
    setCursorFields({"lastVisible":null,"pageSize" : logsPerPage,"direction":"next","pageHistory":[],"pastOutreachRef":null})
    setCurrentPageLength(0)
  };

  // Change page

  const returnTarget = "/";
  const returnText = "Return to Home";


  const handleNext = () =>{
    // Reset direction to force an update
  setCursorFields((prev) => ({ ...prev, direction: "" })); 

  // Set it to 'next' after a slight delay
  setTimeout(() => {
    setCursorFields((prev) => ({ ...prev, direction: "next" }));
  }, 0); 
  }
  const handlePrev=()=>{
    //Handling here since I need length of the records one render before
    setCurrentPageLength((prev)=>(prev-filteredVisitLogs.length))
    //Reset direction to force an update
    setCursorFields((prev) => ({ ...prev, direction: "" })); 
    setTimeout(() => {
      setCursorFields(prev => ({ ...prev, direction: "prev" }));
    }, 0); 
  }

  const renderPaginationButtons = () => {
    const buttons = [];
    if (currentPageLength > 6) {
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

    if (currentPageLength < totalPages) {
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

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFilterData((prev)=>({...prev,[name]:value}))
    setCursorFields({"lastVisible":null,"pageSize" : logsPerPage,"direction":"next","pageHistory":[],"pastOutreachRef":null})
    setCurrentPageLength(0)
  }

  const handleDateChange = (date,fieldName) =>{
    setFilterData((prev) => ({ ...prev, [fieldName]: date }));
    setCursorFields({"lastVisible":null,"pageSize" : logsPerPage,"direction":"next","pageHistory":[],"pastOutreachRef":null})
    setCurrentPageLength(0)
  }


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
                  name="city"
                  id="searchCity"
                  placeholder="Search City"
                  ref={searchCity}
                  value={filterData.city}
                  onChange={handleChange}
                  className="form-input w-fit md:w-[12rem] lg:w-[8rem] py-2 px-2 border border-[#CACACA] placeholder-gray-400 text-gray-500 appearance-none block pl-2 rounded-2xl"
                  style={{ borderRadius: "0px" }}
                />
              )}
              {sortOption === "datePeriod" && (
                <DatePicker
                  selected={filterData.startDate}
                  selectsStart
                  name="startDate"
                  startDate={filterData.startDate}
                  endDate={filterData.endDate}
                  value={filterData.startDate}
                  onChange={(date)=>handleDateChange(date,"startDate")}
                  placeholderText="Select Start Date"
                  className="form-input w-fit py-2 px-2 border border-[#CACACA] text-gray-500 appearance-none block"
                />
              )}
              {sortOption === "datePeriod" && (
                <DatePicker
                  selected={filterData.endDate}
                  selectsEnd
                  name="endDate"
                  startDate={filterData.startDate}
                  endDate={filterData.endDate}
                  value={filterData.endDate}
                  onChange={(date)=>handleDateChange(date,"endDate")}
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOutreachVisitLog;
