import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../images/default_avatar.svg";
import date from "../../images/date.png";
import locate from "../../images/location.png";
import heartOutline from "../../images/heart-outline.png";
import heartFilled from "../../images/heart-filled.png";
import share from "../../images/share-icon.png";
import verifiedPurple from "../../images/verified_purple.png";
import verifiedGreen from "../../images/verified.png";
import verifiedBlue from "../../images/verified_blue.png";
import verifiedYellow from "../../images/verified_yellow.png";
import CardTags from "./CardTags";
import { handleLikes, setInitialLike } from "../EventCardService";

export const ExpandedOutreachEventCard = ({ cardData, onRefresh }) => {
  const navigate = useNavigate();
  const [justCopied, setJustCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(
    setInitialLike(cardData?.likes ? cardData.likes : [])
  );
  const [likesCount, setLikesCount] = useState(
    cardData?.likes ? cardData.likes.length : 0
  );

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

  let verifiedImg = verifiedYellow;
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
  }

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
      if (typeof onRefresh === "function") {
        onRefresh();
      }
    } catch (err) {
      console.error("Toggle like failed:", err);
    }
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    const url = window.location.origin + `/outreachsignup/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div className="w-full bg-[#F5EEFE] rounded-2xl p-5 text-sm font-sans">
      {/* Header: user info + like/share */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-2">
          <img
            src={photoUrl || defaultImage}
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-[18px] font-bold font-dmsans">{userName}</span>
          <img src={verifiedImg} alt="Verified" className="w-5 h-5" />
        </div>

        {/* Like + Share */}
        <div className="flex items-center space-x-2">
          {likesCount > 0 && (
            <span className="font-medium text-base">{likesCount}</span>
          )}
          <img
            onClick={handleLikeToggle}
            src={isLiked ? heartFilled : heartOutline}
            alt="Like"
            className="w-8 h-8 cursor-pointer rounded-full p-1 hover:bg-gray-200"
          />
          <div className="relative">
            <img
              onClick={handleShare}
              src={share}
              alt="Share"
              className="w-8 h-8 cursor-pointer rounded-full p-1 hover:bg-gray-200"
            />
            {justCopied && (
              <div className="absolute right-0 top-9 bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap z-10">
                Copied to clipboard!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Date + Location */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-4">
        <div className="flex items-center space-x-2">
          <img alt="date" src={date} className="w-4 h-4" />
          <span className="text-sm text-[#37168B] font-medium">{eventDate}</span>
        </div>

        {location && (
          <div className="flex items-center space-x-2">
            <img alt="location" src={locate} className="w-4 h-4" />
            <span className="text-sm text-[#37168B] font-medium">
              {location.city}, {location.stateAbbv || location.state}
            </span>
          </div>
        )}
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 leading-snug mb-3">
        {title}
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed mb-3">
        {description}
      </p>

      {/* Skills / Tags */}
      {Array.isArray(skills) && skills.length > 0 && (
        <CardTags tags={skills} maxShown={6} />
      )}
    </div>
  );
};

export default ExpandedOutreachEventCard;
