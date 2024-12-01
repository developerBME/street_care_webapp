import React from "react";
import calendarIcon from "../../images/calendar_month.svg";
import locationIcon from "../../images/location_on.svg";
import { formatDate } from "../HelperFunction";

const getTags = (postData, isVisitLogs) => {
  const tags = [];
  if (isVisitLogs) {
    tags.push([...postData?.whatGiven]);
  } else {
    tags.push([...postData?.skills]);
  }

  return tags.map((tag, index) => (
    <span
      key={index}
      className="px-3 py-1 text-xs border border-gray-300 rounded-full text-[#444746]"
    >
      {tag}
    </span>
  ));
};

const ApprovalCard = ({
  postData,
  onToggleSelect,
  isSelected,
  isVisitLogs,
}) => {
  // Safely handle date formatting
  const formattedDate = isVisitLogs
    ? postData?.eventDate
    : postData?.eventDate?.seconds
    ? formatDate(new Date(postData.eventDate.seconds * 1000))
    : "Unknown Date";

  return (
    <div className="bg-[#F5EEFE] rounded-[20px] flex flex-col h-full w-full max-w-[320px] p-4 shadow-md cursor-pointer">
      {/* Top Section: Date and Location */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col space-y-2">
          {/* Date */}
          <div className="flex items-center space-x-2">
            <img alt="calendar" src={calendarIcon} className="w-4 h-4" />
            <span className="text-sm text-[#37168B] font-medium">
              {formattedDate}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-2">
            <img alt="location" src={locationIcon} className="w-4 h-4" />
            <span className="text-sm text-[#37168B] font-medium">
              {postData?.location?.city || "Unknown City"},{" "}
              {postData?.location?.stateAbbv || postData?.location?.state || ""}
            </span>
          </div>
        </div>

        {/* Checkbox Section */}
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-violet-900"
            checked={isSelected}
            onChange={() => onToggleSelect(postData.id)}
          />
        </label>
      </div>

      {/* Middle Section: Title and Description */}
      <div className="mt-4">
        {/* Title */}
        <h1 className="text-lg font-medium text-[#1F0A58] line-clamp-1">
          {postData.title || "Event Title"}
        </h1>

        {/* Description */}
        <p className="text-sm text-[#444746] mt-2 line-clamp-2">
          {postData.description || "No description available."}
        </p>
      </div>

      {/* Tags Section */}
      <div className="mt-4 flex flex-wrap gap-2">
        {getTags(postData, isVisitLogs)}
      </div>
    </div>
  );
};

export default ApprovalCard;
