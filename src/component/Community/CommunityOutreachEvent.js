import React, { useState, useEffect } from "react";
import OutreachEventCard from "./OutreachEventCard";
import { useNavigate } from "react-router-dom";
import arrowRight from "../../images/arrowRight.png";
import CustomButton from "../Buttons/CustomButton";
import { fetchEvents } from "../EventCardService";
import { fetchVisitLogs } from "../VisitLogCardService";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import { formatDate } from "./../HelperFunction";

const CommunityOutreachEvent = () => {
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

  const [events, setEvents] = useState([]);
  const [visitLogs, setVisitLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eventsDisplay, setEventsDisplay] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await fetchEvents();
      // const visitLogsData = await fetchVisitLogs();
      // setVisitLogs(visitLogsData);
      // Filter events to get only past events
      const upcomingEvents = eventsData.filter((event) => {
        const eventDate = new Date(event.eventDate?.seconds * 1000) || event.eventDate;
        return eventDate >= new Date(); // Check if the event date is before the current date
      });
      // Sort events in place based on their date
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
    setEventsDisplay(events);
  }, [events]);

  useEffect(() => {
    if (eventsDisplay.length > 0) {
      setIsLoading(false);
    }
  }, [eventsDisplay]);

  const upcomingEvents = events
    .filter((event) => {
      const eventDate = new Date(event.eventDate?.seconds * 1000) || event.eventDate;
      return eventDate >= new Date(); // Check if the event date is before the current date
    })
    .slice(0, 3);

  return (
    <div>
      <div className="p-4 lg:px-10 lg:py-12 bg-gradient-to-br from-[#D3C3FF] to-[#DEDCE4] rounded-t-2xl flex-col justify-start items-start gap-4 inline-flex w-full">
        <div className="flex flex-col md:flex md:flex-row justify-between gap-4 md:gap-10">
          <div className="">
            <div className="flex flex-row gap-4">
              <div className="text-[45px] font-medium font-dmsans">
                {/* Outreach - extending help, resources, and compassion to those in
            need */}
                Outreaches ({upcomingEvents.length})
              </div>
              <div className="my-2 flex-col justify-center items-center gap-2 inline-flex font-medium font-dmsans leading-tight self-stretch">
                <CustomButton
                  label="Create an Outreach"
                  name="buttondefault"
                  onClick={() => {
                    navigate("/createOutreach");
                  }}
                />
              </div>

            </div>
            <div className="text-md font-medium font-dmsans text-[#181818] mt-2">
              {/* Homeless outreach involves both community-wide and personal efforts
            to support individuals experiencing homelessness. Community outreach
            brings together groups and organizations to create systemic change,
            while personal outreach involves one-on-one assistance. Homeless
            outreach is crucial because it provides immediate help and fosters
            empathy, building a more compassionate society. */}
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
        <div className="flex items-center justify-between">
        </div>
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
                ? upcomingEvents.map((eventData) => (
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
        {visibleItems < cardData.length && (
          <button
            className="w-full px-6 py-2.5 rounded-full text-sm font-medium text-violet-950 font-['DM Sans'] border border-stone-300"
            onClick={loadMore}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default CommunityOutreachEvent;
