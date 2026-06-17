import { useState, useEffect, useRef } from "react";
import OutreachVisitLogCard from "./Community/OutreachVisitLogCard";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import { TbZoomCancel } from "react-icons/tb";
import { fetchPublicVisitLogs } from "./VisitLogCardService";
import EventCardSkeleton from "./Skeletons/EventCardSkeleton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserTypeInfo from "./UserTypeInfo";
import { getPageNumbersFormat } from "../utils/helperFns";
import DummyDataButton from "./dummyDataScript";
import arrowBack from "../images/arrowBack.png";
import DisplayInteractionLogCard, {
  ExpandedInteractionLogCard,
} from "./Community/DisplayInteractionLogCard";
import NoLogsFound from "./NologsFound";
// import RenderPaginationBtns from "./HomePage/RenderPaginationBtns";
// Refactor to use PageCheckpoints and think of a way to handle pages.

const AllOutreachVisitLog = () => {
  const navigate = useNavigate();
  const [filteredVisitLogs, setFilteredVisitLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const logsPerPage = 6;
  const [currentPageLength, setCurrentPageLength] = useState(0);
  const [cursorFields, setCursorFields] = useState({
    pageCheckpoints: {}, //{pageNumber: [firstDoc, lastDoc]}
    pageSize: logsPerPage,
    direction: "next",
    currentPage: 0,
    pageHistory: [],
    pastOutreachRef: null,
  });
  const searchRef = useRef("");
  const searchCity = useRef(""); // Reference for the search city input
  const [filterData, setFilterData] = useState({
    city: "",
    isDateFilter: false,
    startDate: new Date("2024-01-02"),
    endDate: new Date(),
    searchValue: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popUpModalData, setPopUpModalData] = useState({});

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePopUpModalData = (data) => {
    setPopUpModalData(data);
    // console.log(data);
  };

  const Modal = ({ post, onClose }) => {
    const modalRef = useRef();

    const handleClickOutside = (e) => {
      // If the click is outside the modal content
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    useEffect(() => {
      // Listen for all clicks on the document
      document.addEventListener("mousedown", handleClickOutside);

      // Cleanup
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md">
        {/* Modal Container */}
        <div
          ref={modalRef}
          className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg flex flex-col items-center"
        >
          {/* Back Button */}
          <div className="flex items-center w-full mb-4">
            <img
              src={arrowBack}
              alt="Back"
              className="w-6 h-6 cursor-pointer"
              onClick={onClose} // Clicking on the image closes the modal
            />
            <button
              onClick={onClose}
              className="ml-2 text-sm text-gray-700 font-medium hover:underline"
            >
              Go Back
            </button>
          </div>

          <ExpandedInteractionLogCard postData={post} />
        </div>
      </div>
    );
  };

  useEffect(() => {
    const getVisitLogs = async () => {
      setIsLoading(true);
      // console.log("cursorField.currentPage:", cursorFields.currentPage);
      // console.log("FilterData", filterData);
      // console.log(
      //   "pageCheckPoints before sending:",
      //   cursorFields.pageCheckpoints
      // );
      // if (!cursorFields.direction) return;
      const visitLogsData = await fetchPublicVisitLogs(
        filterData.searchValue,
        filterData.city,
        filterData.startDate,
        filterData.endDate,
        filterData.isDateFilter,
        cursorFields.lastVisible,
        cursorFields.pageSize,
        cursorFields.pageHistory,
        cursorFields.currentPage,
        cursorFields.pageCheckpoints,
      );
      // console.log("Got the Response.");
      //cursorFields.pageStartDocs = visitLogsData.pageStartDocs;
      setCursorFields((prev) => ({
        ...prev,
        pageCheckpoints: visitLogsData.pageCheckpoints,
      }));
      // console.log("Receieved pageCheckpoints:", cursorFields.pageCheckpoints);
      // console.log("visitLogs:", visitLogsData.visitLogs);
      setTotalRecords(visitLogsData.totalRecords);
      setTotalPages(Math.ceil(visitLogsData.totalRecords / logsPerPage));
      // if (cursorFields.direction === "next")
      setCurrentPageLength(
        visitLogsData.visitLogs.length + visitLogsData.currentPage * 6,
      );
      setFilteredVisitLogs(visitLogsData.visitLogs);
      setIsLoading(false);
    };
    //Implemented debounce to improve performance
    const delayTimer = setTimeout(() => {
      getVisitLogs();
    }, 500);
    return () => clearTimeout(delayTimer);
  }, [
    filterData.city,
    filterData.searchValue,
    filterData.startDate,
    filterData.endDate,
    cursorFields.currentPage,
  ]);

  // useEffect(() => {
  //   console.log("CursorFields,pageCheckpoints:", cursorFields.pageCheckpoints);
  // }, [cursorFields.pageCheckpoints]);

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    // console.log("cursorFields from handleSortChange", cursorFields);
    // console.log(sortBy);
    setSortOption(sortBy);
    //To make sure when the sort option is changed from None to city or date, api is not triggered
    if (sortOption === "") return;
    //To clear the filters in other cases
    setCursorFields((prev) => ({ ...prev, pageCheckpoints: {} }));
    setFilterData({
      city: "",
      startDate: new Date("2024-01-02"),
      endDate: new Date(),
      isDateFilter: false,
      searchValue: "",
    });
    setCurrentPageLength(0);
  };

  // Change page

  const returnTarget = -1;
  const returnText = "Go Back";

  const handleNext = () => {
    setIsLoading(true);
    setCursorFields((prev) => ({
      ...prev,
      currentPage: prev.currentPage + 1,
    }));
  };
  const handlePrev = () => {
    setIsLoading(true);
    setCursorFields((prev) => ({
      ...prev,
      currentPage: prev.currentPage - 1,
    }));
  };

  const handlePaginationBtn = (page) => {
    setIsLoading(true);
    setCursorFields((prev) => ({ ...prev, currentPage: page - 1 }));
    console.log("currentPage 0 Indexed-index:", page - 1);
    console.log("Pagenumber 1 Indexed, index + 1:", page);
  };

  // TODO: Modify this function to add pagination numbers.// when windowSize is greater than the number of pages.
  const renderPaginationButtons = (
    lastPage = 10,
    currPage = 1,
    windowSize = 5,
  ) => {
    const layout = getPageNumbersFormat(windowSize, currPage, lastPage);
    const disabledBtnCss =
      "mx-1 w-8 h-8 rounded-full bg-[#565656] opacity-50 text-gray-600 flex items-center justify-center";
    const activeBtnCss =
      "mx-1 w-8 h-8 rounded-full border border-[#C8C8C8] bg-white opacity-100 flex items-center justify-center";

    const buttons = [];
    buttons.push(
      <button
        key="prev"
        disabled={cursorFields.currentPage == 0}
        onClick={() => {
          setIsLoading(true);
          setCursorFields((prev) => ({
            ...prev,
            currentPage: prev.currentPage - 1,
          }));
        }}
        className={
          cursorFields.currentPage == 0 ? disabledBtnCss : activeBtnCss
        }
      >
        <IoIosArrowBack
          className={`w-6 h-6 ${
            cursorFields.currentPage == 0 ? "text-white" : "text-black"
          }`}
        />
      </button>,
    );
    {
      // console.log("layout:", layout);
    }
    // in layOut page number is 1-indexed
    // in currentPage and others page is 0-indexed
    layout.forEach((page, index) => {
      buttons.push(
        <button
          key={page}
          className={
            cursorFields.currentPage == page - 1
              ? "mx-1 w-8 h-8 rounded-full border border-[#1F0A58] bg-[#E8DFFD] opacity-100 text-gray-600 font-medium hover:bg-[#D9CCF9] hover:border-[#150544] hover:text-gray-800 transition-colors duration-200 ease-in-out"
              : "mx-1 w-8 h-8 rounded-full border border-[#C8C8C8] bg-white opacity-100 text-gray-600 font-medium hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800 transition-colors duration-200 ease-in-out"
          }
          onClick={() => {
            setIsLoading(true);
            setCursorFields((prev) => ({ ...prev, currentPage: page - 1 }));
            // console.log("currentPage 0 Indexed-index:", page - 1);
            // console.log("Pagenumber 1 Indexed, index + 1:", page);
          }}
        >
          {page}
        </button>,
      );
      if (index < layout.length - 1 && layout[index + 1] !== page + 1) {
        buttons.push(
          <button
            key={`disabledBtnAfter-${page}`}
            className="mx-1 w-8 h-8 rounded-full border border-[#C8C8C8] bg-white opacity-100 text-gray-600 font-medium"
            disabled={true}
          >
            ...
          </button>,
        );
      }
    });

    buttons.push(
      <button
        key="next"
        disabled={cursorFields.currentPage == totalPages - 1}
        onClick={() => {
          setIsLoading(true);
          setCursorFields((prev) => ({
            ...prev,
            currentPage: prev.currentPage + 1,
          }));
        }}
        className={
          cursorFields.currentPage == totalPages - 1
            ? disabledBtnCss
            : activeBtnCss
        } // disabled
      >
        <IoIosArrowForward
          className={`w-6 h-6 ${
            cursorFields.currentPage == totalPages - 1
              ? "text-white"
              : "text-black"
          }`}
        />
      </button>,
    );

    return buttons;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prev) => ({ ...prev, [name]: value }));
    //Reset pageCheckpoints to empty Array to avoid passing stale pageCheckpoints.
    setCursorFields((prev) => ({ ...prev, pageCheckpoints: {} }));
    setCursorFields((prev) => ({ ...prev, currentPage: 0 })); // reseting page so everytime there is change in filter we set the current page to 0 to fetch the first page.
    setCurrentPageLength(0);
  };

  const handleDateChange = (date, fieldName) => {
    setFilterData((prev) => ({
      ...prev,
      [fieldName]: date,
      isDateFilter: true,
    }));
    setCurrentPageLength(0);
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl bg-white text-black">
        <div
          className="absolute flex mt-[-50px] items-center cursor-pointer"
          onClick={() => {
            if (window.history.length > 2) {
              navigate(returnTarget);
            } else {
              navigate("/");
            }
          }}
        >
          <IoIosArrowBack className="w-6 h-6" />
          <p className="font-bricolage text-xl font-bold leading-7">
            {returnText}
          </p>
        </div>
        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full min-h-screen w-full rounded-2xl bg-[#F7F7F7]">
          <div className="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 w-full">
            <div>
              <p className="font-bricolage font-medium text-[34px] xl:text-[38px] text-[#1F0A58] whitespace-nowrap">
                Interaction Logs
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap xl:flex-nowrap">
              {/* Search input */}
              <label className="relative text-gray-400 focus-within:text-gray-600 w-full sm:w-auto">
                <input
                  type="text"
                  name="searchValue"
                  id="searchText"
                  placeholder="Search by Description"
                  ref={searchRef}
                  onChange={handleChange}
                  className="form-input w-[210px] py-2 px-2 border border-[#CACACA] placeholder-gray-400 text-gray-500 appearance-none block pl-10 rounded-2xl"
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
              <div className="flex items-center w-full sm:w-auto">
                <label className="mr-2 text-gray-500 font-medium">
                  Filter:
                </label>
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="form-select w-[125px] py-2 pl-3 pr-8 border border-[#CACACA] text-gray-500 appearance-none block rounded-2xl bg-transparent"
                  >
                    <option value="">None</option>
                    <option value="city">City</option>
                    <option value="datePeriod">Date Period</option>
                  </select>
                  {/* Changed 'px-3' to 'pr-2' to push the arrow to the right edge */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Conditional rendering of City search */}
              {sortOption === "city" && (
                <input
                  type="text"
                  name="city"
                  id="searchCity"
                  placeholder="Search City"
                  ref={searchCity}
                  value={filterData.city}
                  onChange={handleChange}
                  className="form-input w-[125px] py-2 px-2 border border-[#CACACA] placeholder-gray-400 text-gray-500 appearance-none block pl-2 rounded-2xl"
                />
              )}

              {/* Conditional rendering of DatePickers */}
              {sortOption === "datePeriod" && (
                <>
                  <DatePicker
                    selected={filterData.startDate}
                    selectsStart
                    name="startDate"
                    startDate={filterData.startDate}
                    endDate={filterData.endDate}
                    value={filterData.startDate}
                    onChange={(date) => handleDateChange(date, "startDate")}
                    placeholderText="Select Start Date"
                    className="form-input w-[125px] py-2 px-2 border border-[#CACACA] text-gray-500 appearance-none block rounded-2xl"
                  />
                  <p>To</p>
                  <DatePicker
                    selected={filterData.endDate}
                    selectsEnd
                    name="endDate"
                    startDate={filterData.startDate}
                    endDate={filterData.endDate}
                    value={filterData.endDate}
                    onChange={(date) => handleDateChange(date, "endDate")}
                    placeholderText="Select End Date"
                    className="form-input w-[125px] py-2 px-2 border border-[#CACACA] text-gray-500 appearance-none block rounded-2xl"
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
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : (
            <>
              {/* <OutreachVisitLogCard /> */}
              <div className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5 ${filteredVisitLogs.length === 0 ? "min-h-[400px]" : "h-fit"}`}>
                {filteredVisitLogs.length > 0 ? (
                  filteredVisitLogs.map((visitLogData) => (
                    <DisplayInteractionLogCard
                      key={visitLogData.id}
                      interactionLogCardData={visitLogData}
                      openPopUpModal={() => {
                        handleOpenModal();
                        // console.log(visitLogData);
                        handlePopUpModalData(visitLogData);
                      }}
                    />
                  ))
                ) : (
                  // <p className="col-span-3 text-center text-gray-500">
                  //   No logs found.
                  // </p>
                  <NoLogsFound message="No Interaction Logs Found" icon={TbZoomCancel} />
                )}
              </div>

              {filteredVisitLogs.length > 0 && (
                <>
                  {/* Pagination */}
                  <div className="flex justify-center items-center mt-8 w-full mx-auto">
                    <p className="text-gray-600">
                      Showing {currentPageLength} of {totalRecords} events
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full md:w-3/4 lg:w-3/4 mx-auto mt-4">
                    {!isLoading &&
                      renderPaginationButtons(
                        totalPages,
                        cursorFields?.currentPage + 1,
                      )}
                  </div>
                </>
              )}
              <div></div>
              <div></div>
              {/* <RenderPaginationBtns
                handlePrev={handlePrev}
                handleNext={handleNext}
                cursorFields={cursorFields}
                onClick={handlePaginationBtn}
              /> */}
            </>
          )}
        </div>
      </div>
      {/* Render Modal */}
      {isModalOpen && (
        <Modal post={popUpModalData} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AllOutreachVisitLog;
