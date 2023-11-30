import React, { useState, useEffect } from "react";
import OutreachEventCard from "./OutreachEventCard";
import { useNavigate } from "react-router-dom";
import arrowDown from "../../images/arrowDown.png";
import arrowRight from "../../images/arrowRight.png";
import CustomButton from "../Buttons/CustomButton";
import OutreachVisitLogCard from "./OutreachVisitLogCard";
import { fetchEvents, formatDate } from "../EventCardService";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";

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
  const [isLoading, setIsLoading] = useState(true);
  const [eventsDisplay, setEventsDisplay] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await fetchEvents();
      // Filter events to get only past events
      const upcomingEvents = eventsData
        .filter((event) => {
          const eventDate = new Date(event.eventDate.seconds * 1000);
          return eventDate >= new Date(); // Check if the event date is before the current date
        })
      // Sort events in place based on their date
      upcomingEvents.sort((a, b) => a.eventDate - b.eventDate);

      setEvents(upcomingEvents);
      // Extract states and remove duplicates
      const extractedStates = [...new Set(upcomingEvents.map(event => event.location.state))];
      setStates(extractedStates);
      
    };

    fetchData();
  }, []);

  // Handle state selection from dropdown
  const handleStateSelection = (state) => {
    setSelectedState(state);
    const filtered = events.filter(event => event.location.state === state);
    setFilteredEvents(filtered);
  };


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
      <div className="w-full flex flex-col justify-center md:justify-between items-center rounded-t-xl bg-gradient-to-br from-purple-300 to-zinc-200 p-4 lg:px-28 lg:py-12 lg:flex-row lg:space-y-0">
        <div>
          <div className="text-2xl font-medium font-dmsans">
            Outreach - extending help, resources, and compassion to those in
            need
          </div>
          <div className="text-sm font-normal font-dmsans">
            Homeless outreach involves both community-wide and personal efforts
            to support individuals experiencing homelessness. Community outreach
            brings together groups and organizations to create systemic change,
            while personal outreach involves one-on-one assistance. Homeless
            outreach is crucial because it provides immediate help and fosters
            empathy, building a more compassionate society.
          </div>
        </div>
      </div>

      <div className="p-4 lg:px-28 lg:py-12 space-y-9">
        <div className="flex items-center justify-between">
          <div className="md:inline-flex items-center text-center space-y-2 md:space-y-0 hidden md:block">
            <p className="font-medium text-sm lg:text-2xl text-[#212121] font-dmsans">
              Upcoming outreach events in
            </p>
            <div className="relative md:inline-block">
              <select
                value={selectedState}
                onChange={(e) => handleStateSelection(e.target.value)}
                class="appearance-none py-1 px-3 pr-8 text-[#181818] text-2xl lg:text-2xl font-bricolage border-b border-[#181818] bg-transparent h-10"
              >
                <option value="">Select State</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#181818] gap-4">
                <img src={arrowDown} />
              </div>
            </div>
            <button className="text-sm font-medium font-['DM Sans'] leading-tight lg:text-[12px] text-white bg-[#6840E0] px-6 py-2.5 lg:px-6 lg:py-2.5 rounded-full ">
              Create an Outreach
            </button>
          </div>
          <div
            className="hidden lg:flex md:inline-flex cursor-pointer gap-3 items-center text-center"
            onClick={() => {
              navigate("/allOutreachEvents");
            }}
          >
            <div className="font-medium text-[8px] lg:text-[13px] font-bricolage">
              View all
            </div>
            <img src={arrowRight} className="w-2 h-2 lg:w-4 lg:h-4 " />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-between items-center w-full h-fit gap-2">
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
            {selectedState === "" ? (
              upcomingEvents.map((eventData) => (
                <OutreachEventCard
                  key={eventData.id}
                  cardData={{
                    ...eventData,
                    eventDate: formatDate(
                      new Date(eventData.eventDate.seconds * 1000)
                    ),
                  }}
                />
              ))) : (
              filteredEvents.map((eventData) => (
                <OutreachEventCard
                  key={eventData.id}
                  cardData={{
                    ...eventData,
                    eventDate: formatDate(
                      new Date(eventData.eventDate.seconds * 1000)
                    ),
                  }}
                />
              )))}
          </div>
        )}
        {visibleItems < upcomingEvents.length && (
          <button
            className="w-full px-6 py-2.5 rounded-full text-sm font-medium text-violet-950 font-['DM Sans'] border border-stone-300"
            onClick={loadMore}
          >
            Load More
          </button>
        )}
        <div className="flex items-center justify-between">
          <div className="md:inline-flex items-center text-center space-y-2 md:space-y-0">
            <p className="font-medium text-sm lg:text-2xl text-[#212121] font-bricolage">
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
            <div className="font-medium text-[8px] lg:text-[13px] font-bricolage">
              View all
            </div>
            <img src={arrowRight} className="w-2 h-2 lg:w-4 lg:h-4 " />
          </div>
        </div>
        {isLoading?(
          <div className="flex justify-between items-center w-full h-fit gap-2">
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </div>
        ):(<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
        <OutreachVisitLogCard />
        <OutreachVisitLogCard />
        <OutreachVisitLogCard />
      </div>)}
        
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
