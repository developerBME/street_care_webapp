import React from "react";
import defaultImage from "../../images/default_avatar.svg";
import { useNavigate } from "react-router-dom";
import date from "../../images/date.png";
import locate from "../../images/location.png";
import { formatDate } from "../helper";
import CardTags from "./CardTags";

const OutreachVisitLogCard = ({ visitLogCardData }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/VisitLogDetails/${visitLogCardData.id}`);
  };

  return (
    <div
      className="bg-[#F5EEFE] min-w-full max-w-[320px] lg:w-full rounded-[16px] mb-4 flex flex-col justify-between p-4 h-[300px] relative cursor-pointer"
      onClick={handleViewDetails}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm text-[#37168B]">
          <div className="flex items-center">
            <img className="w-4 h-4 mr-1" src={date} alt="Date" />
            {visitLogCardData && visitLogCardData.eventDate ? formatDate(visitLogCardData.eventDate) : null}
          </div>
          <div className="flex items-center">
            <img className="w-4 h-4 mr-1" src={locate} alt="Location" />
            {`${visitLogCardData?.location?.city || visitLogCardData?.city}, ${visitLogCardData?.location?.stateAbbv || visitLogCardData?.stateAbbv || visitLogCardData?.location?.state}`}
          </div>
        </div>
        <h1 className="font-medium text-lg text-gray-800 line-clamp-2">
          {visitLogCardData?.description || ""}
        </h1>
      </div>

      <div className="mt-auto space-y-2">
        <div className="flex justify-between text-sm text-gray-800">
          <div className="font-bold">People Helped</div>
          <div className="font-bold">{visitLogCardData?.numberPeopleHelped}</div>
        </div>
        <div className="flex justify-between text-sm text-gray-800">
          <div className="font-bold">Items Donated</div>
          <div className="font-bold">{visitLogCardData?.itemQty}</div>
        </div>
        <CardTags tags={visitLogCardData?.whatGiven || []} />
      </div>
    </div>
  );
};

export default OutreachVisitLogCard;
