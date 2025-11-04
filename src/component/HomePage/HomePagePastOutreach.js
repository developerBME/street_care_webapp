import React, { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { formatDate, fetchEvents } from "../EventCardService";
import PastOutreachEventCardSkeleton from "../Skeletons/PastOutreachEventCardSkeleton";
import OutreachEventCard from "../Community/OutreachEventCard";
import CustomButton from "../Buttons/CustomButton";
import arrowRight from "../../images/arrowRight.png";

const HomePagePastOutreach = () => {

    const navigate = useNavigate();
  const fAuth = getAuth();

  onAuthStateChanged(fAuth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      console.log(user);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eventsDisplay, setEventsDisplay] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await fetchEvents();
        // Sort events in descending order
      eventsData.sort((a, b) => b.eventDate - a.eventDate);
      setEvents(eventsData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setEventsDisplay(events);
    // searchRef.current = "";
  }, [events]);

  useEffect(() => {
    if (eventsDisplay.length > 0) {
      setIsLoading(false);
    }
  }, [eventsDisplay]);

  const outreachRef = useRef();

  const handleOutreachRef = () => {
    outreachRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Filter events to get only past events
  const pastEvents = events
    .filter((event) => {
        const eventDate = new Date(event.eventDate?.seconds * 1000) || event.eventDate;
      return eventDate < new Date(); // Check if the event date is before the current date
    })
    .slice(0, 3);

  useEffect(() => {
    document.title = "Home - Street Care";
  }, []);

  return (
    <>
      <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] scroll-m-16">
        <p
          className="flex flex-row font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58] gap-4 cursor-pointer"
          onClick={() => {
            navigate("/allPastOutreachEvents");
          }}
        >
          {" "}
          Past Outreach Events
          {/* Changing this to Outreach Events from past outreach events. Combine upcoming outreaches and past outreaches in the future. */}
          <img src={arrowRight} className="w-6 h-7 lg:w-10 lg:h-10" />
        </p>

        {isLoading ? (
          <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
            <PastOutreachEventCardSkeleton />
            <PastOutreachEventCardSkeleton />
            <PastOutreachEventCardSkeleton />
          </div>
        ) : (
          <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
            {pastEvents.map((eventData) => (
              <OutreachEventCard
                isPastEvent={true}
                key={eventData.id}
                cardData={{
                  ...eventData,
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
            label="More Outreach Events"
            name="buttondefault"
            onClick={() => {
              navigate("/allPastOutreachEvents");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default HomePagePastOutreach;
