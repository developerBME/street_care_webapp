import React from "react";
import OutreachEventCard from "./Community/OutreachEventCard";
import EventCardSkeleton from "./Skeletons/EventCardSkeleton";
import ErrorMessage from "./ErrorMessage";
import { formatDate } from "./HelperFunction";
import PastOutreachEventCardSkeleton from "./Skeletons/PastOutreachEventCardSkeleton";
import { useNavigate } from "react-router-dom";
import arrowRight from "../images/arrowRight.png";
import CustomButton from "./Buttons/CustomButton";
import UserTypeInfo from "./UserTypeInfo";


const PastOutreachEvents = ({ events, isLoading, isError }) => {
  const navigate = useNavigate();

  // Ensure unique events

  const pastEvents = events ? events.slice(0, 3) : [];

  return (
    <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
      <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
        <p
          className="flex flex-row font-bricolage cursor-pointer font-medium text-2xl md:text-[45px] text-[#1F0A58] gap-4"
          onClick={() => {
            navigate("/allPastOutreachEvents");
          }}
        >
          Past Outreach Events
          <img alt="" src={arrowRight} className="w-6 h-7 lg:w-10 lg:h-10 " />
        </p>

        <UserTypeInfo/>

        {isLoading ? (
          <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
            <PastOutreachEventCardSkeleton />
            <PastOutreachEventCardSkeleton />
            <PastOutreachEventCardSkeleton />
          </div>
        ) : isError ? (
          <ErrorMessage displayName="Past Outreaches" />
        ) : (
          <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
            {pastEvents.map((eventData) => (
              <OutreachEventCard
                isPastEvent={true}
                key={eventData.id}
                cardData={{
                  ...eventData,
                  userName: eventData.userName || "Unknown",
                  userType: eventData.userType,
                  eventDate: eventData.eventDate?.seconds
                    ? formatDate(new Date(eventData.eventDate.seconds * 1000))
                    : eventData.eventDate,
                }}
              />
            ))}
          </div>
        )}
        <div className="mt-16">
          <CustomButton
            label="More Past Outreach Events"
            name="buttondefault"
            onClick={() => {
              navigate("/allPastOutreachEvents");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PastOutreachEvents;
