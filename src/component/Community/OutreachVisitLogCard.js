import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import dateIcon from "../../images/date.png";
import flagIcon from "../../images/flag.svg";
import infoIcon from "../../images/info_icon.png"; // Add an info icon image
import locationIcon from "../../images/location.png";
import defaultImage from "../../images/default_avatar.svg";
import { formatDate } from "../helper";
import CardTags from "./CardTags";

import verifiedPurple from "../../images/verified_purple.png";
import verifiedGreen from "../../images/verified.png";
import verifiedBlue from "../../images/verified_blue.png";
import verifiedYellow from "../../images/verified_yellow.png";
import { useUserContext } from "../../context/Usercontext.js";

import collectionMapping from "../../utils/firestoreCollections.js";

const visitLogs_collection = collectionMapping.visitLogs;
const users_collection = collectionMapping.users; // User collection

const OutreachVisitLogCard = ({ visitLogCardData }) => {
  const navigate = useNavigate();

  // Fetch flag info when component mounts
  const [isFlagged, setIsFlagged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentUserType = visitLogCardData?.userType;
  const { user } = useUserContext();
  useEffect(() => {
  const fetchFlagStatus = async () => {
    try {
      
      if (visitLogCardData?.id) {
        const docRef = doc(db, visitLogs_collection, visitLogCardData.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIsFlagged(docSnap.data().isFlagged || false);
        }
      }
    } catch (error) {
      console.error("Error fetching flag status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchFlagStatus();
}, [visitLogCardData?.id]);

  const handleViewDetails = () => {
    navigate(`/VisitLogDetails/${visitLogCardData.id}`);
  };

  let verifiedImg;
  switch (currentUserType) {
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

  const handleFlag = async (e) => {
    e.stopPropagation(); // Prevent triggering parent click events
    if (!user) {
      alert("Please log in to flag or unflag the visit log.");
      console.error("User is not logged in.");
      return;
    }
    try {
      if (!visitLogCardData?.id) {
        console.error("Invalid visitLogCardData.id");
        return;
      }
      
      const userRef = doc(db, users_collection, user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        console.error("User document does not exist:", user.uid);
        return;
      }

      const { Type: userType } = userDoc.data();
      const docRef = doc(db, visitLogs_collection, visitLogCardData?.id);
      const docSnap = await getDoc(docRef);
  
      if (!docSnap.exists()) {
        console.error("Document does not exist:", user.uid);
        return;
      }
      console.log("user:",userType);
      const { isFlagged: currentStatus, flaggedByUser } = docSnap.data();
      const canUnflag =
        flaggedByUser === user.uid || userType === "Street Care Hub Leader";
      const currentIsFlagged = docSnap.data().isFlagged;
  
      // Restrict unflagging to specific user types
      if (currentIsFlagged && !(canUnflag)) {
        alert("Only Street Care Hub Leader or User who flagged it can unflag this post.");
        return; 
      }
  
      if (currentStatus) {
              if (!canUnflag) {
                console.error(
                  "Only the user who flagged this event or a Street Care Hub Leader can unflag it."
                );
                return;
              }
      
              await updateDoc(docRef, { isFlagged: false, flaggedByUser: null });
              setIsFlagged(false);
            } else {
              await updateDoc(docRef, { isFlagged: true, flaggedByUser: user.uid });
              setIsFlagged(true);
            }
    } catch (error) {
      console.error("Error toggling flag status:", error);
    }
  };
  

  if (isLoading) {
    return <div>Loading...</div>; // Placeholder while loading flag status
  }

  return (
    <div
      className="bg-[#F5EEFE] w-[320px] rounded-[30px] mb-4 flex flex-col p-[24px] h-auto cursor-pointer border-b-[1px] border-gray-200"
      onClick={handleViewDetails}
    >
      <div className="relative group">
        {/* Flag Button */}
        <img
          onClick={handleFlag}
          src={flagIcon}
          alt="flag"
          className={`absolute right-4 w-8 h-8 cursor-pointer rounded-full p-1 ${
            isFlagged ? "bg-red-500" : "bg-transparent hover:bg-gray-200"
          }`}
        />
        <div 
            className="absolute right-16 top-0 bg-gray-800 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-30 whitespace-normal"
            style={{ minWidth: "150px", maxWidth: "200px", textAlign: "center" }}
          >
            {!isFlagged ? 'Flag the Visit Log?' : 'Unflag the Visit Log?'}
        </div>
      </div>
      
      {/* Rest of the Component */}
      <div className="inline-flex items-center space-x-2">
        <img
          alt=""
          src={visitLogCardData.defaultImage || defaultImage}
          className="w-8 h-8 rounded-full"
        />
        <div className="font-normal font-inter text-[13px]">
          {visitLogCardData.userName}
        </div>
        <img alt="" src={verifiedImg} className="w-5 h-5" />
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <img className="w-4 h-4" src={dateIcon} alt="Date" />
          <span className="ml-2 text-sm">
            {visitLogCardData?.eventDate ? formatDate(visitLogCardData.eventDate) : null}
          </span>
        </div>
        
        <div className="flex items-center">
          <img className="w-3 h-4" src={locationIcon} alt="Location" />
          <span className="ml-2 text-sm">
            {`${visitLogCardData?.location?.city || visitLogCardData?.city}, ${
              visitLogCardData?.location?.stateAbbv ||
              visitLogCardData?.stateAbbv ||
              visitLogCardData?.location?.state
            }`}
          </span>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm font-bold">People Helped</div>
        <div className="text-xl font-bold">
          {visitLogCardData?.numberPeopleHelped}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <div className="text-sm font-bold">Items Donated</div>
        <div className="text-xl font-bold">{visitLogCardData?.itemQty}</div>
      </div>
      
      <div className="mt-3">
        <CardTags tags={visitLogCardData?.whatGiven || []} />
      </div>
      
      <p className="text-sm mt-2 line-clamp-2">
        {visitLogCardData?.description || ""}
      </p>
    </div>
  );
};

export default OutreachVisitLogCard;
