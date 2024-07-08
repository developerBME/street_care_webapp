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
// import { fetchPersonalVisitLogs } from "../VisitLogCardService";
import OutreachVisitLogProfile from "../Community/OutreachVisitLogProfile";
import NoOutreachDoc from "../Community/NoOutreachDoc";
import NoDisplayData from "./NoDisplayData";

function Profile() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eventsDisplay, setEventsDisplay] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // const visitLogsData = await fetchPersonalVisitLogs(
      //   auth?.currentUser?.uid
      // );
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
  }, []);

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

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        {/* Aniket */}
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mt-24 sm:mt-22 sm:mb-4 md:mx-20 md:mt-32 lg:mx-40 rounded-2xl bg-white text-black ">
          <UserInfo />
        </div>
        {/* Vishnu */}
        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black mb-10">
          <div className="flex flex-col gap-4 md:px-12 md:py-16 lg:gap-14 lg:p-24 pl-8 pt-4 pb-4 pr-8">
            <div className="inline-flex flex-col sm:flex-row sm:space-x-16 justify-between gap-2">
              <div class="text-neutral-800 text-4xl lg:text-5xl font-medium font-bricolage text-left leading-[52px]">
                Created Outreaches
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
            <div className="pt-4">
              <div className="w-full flex flex-col sm:flex-row bg-[#F2F6D8] p-4 rounded-xl gap-4 justify-between">
                <div className="text-neutral-800  text-[20px] font-medium font-bricolage leading-loose">
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

            <div className="block overflow-x-auto overflow-y-hidden">
              {isLoading ? (
                <div className="flex justify-between items-center w-full h-fit gap-2">
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                </div>
              ) : events.length === 0 ? (
                <NoOutreachDoc />
              ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 mb-6">
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

        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black mb-10">
          <div className="flex flex-col gap-4 md:px-12 md:py-16 lg:gap-14 lg:p-24 pl-8 pt-4 pb-4 pr-8">
            <div className="inline-flex flex-col sm:flex-row sm:space-x-16 justify-between gap-2">
              <div class="text-neutral-800 text-4xl lg:text-5xl font-medium font-bricolage text-left leading-[52px]">
                Signed Up Outreaches
              </div>
            </div>
            {/* <div className="pt-4">
              <div className="w-full flex flex-col sm:flex-row bg-[#F2F6D8] p-4 rounded-xl gap-4 justify-between">
                <div className="text-neutral-800  text-[20px] font-medium font-bricolage leading-loose">
                  Now you can view your created outreach events.
                </div>
              </div>
            </div> */}

            <div className="block overflow-x-auto overflow-y-hidden">
              {isLoading ? (
                <div className="flex justify-between items-center w-full h-fit gap-2">
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                </div>
              ) : events.length === 0 ? (
                <NoDisplayData
                name="signedupoutreaches" 
                label="No outreach events created"/>
              ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 mb-6">
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
        
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl rounded-2xl bg-white text-black mb-4">
          <div className="flex flex-col gap-4 md:py-16 md:px-12 lg:gap-14 lg:p-12 sm:pl-8 sm:pr-8 pl-4 pr-4 pt-4 pb-4 ">
            <OutreachVisitLogProfile />
          </div>
        </div>
        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black mb-10">
          <div className="flex flex-col gap-4 md:px-12 md:py-16 lg:gap-14 lg:p-24 pl-8 pt-4 pb-4 pr-8">
            <div className="inline-flex flex-col sm:flex-row sm:space-x-16 justify-between gap-2">
              <div class="text-neutral-800 text-4xl lg:text-5xl font-medium font-bricolage text-left leading-[52px]">
                My Help Requests
              </div>
              <CustomButton
                label="Document Help Requests"
                className="text-right"
                name="buttondefaulticon"
                icon={icon}
                onClick={() => {
                  navigate("/createOutreach");
                }}
              />
            </div>
            <div className="pt-4">
              {/* <div className="w-full flex flex-col sm:flex-row bg-[#F2F6D8] p-4 rounded-xl gap-4 justify-between">
                <div className="text-neutral-800  text-[20px] font-medium font-bricolage leading-loose">
                  Now you can document your help requests.
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
              </div> */}
            </div>
            <div className="block overflow-x-auto overflow-y-hidden">
              {isLoading ? (
                <div className="flex justify-between items-center w-full h-fit gap-2">
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                </div>
              ) : events.length === 0 ? (
                <NoDisplayData
                name="helprequest" 
                label="No Help Requests created"/>
              ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 mb-6">
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
      </div>
    </div>
  );
}

export default Profile;
