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
import collectionMapping from "../../utils/firestoreCollections.js";
import heartOutline from "../../images/heart-outline.png";
import heartFilled from "../../images/heart-filled.png";
import share from "../../images/share-icon.png";
import { handleLikes, setInitialLike } from "../EventCardService";
import {getStatusStyle} from "../../component/admin_test/ApprovalCardOutreachEvents.js";

const outreachEvents_collection = collectionMapping.outreachEvents; // Collection name
const users_collection = collectionMapping.users; // User collection

const OutreachEventCard = ({
  cardData,
  isProfilePage,
  isHelpRequestCard,
  onUpdate, // NEW: parent refresh callback
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
    likes,
    status,
  } = cardData;

  const navigate = useNavigate();

  // State for flag status
  const [isFlagged, setIsFlagged] = useState(false);

  const [justCopied, setJustCopied] = useState(false);

  // State for hover
  const [isHovered, setIsHovered] = useState(false);

  const [isLiked, setIsLiked] = useState(setInitialLike(likes?likes:[]));

  const [likesCount, setLikesCount] = useState(likes ? likes.length : 0);

  // Fetch flag status when component mounts
  useEffect(() => {
    const fetchFlagStatus = async () => {
      try {
        if (!id) {
          console.error("Invalid cardData.id:", id);
          return;
        }

        const docRef = doc(db, outreachEvents_collection, id);
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

      const userRef = doc(db, users_collection, user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        console.error("User document does not exist:", user.uid);
        return;
      }

      const { Type: userType } = userDoc.data();
      const docRef = doc(db, outreachEvents_collection, id);
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


  const handleShare = async (e) => {
    e.stopPropagation();
    const currentUrl = window.location.host + `/outreachsignup/${id}`;
    try {
      await navigator.clipboard.writeText(currentUrl);
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 2000);
    }
    catch (err) {
      console.error("Failed to copy link: ", err);
      setJustCopied(false);
    }
  };
  const handleLikeToggle = async (e) => {
    e.stopPropagation();
    try {
      await handleLikes(
        e,
        id,
        navigate,
        isLiked ? "DISLIKE" : "LIKE",
        setIsLiked,
        setLikesCount,
        false
      );
      // Tell parent to refresh (this will hide the section when last like is removed)
      if (isProfilePage && typeof onUpdate === "function") {
        onUpdate();
      }
    } catch (err) {
      console.error("Toggle like failed:", err);
    }
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
      <div className="relative flex justify-end space-x-2 absolute right-4 top-0">
        {/* Like Count */}
        {likesCount > 0 && (
          <div className="font-medium text-[18px]">
            {likesCount}
          </div>
        )}

        {/* Like Button */}
        <img
          onClick={handleLikeToggle}
          src={isLiked ? heartFilled : heartOutline}
          alt="like"
          className="w-8 h-8 cursor-pointer rounded-full p-1 hover:bg-gray-200"
        />

        {/* Share Button */}
        <div className="relative">
          <img
            onClick={(e) => handleShare( e )}
            src={share}
            alt="share"
            className="w-8 h-8 cursor-pointer rounded-full p-1 hover:bg-gray-200"
          />
          {justCopied && (
            <div className="absolute -left-[150px] top-0 bg-gray-800 text-white text-sm rounded-md px-2 py-1 z-10">
              {"Copied To Clipboard!"}
            </div>
          )}
        </div>

        {/* Flag Button */}
        <div className="relative">
          <img
            onClick={handleFlag}
            src={flagSvg}
            alt="flag"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`w-8 h-8 cursor-pointer rounded-full p-1 ${
              isFlagged ? "bg-red-500" : "bg-transparent hover:bg-gray-200"
              }`}
          />
          {isHovered && (
            <div className="absolute -left-[150px] top-0 bg-gray-800 text-white text-sm rounded-md px-2 py-1 z-10">
              {!isFlagged ? "Flag the Outreach Event?" : "Unflag the Outreach Event?"}
            </div>
          )}
        </div>
      </div>

{/* User Information */}
<div className="flex items-center justify-between w-full">
  {/* Left group (items 1–3) */}
  <div className="flex items-center gap-2 min-w-0">
    <img
      alt=""
      src={photoUrl || defaultImage}
      className="w-8 h-8 rounded-full"
    />
    <div className="font-normal font-inter text-[13px]">{userName}</div>
    <img alt="Verified" src={verifiedImg} className="w-5 h-5" />
  </div>

  {/* Right item (item 4) */}
  {isProfilePage && (
    <span
      className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(
        cardData.status
      )}`}
    >
      {cardData.status.charAt(0).toUpperCase() + cardData.status.slice(1) || "No Status"}
    </span>
  )}
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
