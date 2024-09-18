import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { fetchHelpRequests } from "./HelpRequestService";
import HelpRequestCard from "./Community/HelpRequestCard";
import HelpRequestSkeleton from "./Skeletons/HelpRequestSkeleton";

const AllHelpRequests = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(5);

  const searchRef = useRef("");

  const [helpRequests, setHelpRequests] = useState([]);
  const [helpRequestsDisplay, setHelpRequestsDisplay] = useState([]);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 5);
  };

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

          {isLoading ? (
            <div className="grid grid-cols-1 w-full h-fit">
              <HelpRequestSkeleton />
              <HelpRequestSkeleton />
              <HelpRequestSkeleton />
            </div>
          ) : (
            <>
              <div className="sm:p-4 lg:px-2 lg:pt-10 lg:pb-6 flex flex-col bg-[#F7F7F7] gap-4 lg:gap-8 rounded-b-2xl">
                {helpRequestsDisplay
                  .slice(0, visibleItems)
                  .map((item, index) => (
                    <HelpRequestCard key={item.id} helpRequestCardData={item} />
                  ))}
              </div>
              {visibleItems < helpRequests.length &&
                helpRequestsDisplay.length !== 0 &&
                helpRequestsDisplay.length > visibleItems && (
                  <button
                    className="w-fit rounded-[100px] border border-[#C8C8C8] flex-col justify-center items-center gap-2 flex text-center text-[#1F0A58] hover:bg-[#1F0A58] hover:text-white text-[13px] font-medium font-dmsans leading-tight self-stretch px-6 py-2.5 mt-2"
                    onClick={loadMore}
                  >
                    Load 5 More
                  </button>
                )}
              {helpRequestsDisplay.length === 0 && (
                <div>No help requests found with {searchRef.current.value}</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllHelpRequests;
