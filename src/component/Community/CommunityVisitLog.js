import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import arrowRight from "../../images/arrowRight.png";
import OutreachVisitLogCard from "./OutreachVisitLogCard";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import { fetchVisitLogs } from "../VisitLogCardService";

const CommunityVisitLog = () => {
  const [visibleItems, setVisibleItems] = useState(3);
  const navigate = useNavigate();
  const loadMore = () => {
    setVisibleItems((prev) => prev + 3);
  };
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

  const [visitLogs, setVisitLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const visitLogsData = await fetchVisitLogs();
      setVisitLogs(visitLogsData);
    };

    fetchData();
  }, []);

  return (
    <div>
      {" "}
      <div className="flex items-center justify-between">
        <div className="md:inline-flex items-center text-center space-y-2 md:space-y-0">
          <p className="font-medium text-xl lg:text-2xl text-[#212121] font-bricolage">
            Outreach Visit Log
          </p>
          <button className="text-sm font-medium font-['DM Sans'] leading-tight lg:text-[12px] text-white bg-[#6840E0] px-6 py-2.5 lg:px-6 lg:py-2.5 rounded-full sm:hidden">
            Create an Outreach
          </button>
        </div>
        <div
          className="hidden lg:flex md:inline-flex cursor-pointer gap-3 items-center text-center"
          onClick={() => {
            navigate("/allOutreachVisitLog");
          }}
        >
          <div className="font-medium text-[12px] lg:text-[16px] font-bricolage">
            View all
          </div>
          <img src={arrowRight} className="w-2 h-2 lg:w-4 lg:h-4 " />
        </div>
      </div>
      {isLoading ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
          {visitLogs.slice(0, 3).map((visitLogData) => (
            <OutreachVisitLogCard
              visitLogCardData={visitLogData}
              showProfileInfo={true}
            />
          ))}
        </div>
      )}
      {visibleItems < cardData.length && (
        <button
          className="w-full px-6 py-2.5 rounded-full text-sm font-medium text-violet-950 font-['DM Sans'] border border-stone-300"
          onClick={loadMore}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default CommunityVisitLog;
