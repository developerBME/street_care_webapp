import React, { useState, useEffect } from "react";
import OutreachEventCard from "../Community/OutreachEventCard";
import { useNavigate } from "react-router-dom";
import arrowDropDown from "../../images/arrowDropDown.png";
import arrowRight from "../../images/arrowRight.png";
import CustomButton from "../Buttons/CustomButton";
import OutreachVisitLogCard from "../Community/OutreachVisitLogCard";
import { fetchEvents, formatDate } from "../EventCardService";
import { fetchVisitLogs } from "../VisitLogCardService";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";

const EventOutrachesSection = () => {
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
      const visitLogsData = await fetchVisitLogs();
      setVisitLogs(visitLogsData);
      // Filter events to get only past events
      const upcomingEvents = eventsData.filter((event) => {
        const eventDate = new Date(event.eventDate.seconds * 1000) || event.eventDate;
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

  // Handle state selection from dropdown
//   const handleStateSelection = (state) => {
//     setSelectedState(state);
//     const filtered = events.filter((event) => event.location.state === state);
//     setFilteredEvents(filtered);
//     setDropdownVisible(false);
//   };

  useEffect(() => {
    setEventsDisplay(events);
    // searchRef.current = "";
  }, [events]);

  useEffect(() => {
    if (eventsDisplay.length > 0) {
      setIsLoading(false);
    }
  }, [eventsDisplay]);

  const upcomingEvents = events
    .filter((event) => {
      const eventDate = new Date(event.eventDate.seconds * 1000);
      return eventDate >= new Date(); // Check if the event date is before the current date
    })
    .slice(0, 3);

  return (
    <div>
      <div className="p-4 lg:px-16 lg:py-12 bg-white from-[#D3C3FF] to-[#DEDCE4] rounded-t-2xl flex-col justify-start items-start gap-4 inline-flex w-full">
        <div className="flex flex-col md:flex md:flex-row justify-between gap-4 md:gap-10 w-full">
          <div className=" w-full">
            <div className="flex flex-col lg:flex-row justify-between w-full">
              <div className="text-[57px] font-medium font-dmsans">
                {/* Outreach - extending help, resources, and compassion to those in
            need */}
                Sign up for outreaches now!
              </div>
              <div
                className="flex flex-row cursor-pointer gap-2 items-center"
                onClick={() => {
                  navigate("/allOutreachEvents");
                }}
              >
                <div className="font-medium text-[24px] font-dmsans  whitespace-nowrap gap-4">
                  View all
                </div>
                <img src={arrowRight} className="w-2 h-2 lg:w-4 lg:h-4 " />
              </div>
            </div>
            <div className="font-dmsans text-1 text-grey-300 font-normal py-2">
              We’ve made a simple guide on how you can contribute to help the
              homeless. Join our team of 700+ members and contribute in your own
              way. More than 35% of our volunteers are first-time volunteers.
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 lg:px-16 lg:pb-10">
        <div className="flex items-center justify-between"></div>

        {/* {eventsDisplay.length == 0 ? (
          <div className="text-md font-medium font-dmsans text-[#181818] mt-2">
            No outreaches
          </div>
        ) : ( */}
          <>
            {isLoading ? (
              // <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2">
              <div className="w-full flex overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3 gap-2">
                <EventCardSkeleton />
                <EventCardSkeleton />
                <EventCardSkeleton />
              </div>
            ) : (
              // <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2">
              <div className="w-full flex overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3 gap-2">
                {selectedState === ""
                  ? upcomingEvents.map((eventData) => (
                      <OutreachEventCard
                        key={eventData.id}
                        cardData={{
                          ...eventData,
                          eventDate: formatDate(
                            new Date(eventData.eventDate.seconds * 1000)
                          ),
                        }}
                      />
                    ))
                  : filteredEvents.map((eventData) => (
                      <OutreachEventCard
                        key={eventData.id}
                        cardData={{
                          ...eventData,
                          eventDate: formatDate(
                            new Date(eventData.eventDate.seconds * 1000)
                          ),
                        }}
                      />
                    ))}
              </div>
            )}
          </>
        {/* )} */}

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

export default EventOutrachesSection;
