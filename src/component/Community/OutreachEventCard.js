import React, { useState } from "react";
import clsx from "clsx";
import defaultImage from "../../images/default_avatar.svg";
//import verifiedImg from "../../images/verified_purple.png";
import CustomButton from "../Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import EditModal from "./EditModal";
import userSlots from "../../images/userSlots.png";
import date from "../../images/date.png";
import locate from "../../images/location.png";
import { formatDate } from "../helper";
import CardTags from "./CardTags";
import HelpRequestCard from "./HelpRequestCard";
import verifiedPurple from "../../images/verified_purple.png";
import verifiedGreen from "../../images/verified.png";
import verifiedBlue from "../../images/verified_blue.png";
import verifiedYellow from "../../images/verified_yellow.png"

const OutreachEventCard = ({
  cardData,
  isProfilePage,
  isHelpRequestCard,
}) => {
  const {
    id,
    userName,
    title,
    status,
    eventDate,
    location,
    photoUrl,
    description,
    skills,
    userType,
  } = cardData;

  const navigate = useNavigate();

  // Navigate to the outreach details page
  const detailOutreach = () => {
    navigate(`/outreachsignup/${id}`,{
      state: { label: "EDIT",isProfilePage },
    });
  };

  // Assign verified image based on userType
  let verifiedImg;
  switch (userType) {
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

  return (
    <div
      className={clsx(
        "min-w-full max-w-[320px] lg:w-full rounded-[30px] mb-4 flex flex-col justify-between cursor-pointer",
        { "bg-[#F5EEFE] p-6": !isHelpRequestCard }
      )}
      onClick={detailOutreach} // Always navigate to details page
    >
      {/* User Information */}
      <div className="inline-flex items-center space-x-2 ">
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

        {/* Title and Description */}
        <h1 className="font-medium text-[24px] line-clamp-1">{title}</h1>
        <div className="font-medium text-[14px] text-[#444746] line-clamp-2 h-10">
          {description}
        </div>

        {/* Tags */}
        <CardTags tags={skills} />
      </div>
    </div>
  );
};

export default OutreachEventCard;