
import verifiedYellow from "../../../../images/verified_yellow.png";
import verifiedGreen from "../../../../images/verified.png";
import verifiedPurple from "../../../../images/verified_purple.png";
import verifiedBlue from "../../../../images/verified_blue.png";
import calendarIcon from "../../../../images/calendar_month.svg";
import locationIcon from "../../../../images/location_on.svg";
import defaultImage from "../../../../images/default_avatar.svg";


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
    case "Pending":
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
    postData?.firstName 
  );
  const interactionLogName = safeValue(postData?.interactionLogFirstName);

  const interactionDateObj = toDateSafe(postData?.timestampOfInteraction);
  const dateOnly = formatDateOnly(interactionDateObj);
  const timeOnly = formatTimeOnly(interactionDateObj);

  const locationText = safeValue(postData?.locationLandmark);

  const followUpDateObj = toDateSafe(postData?.followUpTimestamp);
  const followUpDate = formatDateOnly(followUpDateObj);
  const followUpTime = formatTimeOnly(followUpDateObj);

  //const completedTimestamp = safeValue(postData?.completedTimestamp);
  const lastModifiedDateObj = toDateSafe(postData?.lastModifiedTimestamp);
  const lastModifiedDate = formatDateOnly(lastModifiedDateObj);

  const description = safeValue(postData?.additionalDetails);
 // const status = safeValue(postData?.status);

  const furtherHelpTags = postData?.furtherHelpCategory || [];

  return (
    <div className="w-full">

      <div className="bg-[#F4EEFF] rounded-[28px] p-6 sm:p-8 overflow-y-auto max-h-[60vh]">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img src={postData?.photoUrl || defaultImage} alt="user" className="w-8 h-8" />
            <h2 className="text-xl sm:text-2xl font-bold text-black">
              {personName}
            </h2>
            <img
              src={getVerifiedBadge(postData?.userType)}
              alt="verified"
              className="w-6 h-6"
            />
          </div>
          {/* <img src={flagIcon} alt="flag" className="w-6 h-6" /> */}
        </div>

        {/* Interaction Log Name if different */}
        {interactionLogName && interactionLogName !== personName && (
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-semibold">Interaction Log Name:</span>{" "}
            {interactionLogName}
          </p>
        )}

        {/* INFO ROWS */}
        <div className="flex flex-col gap-4 mb-4">
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
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4 text-[14px] font-medium">
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
                N/A
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
  if (expanded) {
    return <HelpRequestExpandedView postData={postData} onClose={onClose} />;
  }

  const interactionDateObj = toDateSafe(postData?.timestampOfInteraction);
  const dateTime = interactionDateObj
    ? `${formatDateOnly(interactionDateObj)} ${formatTimeOnly(interactionDateObj)}`
    : "N/A";

  const cardName = safeValue(postData?.firstName);
  const locationText = safeValue(postData?.locationLandmark);
  const followUpDateObj = toDateSafe(postData?.followUpTimestamp);
  const followUpDate = formatDateOnly(followUpDateObj);
  const followUpTime = formatTimeOnly(followUpDateObj);
  const followUpDateTime = followUpDateObj ? `${followUpDate} ${followUpTime}` : "N/A";
  const tags = postData?.furtherHelpCategory || [];

  const visibleTags = tags;

  return (
    <div
      onClick={() => onClick?.(postData)}
      className="bg-[#F5EEFE] rounded-[20px] flex flex-col h-full w-full max-w-[320px] p-4 shadow-md cursor-pointer"
    >
      {/*  photo + name + badge + status*/}
    <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 leading-none">
          <img
            src={postData?.photoUrl || defaultImage}
            alt="User"
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
          <span className="text-[16px] font-medium leading-none">{cardName}</span>
          <img src={getVerifiedBadge(postData?.userType)} alt="verified" className="w-5 h-5" />
        </div>
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(postData?.status)}`}>
          {safeValue(postData?.status)}
        </span>
      </div>

      {/* Date + checkbox  */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <img alt="calendar" src={calendarIcon} className="w-4 h-4" />
          <span className="text-sm text-[#37168B] font-medium">{dateTime}</span>
        </div>
        {selectedButton && (
          <label
            className="inline-flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-violet-900"
              checked={isSelected}
              onChange={() => {
                const id = postData?.id || postData?.docId || postData?.interactionLogDocId;
                onToggleSelect?.(id);
              }}
            />
          </label>
        )}
      </div>


      {/* Location */}
      <div className="flex items-center space-x-2 mb-1">
        <img alt="location" src={locationIcon} className="w-4 h-4" />
        <span className="text-sm text-[#37168B] font-medium">{locationText}</span>
      </div>

      {/* Follow Up row */}
      <div className="flex flex-row justify-between py-2 ">
        <span className="font-medium text-[14px]">Follow Up Date : {followUpDateTime}</span>
        <span className=" font-medium text-[14px]"></span>
      </div>

      {/* Further Help Needed tags */}
      <div className="mt-2">
        <p className=" text-xs font-medium text-gray-500 tracking-wide mb-2">Further Help Needed</p>
        <div className="flex flex-wrap gap-2">
          {tags.length > 0 ? (
            visibleTags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs border border-gray-300 rounded-full text-[#444746]"
              >
                {tag}
              </span>
            ))
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
