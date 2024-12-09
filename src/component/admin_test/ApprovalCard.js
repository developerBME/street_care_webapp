import React from "react";
import calendarIcon from "../../images/calendar_month.svg";
import locationIcon from "../../images/location_on.svg";
import { formatDate } from "../HelperFunction";

const getTags = (postData, isVisitLogs) => {
  console.log("ApprovalCard postData:", postData);
  const tags = isVisitLogs ? postData?.whatGiven || [] : postData?.skills || [];
  
  return tags.map((tag, index) => (
    <span
      key={index}
      className="px-3 py-1 text-xs border border-gray-300 rounded-full text-[#444746]"
    >
      {tag}
    </span>
  ));
};

const getStatusStyle = (status) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-600 border border-green-600";
    case "pending":
      return "bg-yellow-100 text-yellow-600 border border-yellow-600";
    case "rejected":
      return "bg-red-100 text-red-600 border border-red-600";
    default:
      return "bg-gray-100 text-gray-600 border border-gray-600";
  }
};

const ApprovalCard = ({
  postData,
  onToggleSelect,
  isSelected,
  isVisitLogs,
  onClick,
  selectedButton,
}) => {
  // Format date safely
  const formattedDate = isVisitLogs
    ? postData?.eventDate
    : postData?.eventDate?.seconds
    ? formatDate(new Date(postData.eventDate.seconds * 1000))
    : "Unknown Date";

  return (
    <div
      onClick={() => onClick?.(postData.id)}
      className="bg-[#F5EEFE] rounded-[20px] flex flex-col h-full w-full max-w-[320px] p-4 shadow-md cursor-pointer"
    >
      {/* Status */}
      <div className="mt-2 text-right mb-2">
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(
            postData.status
          )}`}
        >
          {postData.status || "No Status"}
        </span>
      </div>

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
        {selectedButton && (
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-violet-900"
              checked={isSelected}
              onClick={(e) => e.stopPropagation()} // Prevent card onClick
              onChange={() => onToggleSelect?.(postData.id)}
            />
          </label>
        )}
      </div>

      {/* Middle Section: Title, Description, and Status */}
      <div className="mt-4">
        <h1 className="text-lg font-medium text-[#1F0A58] line-clamp-1">
          {postData.title || "Event Title"}
        </h1>
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
