import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../images/icon.png";
// import add from "../../images/add.png";
import UserInfo from "./UserInfo";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import OutreachEventCard from "../Community/OutreachEventCard";
import {
  formatDate,
  fetchUserOutreaches,
  fetchUserSignedUpOutreaches,
} from "../EventCardService";
import { auth } from "../firebase";
import CustomButton from "../Buttons/CustomButton";
// import { fetchPersonalVisitLogs } from "../VisitLogCardService";
import OutreachVisitLogProfile from "../Community/OutreachVisitLogProfile";
// import NoOutreachDoc from "../Community/NoOutreachDoc";
import NoDisplayData from "./NoDisplayData";
import SignedUpOutreaches from "./SignedUpOutreaches";
import CreatedOutreaches from "./CreatedOutreaches";
import CreatedHelpRequests from "./CreatedHelpRequests";
import ErrorMessage from "../ErrorMessage";

function Profile() {
  //const [createdEvents, setCreatedEvents] = useState([]);
  // const [signedUpEvents, setSignedUpEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eventsDisplay, setEventsDisplay] = useState([]);
  const [isError, setIsError] = useState(false);

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
        //const createdEventsData = await fetchUserOutreaches(uid);
       // createdEventsData.sort((a, b) => a.eventDate - b.eventDate);
        // const signedUpEventsData = await fetchUserSignedUpOutreaches(uid);
        // signedUpEventsData.sort((a, b) => a.eventData - b.eventData);

       // setCreatedEvents(createdEventsData);
        // setSignedUpEvents(signedUpEventsData);
      } else {
        console.log("No user is signed in.");
       // setCreatedEvents([]);
        // setSignedUpEvents([]);
      }
    } catch (error) {
      console.error("Error Fetching data:", error.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">

        {/* Aniket */}
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mt-24 sm:mt-22 sm:mb-4 md:mx-20 md:mt-32 lg:mx-40 rounded-2xl bg-white text-black ">
          <UserInfo />
        </div>
        {/* Vishnu */}

        {/* Signed Up outreaches section */}

        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black mb-10">
          <div className="flex flex-col gap-4 md:px-12 md:py-16 lg:gap-14 lg:p-24 pl-8 pt-4 pb-4 pr-8">
            <SignedUpOutreaches />
          </div>{" "}
        </div>

        {/* Created outreaches section */}

        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black mb-10">
          <div className="flex flex-col gap-4 md:px-12 md:py-16 lg:gap-14 lg:p-24 pl-8 pt-4 pb-4 pr-8">
            <CreatedOutreaches />
          </div>{" "}
        </div>


          {/*  Outreach Visitlog section */}
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black mb-10">
          <div className="flex flex-col gap-4 md:px-12 md:py-16 lg:gap-14 lg:p-24 pl-8 pt-4 pb-4 pr-8">
            <OutreachVisitLogProfile />
          </div>
        </div>

        {/* Created Help Request section */}

        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black mb-10">
          <div className="flex flex-col gap-4 md:px-12 md:py-16 lg:gap-14 lg:p-24 pl-8 pt-4 pb-4 pr-8">
            <CreatedHelpRequests />
          </div>{" "}
        </div>
       
      </div>
    </div> 
    
  );
}

export default Profile;
