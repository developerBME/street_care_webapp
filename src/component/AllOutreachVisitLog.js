import React, { useState, useEffect } from "react";
import OutreachVisitLogCard from "./Community/OutreachVisitLogCard";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { fetchPublicVisitLogs } from "./VisitLogCardService";
import EventCardSkeleton from "./Skeletons/EventCardSkeleton";

const AllOutreachVisitLog = () => {
  const navigate = useNavigate();
  const [visitLogs, setVisitLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getVisitLogs = async () => {
      const visitLogsData = await fetchPublicVisitLogs();
      setVisitLogs(visitLogsData);
    };
    getVisitLogs();
  }, []);

  useEffect(() => {
    // Set loading to false after 3 seconds
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId); // Clear the timeout if the component unmounts
  }, []);

  // Set returnTarget and returnText directly to home page
  const returnTarget = "/";
  const returnText = "Return to Home";

  return (
    <div className="relative flex flex-col items-center ">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl bg-white text-black">
        <div
          className="absolute flex mt-[-50px] items-center cursor-pointer"
          onClick={() => {
            navigate(returnTarget);
          }}
        >
          <IoIosArrowBack className="w-6 h-6" />
          <p className="font-bricolage text-xl font-bold leading-7">{returnText}</p>
        </div>
        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
          <p className="font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
            All Outreach Visit Logs
          </p>
          {isLoading ? (
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : (
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              {visitLogs.map((visitLogData) => (
                <OutreachVisitLogCard key={visitLogData.id} visitLogCardData={visitLogData} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOutreachVisitLog;
