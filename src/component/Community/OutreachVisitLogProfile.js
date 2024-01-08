import React, { useState, useEffect } from "react";
import OutreachVisitLogProfileCard from "./OutreachVisitLogProfileCard";
import { useNavigate } from "react-router-dom";
import icon from "../../images/icon.png";
import OutreachVisitLogCard from "./OutreachVisitLogCard";
import { fetchEvents, formatDate } from "../EventCardService";
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
          console.log(logs);
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
      <div className="flex items-center justify-between mb-10">
      <div className="inline-flex flex-col sm:flex-row sm:space-x-16 ">
              <div class="text-neutral-800 text-4xl lg:text-5xl font-medium font-bricolage leading-[52px]">
                Personal Visit Logs
              </div>
              <CustomButton
                label="Document my Outreach"
                name="buttondefaulticon"
                icon={icon}
                onClick={() => {
                  navigate("/profile/select-outreach");
                }}
              />
            </div>
      </div>

      {isLoading ? (
        <div className=" flex justify-between items-center w-full h-fit gap-2">
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
                  {/* <OutreachVisitLogProfileCard visitLogCardData={visitLogData} /> */}
                  <OutreachVisitLogCard visitLogCardData={visitLogData}
                   showProfileInfo={false} />
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