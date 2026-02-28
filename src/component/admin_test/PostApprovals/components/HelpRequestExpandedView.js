import { useState } from "react";

import verifiedYellow from "../../../../images/verified_yellow.png";
import verifiedGreen from "../../../../images/verified.png";
import verifiedPurple from "../../../../images/verified_purple.png";
import verifiedBlue from "../../../../images/verified_blue.png";
import calendarIcon from "../../../../images/calendar_month.svg";
import flagIcon from "../../../../images/flag.svg";
import locationIcon from "../../../../images/location_on.svg";

/* ---------------- Helpers ---------------- */
const getVerifiedBadge = (userType) => {
  switch (userType) {
    case "Chapter Leader":
      return verifiedGreen;
    case "Chapter Member":
      return verifiedPurple;
    case "Street Care Hub Leader":
      return verifiedBlue;
    default:
      return verifiedYellow;
  }
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

const safeValue = (value, fallback = "N/A") => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string" && value.trim() === "") return fallback;
  if (Array.isArray(value) && value.length === 0) return fallback;
  return value;
};

const toDateSafe = (value) => {
  if (!value) return null;
  if (value?.seconds) return new Date(value.seconds * 1000);
  if (typeof value?.toDate === "function") return value.toDate();
  if (typeof value === "string") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  if (value instanceof Date) return value;
  return null;
};

const formatDateOnly = (d, fallback = "N/A") => {
  if (!d) return fallback;
  return d.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

const formatTimeOnly = (d, fallback = "N/A") => {
  if (!d) return fallback;
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
};

/* ---------------- Expanded View ---------------- */

const HelpRequestExpandedView = ({ postData}) => {
  const personName = safeValue(
    postData?.firstName || postData?.interactionLogFirstName,
  );
  const interactionLogName = safeValue(postData?.interactionLogFirstName);

  const interactionDateObj = toDateSafe(postData?.timestampOfInteraction);
  const dateOnly = formatDateOnly(interactionDateObj);
  const timeOnly = formatTimeOnly(interactionDateObj);

  const locationText = safeValue(postData?.locationLandmark);

  const followUpDateObj = toDateSafe(postData?.followUpTimestamp);
  const followUpDate = formatDateOnly(followUpDateObj);
  const followUpTime = formatTimeOnly(followUpDateObj);

  const completedTimestamp = safeValue(postData?.completedTimestamp);
  const lastModifiedDateObj = toDateSafe(postData?.lastModifiedTimestamp);
  const lastModifiedDate = formatDateOnly(lastModifiedDateObj);

  const description = safeValue(postData?.additionalDetails);
  const status = safeValue(postData?.status);

  const furtherHelpTags = postData?.furtherHelpCategory || [];

  return (
    <div className="w-full">
      {/* OUTER WHITE CARD */}
      {/* <div className="relative bg-white rounded-[28px] p-4 sm:p-6 shadow-lg">*/}

      {/* CLOSE BUTTON */}
      {/* <button
          onClick={() => onClose?.()}
          className="absolute -top-3 -right-3 w-9 h-9 rounded-md border-2 border-[#4B2AA6] bg-white flex items-center justify-center hover:bg-gray-50 transition z-10"
        >
          ✕
        </button> */}

      <div className="bg-[#F4EEFF] rounded-[28px] p-6 sm:p-8 overflow-y-auto max-h-[60vh]">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src={calendarIcon} alt="user" className="w-8 h-8" />
            <h2 className="text-xl sm:text-2xl font-bold text-black">
              {personName}
            </h2>
            <img
              src={getVerifiedBadge(postData?.userType)}
              alt="verified"
              className="w-6 h-6"
            />
          </div>
          <img src={flagIcon} alt="flag" className="w-6 h-6" />
        </div>

        {/* Interaction Log Name if different */}
        {interactionLogName && interactionLogName !== personName && (
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-semibold">Interaction Log Name:</span>{" "}
            {interactionLogName}
          </p>
        )}

        {/* INFO ROWS */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Row 1: Date & Time of Interaction | Location */}
          <div className="flex flex-row gap-4">
            <div className="flex flex-1 items-center gap-3">
              <img
                src={calendarIcon}
                alt="calendar"
                className="w-5 h-5 flex-shrink-0"
              />
              <div className="flex flex-col">
                {/* <span className="text-xs text-gray-500">Date & Time of Interaction</span>*/}
                <span className="text-[15px] text-[#2E1065] font-medium">
                  {dateOnly} {timeOnly}
                </span>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-3">
              <img
                src={locationIcon}
                alt="location"
                className="w-5 h-5 flex-shrink-0"
              />
              <div className="flex flex-col">
                {/* <span className="text-xs text-gray-500">Location</span>*/}
                <span className="text-[15px] text-[#2E1065] font-medium">
                  {locationText}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mb-4">
          <p className="text-[15px] text-[#2E1065]">
            <span className="font-semibold">Additional Details: </span>
            {description}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-4 text-[15px] font-bold">
          <span className="text-[#2E1065]">
            <span>Follow Up Time :</span> {followUpTime}
          </span>
          <span className="text-[#2E1065]">
            <span>Date:</span> {followUpDate}
          </span>
          <span className="text-[#2E1065]">
            <span>Last Modified Time:</span>{" "}
            {formatTimeOnly(lastModifiedDateObj)}
          </span>
          <span className="text-[#2E1065]">
            <span>Date:</span> {lastModifiedDate}
          </span>
        </div>

        {/* FURTHER HELP CATEGORIES */}
        <div>
          <p className="font-semibold text-black mb-2">Further Help Required</p>
          <div className="flex flex-wrap gap-2">
            {furtherHelpTags.length > 0 ? (
              furtherHelpTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-2 text-[13px] border border-[#D1C7F2] rounded-full text-[#4B4B4B] "
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm">
                No further help required
              </span>
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

/* ---------------- Card View ---------------- */

const ApprovalCardHelpRequests = ({
  postData,
  onToggleSelect,
  isSelected,
  onClick,
  selectedButton,
  expanded = false,
  onClose,
}) => {
  const [showAllTags, setShowAllTags] = useState(false);
  if (expanded) {
    return <HelpRequestExpandedView postData={postData} onClose={onClose} />;
  }

  const interactionDateObj = toDateSafe(postData?.timestampOfInteraction);
  const dateTime = interactionDateObj
    ? `${formatDateOnly(interactionDateObj)} ${formatTimeOnly(interactionDateObj)}`
    : "N/A";

  const cardName = safeValue(
    postData?.interactionLogFirstName || postData?.firstName,
  );
  const locationText = safeValue(postData?.locationLandmark);
  const followUpDateObj = toDateSafe(postData?.followUpTimestamp);
  const followUpDateTime = followUpDateObj
    ? `${formatDateOnly(followUpDateObj)} ${formatTimeOnly(followUpDateObj)}`
    : "N/A";
  const tags = postData?.furtherHelpCategory || [];

  const visibleTags = showAllTags ? tags : tags.slice(0, 3);
  const hasMoreTags = tags.length > 3;

  return (
    <div
      onClick={() => onClick?.(postData)}
      className="bg-[#F5EEFE] rounded-[20px] flex flex-col h-full min-h-[300px] w-full max-w-[320px] p-4 shadow-md cursor-pointer"
    >
      {/*  Name , verified , flag */}
      <div className="flex items-center justify-between mb-4 ">
        <div className="flex items-center gap-2">
          <img src={calendarIcon} alt="user" className="w-5 h-5" />
          <span className="text-sm font-semibold text-black">{cardName}</span>
          <img
            src={getVerifiedBadge(postData?.userType)}
            alt="verified"
            className="w-5 h-5"
          />
        </div>

        <img src={flagIcon} alt="flag" className="w-4 h-4" />
      </div>

      {/* Date & Time */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={calendarIcon}
            alt="calendar"
            className="w-4 h-4 flex-shrink-0"
          />
          <span className="text-sm text-[#2E1065] font-medium">{dateTime}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-2">
          <img
            src={locationIcon}
            alt="location"
            className="w-4 h-4 flex-shrink-0"
          />
          <span className="text-sm text-[#2E1065] font-medium">
            {locationText}
          </span>
        </div>
      </div>

      {/* Follow Up Date & Time */}
      <div className="flex items-center gap-2 mb-3">
        <img
          src={calendarIcon}
          alt="followup"
          className="w-4 h-4 flex-shrink-0"
        />
        <span className="text-xs text-[#444746] font-medium">
          {followUpDateTime}
        </span>
      </div>

      {/* Further Help Needed */}
      <div>
        <p className="text-xs font-bold text-gray-500 tracking-wide mb-2">
          Further Help Needed
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.length > 0 ? (
            <>
              {visibleTags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs border border-gray-300 rounded-full text-[#444746]"
                >
                  {tag}
                </span>
              ))}
              {hasMoreTags && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAllTags(!showAllTags);
                  }}
                  className="px-3 py-1 text-xs border border-[#6840E0] rounded-full text-[#6840E0] font-semibold hover:bg-[#6840E0] hover:text-white transition"
                >
                  {showAllTags ? "− Less" : `+${tags.length - 3} More`}
                </button>
              )}
            </>
          ) : (
            <span className="text-xs text-gray-400">N/A</span>
          )}
        </div>
      </div>
    </div>
  );
};
export default ApprovalCardHelpRequests;
export { HelpRequestExpandedView };
