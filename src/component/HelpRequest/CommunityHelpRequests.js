import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowRight from "../../images/arrowRight.png";
import HelpRequestCard from "./HelpRequestCard";
import HelpRequestSkeleton from "../Skeletons/HelpRequestSkeleton";
import { fetchPublicHelpRequests } from "../VisitLogCardService";
import ErrorMessage from "../ErrorMessage";

const CommunityHelpRequests = () => {
  const navigate = useNavigate();
  const [helpRequests, setHelpRequests] = useState([]);
  const [helpRequestsCount, setHelpRequestsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const helpRequestsData = await fetchPublicHelpRequests(
          "",
          "",
          new Date("2024-01-02"),
          new Date(),
          false,
          null,
          6,
          "next",
          []
        );

        setHelpRequests(helpRequestsData.helpRequests || []);
        setHelpRequestsCount(helpRequestsData.totalRecords || 0);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="p-4 lg:px-10 lg:py-12 bg-gradient-to-br from-[#D3C3FF] to-[#DEDCE4] rounded-t-2xl flex-col justify-start items-start gap-4 inline-flex w-full">
        <div className="flex flex-col md:flex md:flex-row justify-between gap-4 md:gap-10">
          <div className="">
            <div className="flex flex-row gap-4">
              <div className="text-[45px] font-medium font-dmsans">
                Help Requests ({helpRequestsCount})
              </div>
            </div>
            <div className="text-md font-medium font-dmsans text-[#181818] mt-2">
              Browse recent help requests submitted by community members.
            </div>
          </div>

          <div
            className="flex flex-row cursor-pointer gap-2 items-center"
            onClick={() => {
              navigate("/allHelpRequests");
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
            <HelpRequestSkeleton />
            <HelpRequestSkeleton />
            <HelpRequestSkeleton />
          </div>
        ) : isError ? (
          <ErrorMessage displayName="Help Requests" />
        ) : helpRequests.length > 0 ? (
          <div className="w-full flex overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3 gap-2">
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
    </div>
  );
};

export default CommunityHelpRequests;
