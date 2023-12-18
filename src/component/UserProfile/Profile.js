import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserProfileCard from "./UserProfileCard";
import icon from "../../images/icon.png";
import add from "../../images/add.png";
import UserInfo from "./UserInfo";
import axc from "./CommOutForm";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import arrowDropDown from "../../images/arrowDropDown.png";
import arrowRight from "../../images/arrowRight.png";
import OutreachEventCard from "../Community/OutreachEventCard";
import OutreachVisitLogCard from "../Community/OutreachVisitLogCard";
import { formatDate, fetchUserEvents } from "../EventCardService";
import { auth } from "../firebase";

import CustomButton from "../Buttons/CustomButton";

import { fetchEvents } from "../EventCardService";
import { fetchVisitLogs } from "../VisitLogCardService";


function Profile() {
  const cardData = [
    {
      title: "BME Official Event",
      eventName: "Brooklyn Fort Green Outreach",
      eventDate: "Nov 9, 2023 FRI 5:00pm",
      buttonText: "Upcoming...",
      cardColor: "#F1EEFE",
      upcomingEvent: 1,
    },
    {
      title: "Group",
      eventName: "Jersey City Hoboken Outreach",
      eventDate: "Oct 16, 2023 SAT 5:00pm",
      buttonText: "Add Visit Log",
      cardColor: "#F1EEFE",
      upcomingEvent: 0,
    },
    {
      title: "Group",
      eventName: "Brooklyn Williamsburg Outreach",
      eventDate: "Oct 4, 2023 SAT 5:00pm",
      buttonText: "Add Visit Log",
      cardColor: "#F1EEFE",
      upcomingEvent: 0,
    },
    {
      title: "Personal",
      eventName: "Manhatten Harlem Outreach",
      eventDate: "Apr 12, 2023 SAT 5:00pm",
      buttonText: "Edit Details",
      cardColor: "#DEF6EB",
      upcomingEvent: 0,
    },
    {
      title: "BME Official Event",
      eventName: "BK Fort Green Outreach",
      eventDate: "Sept 12, 2023 SAT 12:00pm",
      buttonText: "Edit Details",
      cardColor: "#F1EEFE",
      upcomingEvent: 1,
    },
    {
      title: "Personal",
      eventName: "Manhatten Harlem Outreach",
      eventDate: "Apr 12, 2023 SAT 5:00pm",
      buttonText: "Edit Details",
      cardColor: "#DEF6EB",
      upcomingEvent: 0,
    },
    {
      title: "Group",
      eventName: "Brookolyn Museum Outreach",
      eventDate: "12/12/2023 SAT 5:00pm",
      buttonText: "Add Visit Log",
      cardColor: "#F1EEFE",
      upcomingEvent: 0,
    },
    {
      title: "Personal",
      eventName: "Manhatten Harlem Outreach",
      eventDate: "Apr 12, 2023 SAT 5:00pm",
      buttonText: "Add Visit Log",
      cardColor: "#F1EEFE",
      upcomingEvent: 0,
    },
  ];

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eventsDisplay, setEventsDisplay] = useState([]);
  const navigate = useNavigate();
 
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [visitLogs, setVisitLogs] = useState([]);
  const [visibleItems, setVisibleItems] = useState(3);

  
  // const loadMore = () => {
  //   setVisibleItems((prev) => prev + 3);
  // };


  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await fetchEvents();
      const visitLogsData = await fetchVisitLogs();
      setVisitLogs(visitLogsData)
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
  
  const fetchData = async () => {
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      console.log("UID is ", uid);
      const eventsData = await fetchUserEvents(uid);
      eventsData.sort((a, b) => a.eventDate - b.eventDate);
      setEvents(eventsData);
    } else {
      console.log("No user is signed in.");
      setEvents([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;

      if (user) {
        const uid = user.uid;
        console.log("UID is ", uid);
        const eventsData = await fetchUserEvents(uid);

        eventsData.sort((a, b) => a.eventDate - b.eventDate);
        setEvents(eventsData);
      } else {
        console.log("No user is signed in.");
        setEvents([]);
      }
    };

    fetchData();
  }, [auth.currentUser]);

  useEffect(() => {
    setEventsDisplay(events);
    // searchRef.current = "";
  }, [events]);

  useEffect(() => {
    if (eventsDisplay.length > 0) {
      setIsLoading(false);
    }
  }, [eventsDisplay]);

  const handleStateSelection = (state) => {
    setSelectedState(state);
    const filtered = events.filter(event => event.location.state === state);
    setFilteredEvents(filtered);
    setDropdownVisible(false);
  };

  const upcomingEvents = events
    .filter((event) => {
      const eventDate = new Date(event.eventDate.seconds * 1000);
      return eventDate >= new Date(); // Check if the event date is before the current date
    })
    .slice(0, 3);

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        {/* Aniket */}
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 mt-24  lg:mx-40 lg:mt-32 rounded-2xl bg-white text-black ">
          <UserInfo />
        </div>
        {/* Vishnu */}
        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black mb-10">
          <div className="flex flex-col gap-4 lg:gap-14 lg:p-24 pl-8 pt-4 pb-4 pr-8">
            <div className="inline-flex flex-col sm:flex-row sm:space-x-16 ">
              <div class="text-neutral-800 text-4xl lg:text-5xl font-medium font-bricolage leading-[52px]">
                My Outreaches
              </div>
              <CustomButton
                label="Document my Outreach"
                name="buttondefaulticon"
                icon={icon}
                onClick={() => {
                  navigate("/profile/select-outreach");
                }}
              />
              {/* <div className="inline-flex bg-violet-600 rounded-full gap-2 items-center p-2 lg:p-4 mr-44 mt-2 lg:mt-0">
                <img src={icon} className="w-4 h-4 mt-1" />

                <Link
                  to={"/profile/select-outreach"}
                  className="w-fit rounded-full text-neutral-100 text-[10px] lg:text-[14px] "
                >
                  Document my Outreach
                </Link>
              </div> */}
            </div>
            <div className="">
              <div className="w-full flex flex-col sm:flex-row bg-[#F2F6D8] p-4 rounded-xl gap-4  ">
                <div className="text-neutral-800  text-[20px] font-medium font-bricolage leading-loose  ">
                  Now you can host your own outreach event.
                </div>
                <div className="h-fit">
                  <CustomButton
                    label="Create Outreach"
                    name="buttondefaulticon"
                    icon={add}
                    onClick={() => {
                      navigate("/createOutreach");
                      window.scrollTo(0, 0);
                    }}
                  />
                </div>
                {/* <div className="px-3 py-2 inline-flex bg-violet-600 rounded-full gap-2">
                  <img src={add} className="w-4 h-4" />
                  <Link className="rounded-full text-neutral-100 text-[10px]">
                    Create Outreach
                  </Link>
                </div> */}
              </div>
            </div>
            <div className="sm:hidden overflow-x-auto overflow-y-hidden">
            {isLoading ? (
              <div className="flex justify-between items-center w-full h-fit gap-2">
                <EventCardSkeleton />
                <EventCardSkeleton />
                <EventCardSkeleton />
              </div>
            ):(
              <div className="flex space-x-3 w-fit lg:p-4">
                {events.map((eventData) => (
                  <OutreachEventCard
                    key={eventData.id}
                    cardData={{
                      ...eventData,
                      eventDate: formatDate(
                        new Date(eventData.eventDate.seconds * 1000)
                      ),
                    }}
                    isProfilePage={true}
                    refresh={fetchData}
                  />
                ))}
              </div>
            )}
            </div>
            <div className="hidden sm:block sm:overflow-x-auto overflow-y-hidden">
            {isLoading? (
              <div className="flex justify-between items-center w-full h-fit gap-2">
                <EventCardSkeleton />
                <EventCardSkeleton />
                <EventCardSkeleton />
              </div>
            ):(
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 gap-y-16 mb-6">
                {events.map((eventData) => (
                  <OutreachEventCard
                    key={eventData.id}
                    cardData={{
                      ...eventData,
                      eventDate: formatDate(
                        new Date(eventData.eventDate.seconds * 1000)
                      ),
                    }}
                    isProfilePage={true}
                    refresh={fetchData}
                  />
                ))}
              </div>
            )}
            </div>
          </div>{" "}
        </div>

          <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-10 rounded-2xl bg-white text-black ">
            <div className="p-4 lg:px-28 lg:py-12 space-y-9">   
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
              {isLoading?(
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                </div>
              ):(<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
              {(visitLogs.slice(0,3).map((visitLogData) => (
                <OutreachVisitLogCard visitLogCardData={visitLogData}/>
                    )))}
            </div>)}
              
              {/* {visibleItems < cardData.length && (
                <button
                  className="w-full px-6 py-2.5 rounded-full text-sm font-medium text-violet-950 font-['DM Sans'] border border-stone-300"
                  onClick={loadMore}
                >
                  Load More
                </button>
              )} */}

             </div>                         
          </div>

        {/* Vishnu*/}
      </div>
    </div>
  );
}

export default Profile;
