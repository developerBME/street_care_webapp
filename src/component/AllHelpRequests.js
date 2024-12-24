import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { fetchHelpRequests } from "./HelpRequestService";
import HelpRequestCard from "./Community/HelpRequestCard";
import HelpRequestSkeleton from "./Skeletons/HelpRequestSkeleton";

const AllHelpRequests = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [helpRequestsPerPage] = useState(6);

  const searchRef = useRef("");

  const [helpRequests, setHelpRequests] = useState([]);
  const [helpRequestsDisplay, setHelpRequestsDisplay] = useState([]);

  // Pagination: Calculate total pages
  const totalPages = Math.ceil(
    helpRequestsDisplay.length / helpRequestsPerPage
  );

  // Calculate the indices for slicing help requests for the current page
  const indexOfLastRequest = currentPage * helpRequestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - helpRequestsPerPage;
  const currentHelpRequests = helpRequestsDisplay.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  useEffect(() => {
    const fetchData = async () => {
      const helpRequestData = await fetchHelpRequests();

      // Sort helpRequests in place based on their date
      helpRequestData.sort((a, b) => a.createdAt - b.createdAt);

      setHelpRequests(helpRequestData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setHelpRequestsDisplay(helpRequests);
  }, [helpRequests]);

  useEffect(() => {
    if (helpRequestsDisplay.length > 0) {
      setIsLoading(false);
    }
  }, [helpRequestsDisplay]);

  const searchChange = () => {
    setHelpRequestsDisplay(
      helpRequests.filter(
        (x) =>
          x.title.toLowerCase().search(searchRef.current.value.toLowerCase()) >
            -1 ||
          x.userName
            .toLowerCase()
            .search(searchRef.current.value.toLowerCase()) > -1
      )
    );
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Pagination handler
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Render pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    const pageRange = 1; // Range of pages to show around the current page

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
    <div className="relative flex flex-col items-center ">
      <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl bg-white text-black ">
        <div
          className=" absolute flex mt-[-50px] items-center cursor-pointer "
          onClick={() => {
            navigate("/");
          }}
        >
          <IoIosArrowBack className=" w-6 h-6" />{" "}
          <p className=" font-bricolage text-xl font-bold leading-7">
            Return to Community
          </p>
        </div>
        {/*  */}

        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] ">
          <div className=" lg:flex justify-between">
            <div className="">
              <p className=" font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58] lg:mt-2">
                {" "}
                Help Requests
              </p>
            </div>
            <div className=" mt-6 lg:mt-0">
              <label className="relative text-gray-400 focus-within:text-gray-600 ">
                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  placeholder="Search Help Requests"
                  ref={searchRef}
                  onChange={searchChange}
                  className="form-input w-fit md:w-[27rem] lg:w-[25rem] py-3 px-2 border border-[#CACACA] placeholder-gray-400 text-gray-500 appearance-none block pl-12 rounded-2xl"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 pointer-events-none absolute top-6 transform -translate-y-1/2 left-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </label>
            </div>
          </div>

          {/* Pagination Section */}
          <div className="flex justify-between items-center mt-8 w-full">
            <p className="text-gray-600">
              Showing {currentHelpRequests.length} of{" "}
              {helpRequestsDisplay.length} help requests
            </p>
            <div className="flex justify-end">{renderPaginationButtons()}</div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 w-full h-fit">
              <HelpRequestSkeleton />
              <HelpRequestSkeleton />
              <HelpRequestSkeleton />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 p-4 lg:px-2 lg:pt-10 lg:pb-6 bg-[#F7F7F7] rounded-b-2xl">
                {currentHelpRequests.length > 0 ? (
                  currentHelpRequests.map((item, index) => (
                    <HelpRequestCard key={item.id} helpRequestCardData={item} />
                  ))
                ) : (
                  <p>No help requests found</p>
                )}
              </div>

              {/* Pagination Section */}
              <div className="flex justify-between items-center mt-8 w-full">
                <p className="text-gray-600">
                  Showing {currentHelpRequests.length} of{" "}
                  {helpRequestsDisplay.length} help requests
                </p>
                <div className="flex justify-end">
                  {renderPaginationButtons()}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllHelpRequests;
