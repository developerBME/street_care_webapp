import React from "react";
import { useNavigate } from "react-router-dom";
import dateIcon from "../../images/date.png";
import locationIcon from "../../images/location.png";
//import verifiedImg from "../../images/verified_purple.png";
import defaultImage from "../../images/default_avatar.svg";
import { formatDate } from "../helper";
import CardTags from "./CardTags";
import verifiedPurple from "../../images/verified_purple.png";
import verifiedGreen from "../../images/verified.png";
import verifiedBlue from "../../images/verified_blue.png";
import verifiedYellow from "../../images/verified_yellow.png"


const OutreachVisitLogCard = ({ visitLogCardData }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/VisitLogDetails/${visitLogCardData.id}`);
  };

  let verifiedImg;
  switch (visitLogCardData?.userType) {
    case "Chapter Leader":
      verifiedImg = verifiedGreen;
      break;
    case "Streetcare Hub Leader":
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
      className="bg-[#F5EEFE] w-[320px] rounded-[30px] mb-4 flex flex-col p-[24px] h-auto cursor-pointer border-b-[1px] border-gray-200"
      onClick={handleViewDetails}
    >
      <div className="inline-flex items-center space-x-2 ">
          <img
            alt=""
            src={visitLogCardData.defaultImage || defaultImage}
            className="w-8 h-8 rounded-full"
          />
          <div className="font-normal font-inter text-[13px] ">{visitLogCardData.userName}</div>
          <img alt="" src={verifiedImg} className="w-5 h-5" />
        </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <img className="w-4 h-4" src={dateIcon} alt="Date" />
          <span className="ml-2 text-sm">{visitLogCardData && visitLogCardData.eventDate ? formatDate(visitLogCardData.eventDate) : null}</span>
        </div>
        <div className="flex items-center">
          <img className="w-3 h-4" src={locationIcon} alt="Location" />
          <span className="ml-2 text-sm">{`${visitLogCardData?.location?.city || visitLogCardData?.city}, ${visitLogCardData?.location?.stateAbbv || visitLogCardData?.stateAbbv || visitLogCardData?.location?.state}`}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm font-bold">People Helped</div>
        <div className="text-xl font-bold">{visitLogCardData?.numberPeopleHelped}</div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="text-sm font-bold">Items Donated</div>
        <div className="text-xl font-bold">{visitLogCardData?.itemQty}</div>
      </div>

      <div className="mt-3">  {/* Adjusted gap from 12px here */}
        <CardTags tags={visitLogCardData?.whatGiven || []} />
      </div>

      <p className="text-sm mt-2 line-clamp-2">
        {visitLogCardData?.description || ""}
      </p>
    </div>
  );
};

export default OutreachVisitLogCard;
