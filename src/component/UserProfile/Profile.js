import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserProfileCard from "./UserProfileCard";
import icon from "../../images/icon.png";
import add from "../../images/add.png";
import UserInfo from "./UserInfo";
import axc from "./CommOutForm";

import OutreachEventCard from "../Community/OutreachEventCard";
import { fetchUserEvents } from "../EventCardService";
import { auth } from "../firebase";
import CustomButton from "../Buttons/CustomButton";

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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;

      if (user) {
        const uid = user.uid;
        console.log("UID is ", uid);
        const eventsData = await fetchUserEvents(uid);

        // Sort the events based on the eventDate (from soonest to latest)
        eventsData.sort((date1, date2) => {
          const date_1 = new Date(date1.eventDate.seconds * 1000);
          const date_2 = new Date(date2.eventDate.seconds * 1000);
          return date_1 - date_2;
        });
        setEvents(eventsData);
      } else {
        console.log("No user is signed in.");
        setEvents([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        {/* Aniket */}
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 mt-24  lg:mx-40 lg:mt-32 rounded-2xl bg-white text-black ">
          <UserInfo />
        </div>
        {/* Vishnu */}
        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black mb-10">
          <div className="flex flex-col gap-4 lg:gap-14 lg:p-28 pt-4 pb-4 ">
            <div className="inline-flex flex-col sm:flex-row lg:space-x-16 pl-4">
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
            <div className="  hidden sm:block">
              <div className="w-full inline-flex bg-[#F2F6D8] p-4 rounded-xl space-x-4">
                <div className="text-neutral-800 text-[16px] font-medium font-bricolage leading-loose">
                  Congratulations! You have attended more than 1 outreach event.
                  Now you can host your own.
                </div>
                <CustomButton
                  label="Create Outreach"
                  name="buttondefaulticon"
                  icon={add}
                  onClick={() => {
                    navigate("/createOutreach");
                  }}
                />
                {/* <div className="px-3 py-2 inline-flex bg-violet-600 rounded-full gap-2">
                  <img src={add} className="w-4 h-4" />
                  <Link className="rounded-full text-neutral-100 text-[10px]">
                    Create Outreach
                  </Link>
                </div> */}
              </div>
            </div>
            <div className="sm:hidden overflow-x-auto">
              <div className="flex space-x-3 w-fit lg:p-4 pl-4">
                {events.map((eventData) => (
                  <OutreachEventCard
                    key={eventData.id}
                    cardData={eventData}
                    isProfilePage={true}
                  />
                ))}
              </div>
            </div>
            <div className="hidden sm:block sm:overflow-x-auto">
              <div className="grid grid-cols-3 gap-2 gap-y-16">
                {events.map((eventData) => (
                  <OutreachEventCard
                    key={eventData.id}
                    cardData={eventData}
                    isProfilePage={true}
                  />
                ))}
              </div>
            </div>
          </div>{" "}
        </div>

        {/* Vishnu*/}
      </div>
    </div>
  );
}

export default Profile;
