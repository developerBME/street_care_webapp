import React from "react";
import dateIcon from "../../images/date.png";
import locationIcon from "../../images/location.png";
import CardTags from "../Community/CardTags";
import { formatDate } from "../HelperFunction";

const HelpRequestCard = ({ helpRequest }) => {
  const primaryDate =
    helpRequest?.lastModifiedTimestamp || helpRequest?.followUpTimestamp;
  const formattedDate = primaryDate ? formatDate(primaryDate) : "";
  const helpProvided = helpRequest?.helpProvidedCategory || [];
  const furtherHelp = helpRequest?.furtherHelpCategory || [];

  return (
    <div className="bg-[#F5EEFE] w-[320px] rounded-[30px] mb-4 flex flex-col p-[24px] h-auto border-b-[1px] border-gray-200">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">
          {helpRequest?.firstName || "Anonymous"}
        </div>
        {helpRequest?.isCompleted ? (
          <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
            Completed
          </span>
        ) : (
          <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
            {helpRequest?.status || "Open"}
          </span>
        )}
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <img className="w-4 h-4" src={dateIcon} alt="Date" />
          <span className="ml-2 text-sm">{formattedDate}</span>
        </div>
        <div className="flex items-center">
          <img className="w-3 h-4 flex-shrink-0" src={locationIcon} alt="Location" />
          <span className="ml-2 text-sm">
            {helpRequest?.locationLandmark || "Location not specified"}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-bold">Help Provided</div>
        <div className="mt-2">
          <CardTags tags={helpProvided} />
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-bold">Further Help Needed</div>
        <div className="mt-2">
          <CardTags tags={furtherHelp} />
        </div>
      </div>

      <p className="text-sm mt-3 line-clamp-2">
        {helpRequest?.additionalDetails || "No additional details."}
      </p>
    </div>
  );
};

export default HelpRequestCard;
