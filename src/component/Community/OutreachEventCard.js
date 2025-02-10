import React, { useState, useEffect } from "react";
import clsx from "clsx";
import defaultImage from "../../images/default_avatar.svg";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore"; // Firestore functions
import { db } from "../firebase"; // Firestore instance
import flagSvg from "../../images/flag.svg"; // Flag icon
import date from "../../images/date.png";
import locate from "../../images/location.png";
import { formatDate } from "../helper";
import CardTags from "./CardTags";
import verifiedPurple from "../../images/verified_purple.png";
import verifiedGreen from "../../images/verified.png";
import verifiedBlue from "../../images/verified_blue.png";
import verifiedYellow from "../../images/verified_yellow.png";
import { useUserContext } from "../../context/Usercontext.js";

const PERSONAL_OUTREACH_COLLECTION = "outreachEvents"; // Collection name
const USERS_COLLECTION = "users"; // User collection

const OutreachEventCard = ({
  cardData,
  isProfilePage,
  isHelpRequestCard,
}) => {
  const { user } = useUserContext();
  const {
    id,
    userName,
    title,
    eventDate,
    location,
    photoUrl,
    description,
    skills,
    userType,
  } = cardData;

  const navigate = useNavigate();

  // State for flag status
  const [isFlagged, setIsFlagged] = useState(false);

  // State for hover
  const [isHovered, setIsHovered] = useState(false);

  // Fetch flag status when component mounts
  useEffect(() => {
    const fetchFlagStatus = async () => {
      try {
        if (!id) {
          console.error("Invalid cardData.id:", id);
          return;
        }

        const docRef = doc(db, PERSONAL_OUTREACH_COLLECTION, id);
        const currentDoc = await getDoc(docRef);

        if (currentDoc.exists()) {
          const { isFlagged } = currentDoc.data();
          setIsFlagged(isFlagged || false);
        } else {
          console.error("Document does not exist:", id);
        }
      } catch (error) {
        console.error("Error fetching flag status:", error);
      }
    };

    fetchFlagStatus();
  }, [id]);

  const handleFlag = async (e) => {
    e.stopPropagation(); // Prevent triggering parent click events
    if (!user) {
      alert("Please log in to flag or unflag the Outreach Events.");
      console.error("User is not logged in.");
      return;
    }

    try {
      if (!id) {
        console.error("Invalid cardData.id:", id);
        return;
      }

      const userRef = doc(db, USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        console.error("User document does not exist:", user.uid);
        return;
      }

      const { Type: userType } = userDoc.data();
      const docRef = doc(db, PERSONAL_OUTREACH_COLLECTION, id);
      const currentDoc = await getDoc(docRef);

      if (!currentDoc.exists()) {
        console.error("Outreach document does not exist:", id);
        return;
      }

      const { isFlagged: currentStatus, flaggedByUser } = currentDoc.data();

      const canUnflag =
        flaggedByUser === user.uid || userType === "Street Care Hub Leader";

      if (currentStatus) {
        if (!canUnflag) {
          alert("Only the user who flagged this event or a Street Care Hub Leader can unflag it.")
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
      console.error("Error toggling document flag status:", error);
    }
  };

  const detailOutreach = () => {
    navigate(`/outreachsignup/${id}`, {
      state: { label: "EDIT", isProfilePage },
    });
  };

  let verifiedImg;
  switch (userType) {
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

  return (
    <div
      className={clsx(
        "min-w-full max-w-[320px] lg:w-full rounded-[30px] mb-4 flex flex-col justify-between cursor-pointer",
        { "bg-[#F5EEFE] p-6": !isHelpRequestCard }
      )}
      onClick={detailOutreach}
    >
      <div className="relative">
        {/* Flag Icon with Hover */}
        <img
          onClick={handleFlag}
          src={flagSvg}
          alt="flag"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`absolute right-4 w-8 h-8 cursor-pointer rounded-full p-1 ${
            isFlagged ? "bg-red-500" : "bg-transparent hover:bg-gray-200"
          }`}
        />
        {isHovered && (
          <div className="absolute right-16 top-0 bg-gray-800 text-white text-sm rounded-md px-2 py-1">
            {!isFlagged ? 'Flag the Outreach Event?' : 'Unflag the Outreach Event?'}
            
          </div>
        )}
      </div>

      {/* User Information */}
      <div className="inline-flex items-center space-x-2">
        <img
          alt=""
          src={photoUrl || defaultImage}
          className="w-8 h-8 rounded-full"
        />
        <div className="font-normal font-inter text-[13px]">{userName}</div>
        <img alt="Verified" src={verifiedImg} className="w-5 h-5" />
      </div>

      {/* Event Details */}
      <div className="my-3 space-y-3 w-full h-full flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row justify-normal space-x-2">
            <img alt="" className="w-[13px] h-[15px] my-[3px]" src={date} />
            <div className="font-medium text-[14px] text-[#37168B]">
              {formatDate(eventDate)}
            </div>
          </div>
          <div className="flex flex-row justify-normal space-x-2">
            <img alt="" className="w-[12px] h-[15px] my-[3px]" src={locate} />
            <div className="font-medium text-[14px] text-[#37168B]">
              {location.city}, {location.stateAbbv || location.state}
            </div>
          </div>
        </div>

        <h1 className="font-medium text-[24px] line-clamp-1">{title}</h1>
        <div className="font-medium text-[14px] text-[#444746] line-clamp-2 h-10">
          {description}
        </div>
        <CardTags tags={skills} />
      </div>
    </div>
  );
};

export default OutreachEventCard;
