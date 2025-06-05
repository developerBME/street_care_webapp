import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import defaultImage from "../../images/default_avatar.svg";
import { fetchVisitLogById } from "../VisitLogCardService";
import date from "../../images/date.png";
import locate from "../../images/location.png";
//import verifiedImg from "../../images/verified_purple.png";
import { formatDate } from "../helper";
import CardTags from "./CardTags";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import verifiedPurple from "../../images/verified_purple.png";
import verifiedGreen from "../../images/verified.png";
import verifiedBlue from "../../images/verified_blue.png";
import verifiedYellow from "../../images/verified_yellow.png";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import flagIcon from "../../images/flag.svg";
import { useUserContext } from "../../context/Usercontext.js";

import collectionMapping from "../../utils/firestoreCollections.js";

const visitLogs_collection = collectionMapping.visitLogs;
const users_collection = collectionMapping.users;

const VisitLogDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [data, setData] = useState(null);
  
  // Log the received state for debugging
  console.log("VisitLogDetails received state:", location.state);
  
  // Initialize state from multiple sources for redundancy
  const [savedPaginationState, setSavedPaginationState] = useState(() => {
    // Try to get from sessionStorage first (most reliable)
    try {
      const storedState = sessionStorage.getItem('paginationState');
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        console.log("Retrieved pagination state from sessionStorage:", parsedState);
        return parsedState;
      }
    } catch (error) {
      console.error("Error parsing sessionStorage pagination state:", error);
    }
    
    // Fall back to location.state if sessionStorage fails
    if (location.state) {
      return location.state;
    }
    
    // Default fallback
    return { currentPage: 1 };
  });
  
  // Store pagination state in multiple places for redundancy
  useEffect(() => {
    // Store in window object
    window.paginationState = savedPaginationState;
    
    // Also ensure it's in sessionStorage
    try {
      sessionStorage.setItem('paginationState', JSON.stringify(savedPaginationState));
      console.log("Stored pagination state in sessionStorage:", savedPaginationState);
    } catch (error) {
      console.error("Error storing pagination state in sessionStorage:", error);
    }
  }, [savedPaginationState]);



  const { user } = useUserContext();
  const [isFlagged, setIsFlagged] = useState(false);

useEffect(() => {
  if (id) {
    const fetchFlagStatus = async () => {
      try {
        const docRef = doc(db, visitLogs_collection, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIsFlagged(docSnap.data().isFlagged || false);
        }
      } catch (error) {
        console.error("Error fetching flag status:", error);
      }
    };
    fetchFlagStatus();
  }
}, [id]);

const handleFlag = async (e) => {
  e.stopPropagation(); // Prevent any parent click events
  if (!user) {
      alert("Please log in to flag or unflag the interaction log.");
      return;
    }
    try {
      // Get the user document to check the user type
      const userRef = doc(db, users_collection, user.uid);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        console.error("User document does not exist");
        return;
      }
      const { Type: userType } = userDoc.data();

      // Get the visit log document
      const docRef = doc(db, visitLogs_collection, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.error("Document does not exist");
        return;
      }

      const { isFlagged: currentStatus, flaggedByUser } = docSnap.data();
    const canUnflag = flaggedByUser === user.uid || userType === "Street Care Hub Leader";
    // (Optional) Restrict unflagging if needed:
    if (currentStatus && !canUnflag) {
      alert("Only Street Care Hub Leader or User who flagged it can unflag this post.");
      return;
    }
    
    if (currentStatus) {
      await updateDoc(docRef, { isFlagged: false, flaggedByUser: null });
      setIsFlagged(false);
    } else {
      await updateDoc(docRef, { isFlagged: true, flaggedByUser: user.uid });
      setIsFlagged(true);
    }
  } 
  catch (error) {
    console.error("Error toggling flag status:", error);
  }
};


  const returnTarget = "/allOutreachVisitLog";
  const returnText = "Return to Interaction Logs";

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchVisitLogById(id);
        setData(result);
      } catch (error) {
        console.error(error.message);
      }
    };

    getData(); // Invoke the async function
  }, [id]);

  let verifiedImg;
  if (data) {
    switch (data.userType) {
      case "Chapter Leader":
        verifiedImg = verifiedGreen;
        break;
      case "Chapter Member":
        verifiedImg = verifiedPurple;
        break;
      case "Street Care Hub Leader":
        verifiedImg = verifiedBlue;
        break;
      default:
        verifiedImg = verifiedYellow;
        break;
    }
  }

  return (
    <div className="relative flex flex-col items-center ">
      <div className="mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl bg-white text-black w-full md:w-fit">
        <div
          className="absolute flex mt-[-50px] items-center cursor-pointer "
          onClick={() => {
            // Get the pagination state from multiple sources for redundancy
            let stateToPass;
            
            // Try sessionStorage first (most reliable)
            try {
              const storedState = sessionStorage.getItem('paginationState');
              if (storedState) {
                stateToPass = JSON.parse(storedState);
                console.log("Using pagination state from sessionStorage for navigation:", stateToPass);
              }
            } catch (error) {
              console.error("Error retrieving pagination state from sessionStorage:", error);
            }
            
            // Fall back to other sources if sessionStorage fails
            if (!stateToPass) {
              stateToPass = window.paginationState || savedPaginationState || { currentPage: 1 };
              console.log("Using fallback pagination state for navigation:", stateToPass);
            }
            
            // Navigate back to the list view with the pagination state
            navigate(returnTarget, { 
              state: stateToPass,
              replace: true // Use replace to avoid history stacking
            });
          }}
        >
          <IoIosArrowBack className="w-6 h-6" />{" "}
          <p className=" font-bricolage text-xl font-bold leading-7">
            {returnText}
          </p>
        </div>
        <div className="md:px-[150px] md:py-[100px] px-[20px] py-[15px]">
          <div className="md:space-y-[64px] space-y-[32px]">
            <div className="font-medium font-dmsans text-[45px] text-neutral-800 leading-[52px]">
              Interaction Log Details
            </div>
            {data ? (
              <div className="bg-[#F5EEFE] min-w-full max-w-[320px] lg:w-full rounded-[30px] mb-4 flex flex-col justify-between p-6">
                <div className="flex items-center justify-between">
                  {/* Left side: User info */}
                  <div className="flex items-center space-x-2">
                    <img
                      src={data?.photoUrl || defaultImage}
                      alt="User"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-[13px] font-normal font-inter">
                      {data?.userName || "Not defined"}
                    </span>
                    <img src={verifiedImg} alt="Verified" className="w-5 h-5" />
                  </div>

  {/* Right side: Flag icon */}
  <div className="relative flex items-center group">
  <img
    onClick={handleFlag}
    src={flagIcon}
    alt="flag"
    className={`w-8 h-8 cursor-pointer rounded-full p-1 ${
      isFlagged ? "bg-red-500" : "bg-transparent hover:bg-gray-200"
    }`}
  />
   <div 
            className="absolute right-10 top-0 bg-gray-800 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-30 whitespace-normal"
            style={{ minWidth: "150px", maxWidth: "200px", textAlign: "center" }}
          >
                      {!isFlagged
                        ? "Flag the Interaction Log?"
                        : "Unflag the Interaction Log?"}
                    </div>
                  </div>

</div>


                <div className="my-3 space-y-3 w-full h-full flex flex-col">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row justify-normal space-x-2">
                      <img className="w-[13px] h-[15px] my-[3px]" src={date} />
                      <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
                        {data && data?.eventDate
                          ? formatDate(data?.eventDate)
                          : null}
                      </div>
                    </div>
                    <div className="flex flex-row justify-normal space-x-2">
                      <img
                        className="w-[12px] h-[15px] my-[3px]"
                        src={locate}
                      />
                      <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
                        {`${data?.location?.city}, ${
                          data?.location?.stateAbbv || data?.location?.state
                        }`}
                      </div>
                    </div>
                  </div>

                  <h1 className="font-medium text-[18px] font-dmsans text-[#444746]">
                    {data?.description || ""}
                  </h1>

                  <div className="flex flex-row justify-between">
                    <div className="font-bold text-[14px] font-dmsans text-[#444746] line-clamp-1">
                      People Helped
                    </div>
                    <div className="font-bold text-[14px] font-dmsans text-[#444746] line-clamp-1">
                      {data?.numberPeopleHelped}
                    </div>
                  </div>

                  <div className="flex flex-row justify-between">
                    <div className="font-bold text-[14px] font-dmsans text-[#444746] line-clamp-1">
                      Participants
                      {/* Changed from Items Donated on frontend */}
                    </div>
                    <div className="font-bold text-[14px] font-dmsans text-[#444746] line-clamp-1">
                      {data?.itemQty}
                    </div>
                  </div>

                  <CardTags
                    tags={data?.whatGiven || []}
                    maxShown={data?.whatGiven.length || 0}
                  />
                </div>
              </div>
            ) : (
              <EventCardSkeleton />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitLogDetails;
