import React, { useState, useEffect } from "react";
import OutreachVisitLogProfileCard from "./OutreachVisitLogProfileCard";
import { fetchEvents, formatDate } from "../EventCardService";
import { fetchPersonalVisitLogs } from "../VisitLogCardService";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import NoOutreachDoc from "./NoOutreachDoc";
import { auth } from "../firebase";
   
const OutreachVisitLogProfile = () => {  

  const [visibleItems, setVisibleItems] = useState(3);
  const loadMore = () => {
    setVisibleItems((prev) => prev + 3);
  };
  
  const [visitLogs, setVisitLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {

    const fetchData = async () => {
       try {
        const user = auth?.currentUser;
        // console.log("new ", auth?.currentUser?.uid)
        if (user) {
          const uid = user.uid;
          const logs = await fetchPersonalVisitLogs(uid);
          setVisitLogs(logs);
          setIsLoading(false);
        
        // const visitLogsData = await fetchPersonalVisitLogs(auth?.currentUser?.uid);
        // setVisitLogs(visitLogsData)
        // console.log(visitLogsData)
        // setIsLoading(false);
        // Extract states and remove duplicates
        }
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="md:inline-flex items-center text-center mb-7 space-y-2 md:space-y-0">
          <p className="font-medium text-xl lg:text-2xl text-[#212121] font-bricolage">
            Outreach Visit Log
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className=" sm:block sm:overflow-x-auto overflow-y-hidden flex justify-between items-center w-full">
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
        </div>
      ) : (
        <>
          {visitLogs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-2 mb-6">
              {visitLogs.slice(0, visibleItems).map((visitLogData, index) => (
                <div key={index} className="p-2">
                  <OutreachVisitLogProfileCard visitLogCardData={visitLogData} />
                </div>
              ))}
            </div>
          )}

          {visibleItems < visitLogs.length && (
            <button
              className="w-fit rounded-[100px] border border-[#C8C8C8] flex-col justify-center items-center gap-2 flex text-center text-[#1F0A58] hover:bg-[#1F0A58] hover:text-white text-[13px] font-medium font-dmsans leading-tight self-stretch px-6 py-2.5 mt-7"
              onClick={loadMore}
            >
              Load More
            </button>
          )}

          {visitLogs.length == 0 && <NoOutreachDoc />}
        </>
      )}
    </div>
  );
};

export default OutreachVisitLogProfile;