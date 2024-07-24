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
import NoDisplayData from "../UserProfile/NoDisplayData";

const OutreachVisitLogProfile = () => {
  const [visibleItems, setVisibleItems] = useState(3);
  const loadMore = () => {
    setVisibleItems((prev) => prev + 3);
  };

  const navigate = useNavigate();
  const [visitLogs, setVisitLogs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        const logs = await fetchPersonalVisitLogs(auth?.currentUser?.uid);
        setVisitLogs(logs);
      } catch (error) {
        setIsError(true);
        setVisitLogs([]);
        setErrorMsg("Visit logs could not be loaded. Please try again later.");
      }
    } else {
      console.log("No user is signed in.");
      setVisitLogs([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [auth.currentUser]);

  useEffect(() => {
    if (Array.isArray(visitLogs)) {
      setIsLoading(false);
    }
  }, [visitLogs]);

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
            navigate("/profile/visitlogform");
          }}
        />
      </div>

      {isLoading ? (
          <div className="flex space-x-4 md:justify-between md:items-center w-full h-fit gap-2 grid-flow-col overflow-x-auto">
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </div>
        ) : isError ? (
          <div className="text-center text-neutral-900 text-[20px] leading-9">
            {errorMsg}
          </div>
        ) : (
          <>
            {visitLogs?.length > 0 && (
          <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visitLogs.slice(0, visibleItems).map((visitLogData) => (
            <div key={visitLogData.id} className="bg-[#F5EEFE] w-full rounded-[30px] mb-4 flex flex-col justify-between p-6">
              <div className="flex w-full">
                <OutreachVisitLogProfileCard
                  visitLogCardData={visitLogData}
                  onRefresh={handleRefresh}
                />
              </div>
            </div>
          ))}
        </div>
       
         
          )}

          {visibleItems < visitLogs?.length && (
            <button
              className="w-fit rounded-[100px] border border-[#C8C8C8] flex-col justify-center items-center gap-2 flex text-center text-[#1F0A58] hover:bg-[#1F0A58] hover:text-white text-[13px] font-medium font-dmsans leading-tight self-stretch px-6 py-2.5 mt-7"
              onClick={loadMore}
            >
              Load More
            </button>
          )}

          {/* {visitLogs.length == 0 && <NoOutreachDoc isPersonalVisitLog={true} />} */}
          {visitLogs.length == 0 && <NoDisplayData
            name="visitlog"
            label="No visit logs created" />}
        </>
      )}
    </div>
  );
};

export default OutreachVisitLogProfile;
