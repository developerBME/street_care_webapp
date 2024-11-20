// import React, { useState, useEffect, useRef, useMemo} from "react";
// import OutreachEventCard from "../Community/OutreachEventCard";
// import { formatDate, fetchUserSignedUpOutreaches } from "../EventCardService";
// import { useNavigate } from "react-router-dom";
// import { IoIosArrowBack } from "react-icons/io";
// import EventCardSkeleton from "../../component/Skeletons/EventCardSkeleton";
// import { auth } from "../firebase";

// const AllSignedUpOutreaches = () => {
//   const navigate = useNavigate();
//   const [signedUpEvents, setSignedUpEvents] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
  
  
//   const searchRef = useRef("");
//   const [eventsDisplay, setEventsDisplay] = useState([]);
//   const [visibleCards, setVisibleCards] = useState(12);
//   const loadMore = () => {
//     setVisibleCards((prev) => prev + 12);
//   };

//   const fetchData = async () => {
//     try {
//       const user = auth.currentUser;

//       if (user) {
//         const uid = user.uid;
//         console.log("UID is ", uid);
//         const signedUpEventsData = await fetchUserSignedUpOutreaches(uid);
//         signedUpEventsData.sort((a, b) => a.eventData - b.eventData);

//         setSignedUpEvents(signedUpEventsData);
//       } else {
//         console.log("No user is signed in.");
//         setSignedUpEvents([]);
//       }
//     } catch (error) {
//       setIsError(true);
//       setSignedUpEvents([]);
//       setErrorMsg("All Signed Up Outreaches could not be loaded. Please try again later.");
//       console.error("Error Fetching data:", error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

  
//   useEffect(() => {
//     // Set loading to false after 3 seconds
//     const timeoutId = setTimeout(() => {
//       setIsLoading(false);
//     }, 3000);

//     return () => clearTimeout(timeoutId); // Clear the timeout if the component unmounts
//   }, []);

//   // Set returnTarget and returnText directly to home page
//   const returnTarget = "/";
//   const returnText = "Return to Home";

//   return (
//     <div className="relative flex flex-col items-center ">
//       <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl bg-white text-black">
//         <div
//           className="absolute flex mt-[-50px] items-center cursor-pointer"
//           onClick={() => {
//             navigate(returnTarget);
//           }}
//         >
//           <IoIosArrowBack className="w-6 h-6" />
//           <p className="font-bricolage text-xl font-bold leading-7">{returnText}</p>
//         </div>
//         <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
//           <p className="font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
//             All Signed Up Outreaches
//           </p>
//           {isLoading ? (
//             <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
//               <EventCardSkeleton />
//               <EventCardSkeleton />
//               <EventCardSkeleton />
//             </div>
//           ) : (
//             <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
//               {signedUpEvents.map((signedUpEventsData) => (
//                 <OutreachEventCard
//                 key={signedUpEventsData.id}
//                 cardData={{
//                   ...signedUpEventsData,
//                   eventDate: formatDate(
//                     new Date(signedUpEventsData.eventDate.seconds * 1000)
//                   ),
//                 }}
//                 isProfilePage={true}
//                 refresh={fetchData}
//               />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllSignedUpOutreaches;

import React, { useState, useEffect } from "react";
import OutreachEventCard from "../Community/OutreachEventCard";
import { fetchUserSignedUpOutreaches } from "../EventCardService";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import EventCardSkeleton from "../../component/Skeletons/EventCardSkeleton";
import { auth } from "../firebase";
import { Modal } from "@mui/material";
import OutreachSignupModal from "../Community/OutreachSignupModal";
import { formatDate } from "./../HelperFunction";

const AllSignedUpOutreaches = () => {
  const navigate = useNavigate();
  const [signedUpEvents, setSignedUpEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showWithdrawnModal, setShowWithdrawnModal] = useState(false);
  const [triggerEffect, setTriggerEffect] = useState(false);

  const openModal = (event) => {
    console.log("Rudviq");
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const onSignUp = () => {
    setSelectedEvent(null);
    setShowSignUpModal(true);
    setIsLoading(true);
  };

  const onEventWithdraw = () => {
    setSelectedEvent(null);
    setShowWithdrawnModal(true);
    setIsLoading(true);
    setTriggerEffect((prev) => !prev);
  };

  
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  const [visibleCards, setVisibleCards] = useState(12);
  const loadMore = () => {
    setVisibleCards((prev) => prev + 12);
  };

  const fetchData = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        const uid = user.uid;
        console.log("UID is ", uid);
        const signedUpEventsData = await fetchUserSignedUpOutreaches(uid);
        signedUpEventsData.sort((a, b) => a.eventData - b.eventData);

        setSignedUpEvents(signedUpEventsData);
      } else {
        console.log("No user is signed in.");
        setSignedUpEvents([]);
      }
    } catch (error) {
      setIsError(true);
      setSignedUpEvents([]);
      setErrorMsg("All Signed Up Outreaches could not be loaded. Please try again later.");
      console.error("Error Fetching data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtered events based on the search query
  const filteredEvents = signedUpEvents.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())

  );
  

  // Set returnTarget and returnText directly to home page
  const returnTarget = "/";
  const returnText = "Return to Home";

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl bg-white text-black">
        <div
          className="absolute flex mt-[-50px] items-center cursor-pointer"
          onClick={() => {
            navigate(returnTarget);
          }}
        >
          <IoIosArrowBack className="w-6 h-6" />
          <p className="font-bricolage text-xl font-bold leading-7">{returnText}</p>
        </div>
        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
          <div className="flex items-center justify-between mb-6">
            <p className="font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
              All Signed Up Outreaches
            </p>
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search Title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border border-gray-300 rounded-md ml-4 w-1/2 md:w-1/3"
            />
          </div>
          {isLoading ? (
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : (
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              {filteredEvents.map((signedUpEventsData) => (
                
                <OutreachEventCard
                  key={signedUpEventsData.id}
                  cardData={{
                    ...signedUpEventsData,
                    eventDate: formatDate(
                      new Date(signedUpEventsData.eventDate.seconds * 1000)
                    ),
                  }}
                  isProfilePage={true}
                  refresh={fetchData}
                  openModal={() =>
                    openModal({
                      ...signedUpEventsData,
                      eventDate: signedUpEventsData.eventDate?.seconds
                        ? formatDate(
                            new Date(signedUpEventsData.eventDate.seconds * 1000)
                          )
                        : signedUpEventsData.eventDate,
                    })
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal open={!!selectedEvent}>
          <OutreachSignupModal
            data={{ ...selectedEvent }}
            closeModal={closeModal}
            onSignUp={onSignUp}
            onEventWithdraw={onEventWithdraw}
          />
      </Modal>
    </div>
  );
};

export default AllSignedUpOutreaches;
