import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import arrowRight from "../../images/arrowRight.png";
import OutreachVisitLogCard from "../Community/OutreachVisitLogCard";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import {
  fetchTopVisitLogs,
  fetchPublicVisitLogs,
} from "../VisitLogCardService";
import ErrorMessage from "../ErrorMessage";
import CustomButton from "../Buttons/CustomButton";
import UserTypeInfo from "../UserTypeInfo";

const HomePageVisitlog = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      userName: "William Smith",
      title: "BK Fort Green Outreach",
      eventDate: "Sept 9, 2023 SAT 5:00pm",
      location: {
        street: "200 Eastern Pkwy",
        city: "Brooklyn",
        state: "NY",
        zipcode: "11238",
      },
      helpType: "Childcare Specialist needed",
      totalSlots: 20,
      interests: 5,
    },
    {
      userName: "William Smith",
      title: "BK Fort Green Outreach",
      eventDate: "Sept 9, 2023 SAT 5:00pm",
      location: {
        street: "200 Eastern Pkwy",
        city: "Brooklyn",
        state: "NY",
        zipcode: "11238",
      },
      helpType: "Childcare Specialist needed",
      totalSlots: 20,
      interests: 5,
    },
    {
      userName: "William Smith",
      title: "BK Fort Green Outreach",
      eventDate: "Sept 9, 2023 SAT 5:00pm",
      location: {
        street: "200 Eastern Pkwy",
        city: "Brooklyn",
        state: "NY",
        zipcode: "11238",
      },
      helpType: "Childcare Specialist needed",
      totalSlots: 20,
      interests: 5,
    },
  ];

  const [visitLogs, setVisitLogs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const visitLogsData = await fetchPublicVisitLogs();
        setVisitLogs(visitLogsData);
      } catch (error) {
        console.error("Error fetching visit logs:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Array.isArray(visitLogs)) {
      setIsLoading(false);
    }
  }, [visitLogs]);

  return (
    <div>
      <div className="bg-[#F7F7F7] flex-col justify-start items-start gap-4 w-full">
        <div className="flex flex-col md:flex md:flex-row justify-between gap-4 md:gap-10">
          <div className="">
            <div className="flex flex-col lg:flex-row justify-between">
              <div
                className="flex flex-row cursor-pointer gap-2 items-center"
                onClick={() => {
                  navigate("/allOutreachVisitLog");
                }}
              >
                <div className="font-medium text-2xl md:text-[45px] font-dmsans">
                  Latest actions - Visit Log
                </div>

                <img src={arrowRight} className="w-6 h-6 lg:w-10 lg:h-10 " />
              </div>
            </div>
            <UserTypeInfo/>
          </div>
        </div>

        <div className="pt-8">
          {isLoading ? (
            // <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : isError ? (
            <ErrorMessage displayName="Visit Logs" />
          ) : visitLogs.length > 0 ? (
            // <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
              {visitLogs.slice(0, 3).map((visitLogData, index) => (
                <OutreachVisitLogCard
                  key={index}
                  visitLogCardData={visitLogData}
                  showProfileInfo={true}
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
              No visit logs found.
            </div>
          )}
        </div>
        <div className="mt-16">
          <CustomButton
            label="More Visit Logs"
            name="buttondefault"
            onClick={() => {
              navigate("/allOutreachVisitLog");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePageVisitlog;
