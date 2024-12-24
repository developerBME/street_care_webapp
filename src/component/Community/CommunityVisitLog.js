import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import arrowRight from "../../images/arrowRight.png";
import OutreachVisitLogCard from "./OutreachVisitLogCard";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import { fetchPublicVisitLogs } from "../VisitLogCardService"; // Use this function
import CustomButton from "../Buttons/CustomButton";
import ErrorMessage from "../ErrorMessage";

const CommunityVisitLog = ({ loggedIn}) => {
  const navigate = useNavigate();
  const [visitLogs, setVisitLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all visit logs
        const visitLogsData = await fetchPublicVisitLogs();
        setVisitLogs(visitLogsData);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setErrorMsg("Visit logs could not be loaded. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Is user logged in? ", loggedIn); // Correctly logs true/false
    // Fetch events logic
  }, [loggedIn]);

  return (
    <div>
      <div className="p-4 lg:px-10 lg:py-12 bg-gradient-to-br from-[#D3C3FF] to-[#DEDCE4] rounded-t-2xl flex-col justify-start items-start gap-4 inline-flex w-full">
        <div className="flex flex-col md:flex md:flex-row justify-between gap-4 md:gap-10">
          <div className="">
            <div className="flex flex-row gap-4">
              <div className="text-[45px] font-medium font-dmsans">
                Visit Logs ({visitLogs?.length || 0})
              </div>
              {loggedIn && (
              <div className="my-2 flex-col justify-center items-center gap-2 inline-flex font-medium font-dmsans leading-tight self-stretch">
                <CustomButton
                  label="Create a Visit Log"
                  name="buttondefault"
                  onClick={() => {
                    navigate("/profile/personaloutform");
                  }}
                />
              </div>
              )}
            </div>
            <div className="text-md font-medium font-dmsans text-[#181818] mt-2">
              What are help requests and how can they help you? If you are ready
              to help people now, kindly sign up to outreaches
            </div>
          </div>

          <div
            className="flex flex-row cursor-pointer gap-2 items-center"
            onClick={() => {
              navigate("/allOutreachVisitLog");
            }}
          >
            <div className="font-medium text-[16px] lg:text-[20px] font-dmsans text-[#37168B] whitespace-nowrap">
              View all
            </div>
            <img src={arrowRight} className="w-2 h-2 lg:w-4 lg:h-4 " />
          </div>
        </div>
      </div>

      <div className="px-4 py-8 pb-4 lg:px-10 lg:pb-10">
        {isLoading ? (
          <div className="w-full flex overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3 gap-2">
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </div>
        ) : isError ? (
          <ErrorMessage displayName="Visit Logs" />
        ) : visitLogs.length > 0 ? (
          <div className="w-full flex overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3 gap-2">
            {visitLogs.slice(0, 3).map((visitLogData, index) => (
              <OutreachVisitLogCard
                key={index}
                visitLogCardData={visitLogData}
                showProfileInfo={true}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            No visit logs found.
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityVisitLog;