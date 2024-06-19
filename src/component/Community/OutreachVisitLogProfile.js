import React, { useState, useEffect } from "react";
import OutreachVisitLogProfileCard from "./OutreachVisitLogProfileCard";
import { useNavigate } from "react-router-dom";
import icon from "../../images/icon.png";
// import OutreachVisitLogCard from "./OutreachVisitLogCard";
// import { fetchEvents, formatDate } from "../EventCardService";
import { fetchPersonalVisitLogs } from "../VisitLogCardService";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import CustomButton from "../Buttons/CustomButton";
import NoOutreachDoc from "./NoOutreachDoc";
import { auth } from "../firebase";

const OutreachVisitLogProfile = () => {
  const [visibleItems, setVisibleItems] = useState(3);
  const loadMore = () => {
    setVisibleItems((prev) => prev + 3);
  };

  const navigate = useNavigate();
  const [visitLogs, setVisitLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const user = auth.currentUser;

    if (user) {
      const logs = await fetchPersonalVisitLogs(auth?.currentUser?.uid);
      setVisitLogs(logs);
      setIsLoading(false);
      console.log("This is from fetchpersonalvisitlog", logs);
      // Extract states and remove duplicates
    } else {
      console.log("No user is signed in.");
      setVisitLogs([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [auth.currentUser]);

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div>
      <div className="flex flex-col justify-between sm:flex-row sm:space-x-16 mb-10 gap-2">
        <div className="text-neutral-800 text-4xl lg:text-5xl font-medium font-bricolage text-left leading-[52px]">
          My Visit Logs
        </div>

        <CustomButton
          label="Document New Visit Log"
          className="text-right"
          name="buttondefaulticon"
          icon={icon}
          onClick={() => {
            navigate("/profile/select-outreach");
          }}
        />
      </div>

      {isLoading ? (
        <div className="flex md:justify-between md:items-center w-full h-fit gap-2 grid-flow-col overflow-x-auto">
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
        </div>
      ) : (
        <>
          {visitLogs.length > 0 && (
            <div className="px-2 pb-4 grid grid-flow-col overflow-x-auto gap-2 md:px-0 md:pb-12 md:grid md:grid-cols-3 md:gap-y-4 md:gap-x-12 md:grid-rows-2 lg:gap-x-3 lg:grid-cols-3 lg:gap-y-3 lg:grid-rows-1  xl:px-0 xl:pb-16 xl:grid xl:grid-rows-1 xl:grid-cols-3 xl:gap-4">
            {/* <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 gap-y-2 mb-6"> */}
              {visitLogs.slice(0, visibleItems).map((visitLogData, index) => (
                <div key={visitLogData.id} className="flex md:p-2">
                  <div className="flex">
                    {/* <OutreachVisitLogCard
                    visitLogCardData={visitLogData}
                    IsNotProfile={false}
                  /> */}
                    <OutreachVisitLogProfileCard
                      visitLogCardData={visitLogData}
                      onRefresh={handleRefresh} 
                    />
                  </div>
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

          {visitLogs.length == 0 && <NoOutreachDoc isPersonalVisitLog={true} />}
        </>
      )}
    </div>
  );
};

export default OutreachVisitLogProfile;
