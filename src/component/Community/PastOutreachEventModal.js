import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopUpModal from "../PopUpModal";
import CardTags from "./CardTags";
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
import { fetchEventById, handleLikes, setInitialLike } from "../EventCardService";

const PastOutreachEventModal = ({ eventId, onClose }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [justCopied, setJustCopied] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const result = await fetchEventById(eventId);
        setData(result);
        const likesArr = Array.isArray(result?.likes) ? result.likes : [];
        setIsLiked(setInitialLike(likesArr));
        setLikesCount(likesArr.length);
      } catch (err) {
        console.error("Failed to load event:", err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [eventId]);

  const handleLikeToggle = async (e) => {
    e.stopPropagation();
    try {
      await handleLikes(
        e,
        eventId,
        navigate,
        isLiked ? "DISLIKE" : "LIKE",
        setIsLiked,
        setLikesCount,
        false
      );
    } catch (err) {
      console.error("Toggle like failed:", err);
    }
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    const url = window.location.origin + `/outreachsignup/${eventId}`;
    try {
      await navigator.clipboard.writeText(url);
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  let verifiedImg = verifiedYellow;
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
    }
  }

  return (
    <PopUpModal onClose={onClose}>
      {isLoading ? (
        <div className="w-full flex items-center justify-center py-8">
          <div className="text-gray-500 text-sm">Loading...</div>
        </div>
      ) : !data ? (
        <div className="w-full flex items-center justify-center py-8">
          <div className="text-red-500 text-sm">Failed to load event details.</div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4">
          {/* Header: user info + like/share */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <img
                src={data.photoUrl || defaultImage}
                alt="User"
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="text-sm font-normal text-gray-800">
                {data.userName}
              </span>
              <img src={verifiedImg} alt="Verified" className="w-5 h-5" />
            </div>

            {/* Like + Share */}
            <div className="flex items-center gap-2">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <img src={date} alt="Date" className="w-3.5 h-3.5" />
              <span className="text-sm font-medium text-[#37168B]">
                {data.eventDate}
              </span>
            </div>
            {data.location && (
              <div className="flex items-center gap-1">
                <img src={locate} alt="Location" className="w-3 h-3.5" />
                <span className="text-sm font-medium text-[#37168B]">
                  {data.location.city},{" "}
                  {data.location.stateAbbv || data.location.state}
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 leading-snug">
            {data.title}
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">
            {data.description}
          </p>

          {/* Skills / Tags */}
          {Array.isArray(data.skills) && data.skills.length > 0 && (
            <CardTags tags={data.skills} maxShown={6} />
          )}
        </div>
      )}
    </PopUpModal>
  );
};

export default PastOutreachEventModal;
