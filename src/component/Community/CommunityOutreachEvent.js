import React, { useState, useEffect } from "react";
import OutreachEventCard from "./OutreachEventCard";
import { useNavigate } from "react-router-dom";
import arrowRight from "../../images/arrowRight.png";
import CustomButton from "../Buttons/CustomButton";
import { fetchEvents } from "../EventCardService";
import { fetchVisitLogs } from "../VisitLogCardService";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import { formatDate } from "./../HelperFunction";

const CommunityOutreachEvent = ({ loggedIn}) => {
  const [visibleItems, setVisibleItems] = useState(3);
  const navigate = useNavigate();
  const loadMore = () => {
    setVisibleItems((prev) => prev + 3);
  };

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eventsDisplay, setEventsDisplay] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await fetchEvents();
      

      // Filter events to get only upcoming events
      const upcomingEvents = eventsData.filter((event) => {
        const eventDate = new Date(event.eventDate?.seconds * 1000) || event.eventDate;
        return eventDate >= new Date(); // Check if the event date is after the current date
      });

      // Sort events based on their date
      upcomingEvents.sort((a, b) => a.eventDate - b.eventDate);

      setEvents(upcomingEvents);
      // Extract states and remove duplicates
      const extractedStates = [
        ...new Set(upcomingEvents.map((event) => event.location.state)),
      ];
      setStates(extractedStates);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Is user logged in? ", loggedIn); // Correctly logs true/false
    // Fetch events logic
  }, [loggedIn]);

  useEffect(() => {
    setEventsDisplay(events.slice(0, visibleItems));
    if (events.length > 0) {
      setIsLoading(false);
    }
  }, [events, visibleItems]);

  return (
    <div>
      <div className="p-4 lg:px-10 lg:py-12 bg-gradient-to-br from-[#D3C3FF] to-[#DEDCE4] rounded-t-2xl flex-col justify-start items-start gap-4 inline-flex w-full">
        <div className="flex flex-col md:flex md:flex-row justify-between gap-4 md:gap-10">
          <div className="">
          <div className="flex flex-row gap-4">
              <div className="text-[45px] font-medium font-dmsans">
                Outreaches ({events.length})
              </div>
              {loggedIn && (
                <div className="my-2 flex-col justify-center items-center gap-2 inline-flex font-medium font-dmsans leading-tight self-stretch">
                  <CustomButton
                    label="Create an Outreach"
                    name="buttondefault"
                    onClick={() => {
                      navigate("/createOutreach");
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
              navigate("/allOutreachEvents");
            }}
          >
            <div className="font-medium text-[16px] lg:text-[20px] font-dmsans text-[#37168B] whitespace-nowrap">
              View all
            </div>
            <img alt="" src={arrowRight} className="w-2 h-2 lg:w-4 lg:h-4 " />
          </div>
        </div>
      </div>
      <div className="px-4 py-8 pb-4 lg:px-10 lg:pb-10">
        <>
          {isLoading ? (
            <div className="w-full flex overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3 gap-2">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : (
            <div className="w-full flex overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3 gap-2">
              {selectedState === ""
                ? eventsDisplay.map((eventData) => (
                    <OutreachEventCard
                      key={eventData.id}
                      cardData={{
                        ...eventData,
                        label: 'View Details',
                        eventDate: eventData.eventDate?.seconds ? formatDate(
                          new Date(eventData.eventDate.seconds * 1000)
                        ) : eventData.eventDate,
                      }}
                    />
                  ))
                : filteredEvents.map((eventData) => (
                    <OutreachEventCard
                      key={eventData.id}
                      cardData={{
                        ...eventData,
                        label: 'View Details',
                        eventDate: eventData.eventDate?.seconds ? formatDate(
                          new Date(eventData.eventDate.seconds * 1000)
                        ) : eventData.eventDate,
                      }}
                    />
                  ))}
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default CommunityOutreachEvent;