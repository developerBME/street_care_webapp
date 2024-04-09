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
import axios from 'axios';
import { send2FA } from "./SendUpdateEmail2FA";


function Profile() {

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eventsDisplay, setEventsDisplay] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
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
  } catch (error) {
     console.error("Error Fetching data:", error.message);
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
  }, [events]);

  useEffect(() => {
    if (eventsDisplay.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [eventsDisplay]);

  // useEffect(() => {
  //   send2FA('aishwaryakatkar53@gmail.com', Date.now().toString());
  // }, []);

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        {/* Aniket */}
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 mt-24 lg:mx-40 lg:mt-32 sm:mt-4 sm:mb-4 rounded-2xl bg-white text-black ">
          <UserInfo />
        </div>
        {/* Vishnu */}
            <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black mb-10">
          <div className="flex flex-col gap-4 lg:gap-14 lg:p-24 pl-8 pt-4 pb-4 pr-8">
            <div className="inline-flex flex-col sm:flex-row sm:space-x-16 justify-between ">
              <div class="text-neutral-800 text-4xl lg:text-5xl font-medium font-bricolage text-left leading-[52px]">
                My Outreaches
              </div>
              <CustomButton
                label="Document Personal Outreach"
                className="text-right"
                name="buttondefaulticon"
                icon={icon}
                onClick={() => {
                  navigate("/createOutreach");
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

  <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2  mb-8 rounded-2xl bg-white text-black mt-4">
      <div className="flex flex-col gap-4 lg:gap-14 lg:p-24 pl-8 pt-4 pb-4 pr-8">
        <OutreachVisitLogProfile/>
      </div>
  </div>

</div>
</div>
)
}

export default Profile;
