import React from "react";
import calendarIcon from "../../images/calendar_month.svg";
import locationIcon from "../../images/location_on.svg";
import verifiedPurple from "../../images/verified_purple.png";
import verifiedGreen from "../../images/verified.png";
import verifiedBlue from "../../images/verified_blue.png";
import verifiedYellow from "../../images/verified_yellow.png";

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

const ApprovalCardVisitlogs = ({
  postData,
  onToggleSelect,
  isSelected,
  isVisitLogs,
  onClick,
  selectedButton,
}) => {
  // Inline date  formatting to handle Firebase Timestamp
  const formattedDate = postData?.timeStamp?.seconds
    ? new Date(postData.timeStamp.seconds * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    : "Unknown Date";

  let userImage = null;

  switch (postData.userType) {
    case "Chapter Leader":
      userImage = verifiedGreen;
      break;
    case "Chapter Member":
      userImage = verifiedPurple;
      break;
    case "Street Care Hub Leader":
      userImage = verifiedBlue;
      break;
    default:
      userImage = verifiedYellow;
      break;
  }

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

      {/* UserName Section */}
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-sm text-[#37168B] font-medium">
          {postData?.userName || "Unknown User"}
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
              {postData?.location?.city || postData?.city
                ? (
                  <>
                    {postData.location?.city || postData.city}
                    {postData.stateAbbv || postData.state
                      ? `, ${postData.stateAbbv || postData.state}`
                      : ""}
                  </>
                )
                : "Unknown City"}
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
          {postData.peopleHelpedDescription || "Event Title"}
        </h1>
        <p className="text-sm text-[#444746] mt-2 line-clamp-2">
          {postData.peopleHelpedDescription || "No description available."}
        </p>
      </div>

      {/* Tags Section */}
      <div className="mt-4 flex flex-wrap gap-2">
        {getTags(postData, isVisitLogs)}
      </div>
    </div>
  );
};

export default ApprovalCardVisitlogs;
