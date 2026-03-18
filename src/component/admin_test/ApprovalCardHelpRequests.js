import React from "react";
import calendarIcon from "../../images/calendar_month.svg";
import locationIcon from "../../images/location_on.svg";
import verifiedPurple from "../../images/verified_purple.png";
import verifiedGreen from "../../images/verified.png";
import verifiedBlue from "../../images/verified_blue.png";
import verifiedYellow from "../../images/verified_yellow.png";

// Helper to render tags
const getTags = (postData) => {
  const tags = postData?.furtherHelpCategory || [];
  return tags.map((tag, index) => (
    <span
      key={index}
      className="px-3 py-1 text-xs border border-gray-300 rounded-full text-[#444746]"
    >
      {tag}
    </span>
  ));
};

// Helper for status styling
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

const ApprovalCardHelpRequests = ({
  postData,
  onToggleSelect,
  isSelected,
  onClick,
  selectedButton,
}) => {
  // Format encounter timestamp
  const encounterDate = postData?.timestampOfInteraction
    ? new Date(postData.timestampOfInteraction.seconds * 1000)
    : null;

  const formattedDate = encounterDate
    ? encounterDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Unknown Date";

  // Verified icon (optional)
  let userImage = verifiedYellow; // default
  if (postData.isPublic) userImage = verifiedGreen;

  return (
    <div
      onClick={() => onClick?.(postData.id)}
      className="bg-[#F5EEFE] rounded-[20px] flex flex-col h-full w-full max-w-[320px] p-4 shadow-md cursor-pointer"
    >
      {/* Status */}
      <div className="mt-2 text-right mb-2">
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(
            postData.status,
          )}`}
        >
          {postData.status || "No Status"}
        </span>
      </div>

      {/* Name Section */}
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-sm text-[#37168B] font-medium">
          {postData.firstName || "Unknown Name"}
        </span>
        {userImage && <img alt="" src={userImage} className="w-5 h-5" />}
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
              {postData.locationLandmark || "Unknown Location"}
            </span>
          </div>
        </div>

        {/* Checkbox */}
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

      {/* Description Section */}
      <div className="mt-4">
        <h1 className="text-lg font-medium text-[#1F0A58] line-clamp-1">
          {postData?.furtherHelpCategory?.length
            ? postData.furtherHelpCategory.join(", ")
            : "Help Request"}
        </h1>
        <div className="mt-2 max-h-20 overflow-y-auto">
          <p className="text-sm text-[#444746] leading-relaxed">
            {postData.additionalDetails || "No additional details provided."}
          </p>
        </div>
      </div>

      {/* Tags Section */}
      <div className="mt-4 flex flex-wrap gap-2">{getTags(postData)}</div>
    </div>
  );
};

export default ApprovalCardHelpRequests;
