import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import dateIcon from "../../images/date.png";
import flagIcon from "../../images/flag.svg";
import locationIcon from "../../images/location.png";
import defaultImage from "../../images/default_avatar.svg";
import { formatDate } from "../helper";
import CardTags from "./CardTags";

import verifiedPurple from "../../images/verified_purple.png";
import verifiedGreen from "../../images/verified.png";
import verifiedBlue from "../../images/verified_blue.png";
import verifiedYellow from "../../images/verified_yellow.png";
import { useUserContext } from "../../context/Usercontext.js";

const PERSONAL_VISIT_LOG_COLLECTION = "personalVisitLog";

const OutreachVisitLogCard = ({ visitLogCardData }) => {
  const navigate = useNavigate();
  const { user } = useUserContext(); // Access user context
  const [isFlagged, setIsFlagged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentUserType = visitLogCardData?.userType;

  // Fetch flag info when component mounts
  useEffect(() => {
    const fetchFlagStatus = async () => {
      try {
        if (visitLogCardData?.id) {
          const docRef = doc(db, PERSONAL_VISIT_LOG_COLLECTION, visitLogCardData.id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setIsFlagged(docSnap.data().isFlagged);
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
    case "Internal Member":
      verifiedImg = verifiedBlue;
      break;
    default:
      verifiedImg = verifiedYellow;
      break;
  }

  const handleFlag = async (e) => {
    e.stopPropagation(); // Prevent triggering parent click events
    console.log("user:"+user.currentUserType);
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    try {
      if (!visitLogCardData?.id) {
        console.error("Invalid visitLogCardData.id");
        return;
      }

      const docRef = doc(db, PERSONAL_VISIT_LOG_COLLECTION, visitLogCardData.id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.error("Document does not exist:", visitLogCardData.id);
        return;
      }

      const currentIsFlagged = docSnap.data().isFlagged;
      console.log("currentUserType:"+currentUserType);
      // Restrict unflagging to specific user types
      if (currentIsFlagged && !(currentUserType === "Chapter Leader" || currentUserType === "Internal Member")) {
        console.error("Only Chapter Leader or Internal Member can unflag this post.");
        return;
      }

      // Toggle flag status
      const newIsFlagged = !currentIsFlagged;
      await updateDoc(docRef, { isFlagged: newIsFlagged });

      console.log(`Document ${visitLogCardData.id} updated to isFlagged: ${newIsFlagged}`);
      setIsFlagged(newIsFlagged);
    } catch (error) {
      console.error("Error toggling flag status:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Placeholder while loading flag status
  }

  // Restrict visibility of flagged logs
  if (isFlagged && !(currentUserType === "Chapter Leader" || currentUserType === "Internal Member")) {
    return null; // Do not render the card for unauthorized users
  }

  return (
    <div
      className="bg-[#F5EEFE] w-[320px] rounded-[30px] mb-4 flex flex-col p-[24px] h-auto cursor-pointer border-b-[1px] border-gray-200"
      onClick={handleViewDetails}
    >
      <div className="relative">
        {/* Flag Button */}
        <div className="absolute right-0 w-8 h-8 cursor-pointer rounded-full p-1 group">
        <img
          onClick={handleFlag}
          src={flagIcon}
          alt="flag"
          className={`absolute right-4 w-8 h-8 cursor-pointer rounded-full p-1 ${
            isFlagged ? "bg-red-500" : "bg-transparent hover:bg-gray-200"
          }`}
          />
          {/* Tooltip */}
          <div 
            className="absolute -top-14 right-0 bg-black text-white text-xs rounded-md px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-30 whitespace-normal"
            style={{ minWidth: "150px", maxWidth: "200px", textAlign: "center" }}
          >
            If you feel this log is a spam, click on the flag.
          </div>
        </div>
        </div>

      {/* User Information */}
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

      {/* Event Details */}
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

      {/* Additional Details */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm font-bold">People Helped</div>
        <div className="text-xl font-bold">{visitLogCardData?.numberPeopleHelped}</div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="text-sm font-bold">Items Donated</div>
        <div className="text-xl font-bold">{visitLogCardData?.itemQty}</div>
      </div>

      <div className="mt-3">
        <CardTags tags={visitLogCardData?.whatGiven || []} />
      </div>

      <p className="text-sm mt-2 line-clamp-2">{visitLogCardData?.description || ""}</p>
    </div>
  );
};

export default OutreachVisitLogCard;
