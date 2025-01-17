import React, { useRef } from "react";
import EventCardSkeleton from "./Skeletons/EventCardSkeleton";
import ErrorMessage from "./ErrorMessage";
import OutreachEventCard from "./Community/OutreachEventCard";
import CustomButton from "./Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import arrowRight from "../images/arrowRight.png";
import { formatDate } from "./HelperFunction";
import verifiedPurple from "../images/verified_purple.png";
import verifiedGreen from "../images/verified.png";
import verifiedBlue from "../images/verified_blue.png";
import verifiedYellow from "../images/verified_yellow.png";

const UpcomingOutreachEvents = ({
  events,
  isLoading,
  isError,
  openModal,
  loggedIn,
}) => {
  const outreachRef = useRef();
  const navigate = useNavigate();

  // Filter events to get only upcoming events
  const upcomingEvents = events
    ? events
        .filter((event) => {
          const eventDate =
            new Date(event.eventDate?.seconds * 1000) || event.eventDate;
          return eventDate >= new Date(); // Check if the event date is before the current date
        })
        .slice(0, 3)
    : [];

  return (
    <div
      id="outreach"
      className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black"
    >
      <div
        className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] scroll-m-24"
        ref={outreachRef}
      >
        <p
          className="flex flex-row font-bricolage cursor-pointer font-medium text-2xl md:text-[45px] text-[#1F0A58] gap-4"
          onClick={() => {
            navigate("/allOutreachEvents");
          }}
        >
          {" "}
          Upcoming Outreach Events
          <img alt="" src={arrowRight} className="w-6 h-7 lg:w-10 lg:h-10 " />
        </p>

        <div className="flex items-center justify-start space-x-4 mt-4">
          {/* Chapter Leader */}
          <div className="flex items-center space-x-2">
            <img src={verifiedGreen} alt="Chapter Leader" className="w-6 h-6" />
            <span className="text-sm font-medium text-gray-700">
              Chapter Leader
            </span>
          </div>
          {/* Chapter Member */}
          <div className="flex items-center space-x-2">
            <img
              src={verifiedPurple}
              alt="Chapter Member"
              className="w-6 h-6"
            />
            <span className="text-sm font-medium text-gray-700">
              Chapter Member
            </span>
          </div>
          {/* Streetcare Hub Leader */}
          <div className="flex items-center space-x-2">
            <img
              src={verifiedBlue}
              alt="Streetcare Hub Leader"
              className="w-6 h-6"
            />
            <span className="text-sm font-medium text-gray-700">
              Streetcare Hub Leader
            </span>
          </div>
          {/* Account holder */}
          <div className="flex items-center space-x-2">
            <img
              src={verifiedYellow}
              alt="Account holder"
              className="w-6 h-6"
            />
            <span className="text-sm font-medium text-gray-700">
              Account holder
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </div>
        ) : isError.events ? (
          <ErrorMessage displayName="Outreaches" />
        ) : (
          <>
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              {upcomingEvents.map((eventData) => (
                <OutreachEventCard
                  key={eventData.id}
                  cardData={{
                    ...eventData,
                    eventDate: eventData.eventDate?.seconds
                      ? formatDate(new Date(eventData.eventDate.seconds * 1000))
                      : eventData.eventDate,
                  }}
                  openModal={() =>
                    openModal({
                      ...eventData,
                      eventDate: eventData.eventDate?.seconds
                        ? formatDate(
                            new Date(eventData.eventDate.seconds * 1000)
                          )
                        : eventData.eventDate,
                    })
                  }
                  loggedIn={loggedIn}
                />
              ))}
            </div>
          </>
        )}
        <div className="mt-16">
          <CustomButton
            label="More Upcoming Outreach Events"
            name="buttondefault"
            onClick={() => {
              navigate("/allOutreachEvents");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UpcomingOutreachEvents;
