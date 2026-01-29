import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowRight from "../../images/arrowRight.png";
import HelpRequestCard from "./HelpRequestCard";
import HelpRequestSkeleton from "../Skeletons/HelpRequestSkeleton";
import { fetchHomeHelpRequests } from "../VisitLogCardService";
import ErrorMessage from "../ErrorMessage";
import CustomButton from "../Buttons/CustomButton";

const HomePageHelpRequests = () => {
  const navigate = useNavigate();
  const [helpRequests, setHelpRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const helpRequestsData = await fetchHomeHelpRequests();
        setHelpRequests(helpRequestsData || []);
      } catch (error) {
        console.error("Error fetching help requests:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="bg-[#F7F7F7] flex-col justify-start items-start gap-4 w-full">
        <div className="flex flex-col md:flex md:flex-row justify-between gap-4 md:gap-10">
          <div className="">
            <div className="flex flex-col lg:flex-row justify-between">
              <div
                className="flex flex-row cursor-pointer gap-2 items-center"
                onClick={() => {
                  navigate("/allHelpRequests");
                }}
              >
                <div className="font-medium text-2xl md:text-[45px] text-[#1F0A58] font-dmsans">
                  Latest Actions - Help Requests
                </div>
                <img src={arrowRight} className="w-6 h-6 lg:w-10 lg:h-10 " />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8">
          {isLoading ? (
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <HelpRequestSkeleton />
              <HelpRequestSkeleton />
              <HelpRequestSkeleton />
            </div>
          ) : isError ? (
            <ErrorMessage displayName="Help Requests" />
          ) : helpRequests.length > 0 ? (
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {helpRequests.slice(0, 3).map((helpRequest) => (
                <HelpRequestCard
                  key={helpRequest.id}
                  helpRequest={helpRequest}
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              No help requests found.
            </div>
          )}
        </div>
        <div className="mt-16">
          <CustomButton
            label="More Help Requests"
            name="buttondefault"
            onClick={() => {
              navigate("/allHelpRequests");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePageHelpRequests;
