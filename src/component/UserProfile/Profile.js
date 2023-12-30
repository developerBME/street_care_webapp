import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../images/icon.png";
import add from "../../images/add.png";
import UserInfo from "./UserInfo";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import OutreachEventCard from "../Community/OutreachEventCard";
import { formatDate, fetchUserEvents } from "../EventCardService";
import { auth } from "../firebase";
import CustomButton from "../Buttons/CustomButton";
import { fetchEvents } from "../EventCardService";
import { fetchPersonalVisitLogs } from "../VisitLogCardService";
import OutreachVisitLogProfile from "../Community/OutreachVisitLogProfile";
import NoOutreachDoc from "../Community/NoOutreachDoc";


function Profile() {

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eventsDisplay, setEventsDisplay] = useState([]);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("myoutreach");


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  
  const fetchData = async () => {
    const visitLogsData = await fetchPersonalVisitLogs(auth?.currentUser?.uid);
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



  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        {/* Aniket */}
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 mt-24  lg:mx-40 lg:mt-32 rounded-2xl bg-white text-black ">
          <UserInfo />
        </div>
        <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl">
          <div
            className={`h-[63px] inline-flex w-full rounded-2xl ${
              activeTab === "myoutreach" ? "bg-violet-50" : "bg-[#E2FAFF]"
            }`}
          >
            <button
              className={`${
                activeTab === "myoutreach"
                  ? "bg-[#1F0A58] text-white"
                  : "bg-[#E2FAFF] text-[#005363]"
              } text-xl font-medium px-4 py-2 w-1/2 rounded-2xl `}
              onClick={() => handleTabClick("myoutreach")}
            >
              Personal Outreach
            </button>
            <button
              className={`${
                activeTab === "visitlog"
                  ? "bg-[#005363] text-[#E2FAFF] rounded-2xl"
                  : "bg-violet-50 text-violet-950 rounded-r-2xl "
              } text-xl font-medium px-4 py-2 w-1/2 `}
              onClick={() => handleTabClick("visitlog")}
            >
              Personal Visit Log
            </button>
          </div>
        </div>
        {/* Vishnu */}
        {
          activeTab === "myoutreach" ? (
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
              </div>
            </div>
            
            <div className="hidden sm:block sm:overflow-x-auto overflow-y-hidden">
            {isLoading? (
              <div className="flex justify-between items-center w-full h-fit gap-2">
                <EventCardSkeleton />
                <EventCardSkeleton />
                <EventCardSkeleton />
              </div>
            ) : events.length === 0 ? (
              <NoOutreachDoc />
            ) : (
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

):(
  <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2  rounded-2xl bg-white text-black mt-8">
      <div className="p-4 lg:px-28 lg:py-12 space-y-9">
        <OutreachVisitLogProfile/>
</div>

{/* Vishnu*/}

</div>
)
}
</div>
</div>
)
}

export default Profile;
