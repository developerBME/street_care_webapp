import calendarIcon from "../../../../images/calendar_month.svg";
import emailIcon from "../../../../images/email.png";
import locationIcon from "../../../../images/location_on.svg";
import phoneIcon from "../../../../images/phone.png";
import verifiedPurple from "../../../../images/verified_purple.png";
// import closeIcon from "../../images/close.png";
import defaultImage from "../../../../images/default_avatar.svg";
import clockIcon from "../../../../images/ic_outline-access-time.svg";
import verifiedGreen from "../../../../images/verified.png";
import verifiedBlue from "../../../../images/verified_blue.png";
import verifiedYellow from "../../../../images/verified_yellow.png";
import CardTags from "../../../Community/CardTags";


const getTags = (postData, isVisitLogs) => {
  // console.log("ApprovalCard postData:", postData);
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
    case "Pending":
      return "bg-yellow-100 text-yellow-600 border border-yellow-600";
    case "rejected":
      return "bg-red-100 text-red-600 border border-red-600";
    default:
      return "bg-gray-100 text-gray-600 border border-gray-600";
  }
};

// ─── Expanded Detail View ─────────────────────────────────────────────────────
// Shown inside the modal when the user clicks a visit log card.
// Layout matches the reference image:
//   • Header  : person icon + name + verified badge  |  flag icon (top-right)
//   • 2-col info grid : date | location, phone | time, address | email
//   • Description with dotted separator line
//   • Solid divider
//   • Stats rows : People Joined, Help Request Count, People Helped,
//                  Items Donated, Care Packages Distributed, Care Package Contents
//   • Tag pills at the bottom
// NOTE: Accept / Reject buttons are NOT here — they live in PostApprovals.
const VisitLogExpandedView = ({ postData, userImage }) => {
  // Format date from Firebase Timestamp — prefer timeStamp, fallback to lastModifiedTimestamp
  const formattedDate = postData?.timeStamp?.seconds
    ? new Date(postData.timeStamp.seconds * 1000).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
    : postData?.lastModifiedTimestamp?.seconds
      ? new Date(
          postData.lastModifiedTimestamp.seconds * 1000,
        ).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
      : "Unknown Date";

  let userBadge = null;
  switch (postData.userType) {
    case "Chapter Leader":
      userBadge = verifiedGreen;
      break;
    case "Chapter Member":
      userBadge = verifiedPurple;
      break;
    case "Street Care Hub Leader":
      userBadge = verifiedBlue;
      break;
    default:
      userBadge = verifiedYellow;
      break;
  }
  // Build time range string e.g. "02:05PM  –  05:05PM"
  const startTime = postData?.startTime || "";
  const endTime = postData?.endTime || "";
  const timeRange =
    startTime && endTime
      ? `${startTime}  –  ${endTime}`
      : startTime || endTime || "N/A";

  // Build city + state display string
  const city = postData?.location?.city || postData?.city || "";
  const state =
    postData?.location?.state || postData?.stateAbbv || postData?.state || "";
  const locationDisplay =
    city || state ? `${city}${state ? `, ${state}` : ""}` : "Unknown City";

  // Support tags — prefer listOfSupportsProvided, fallback to whatGiven
  const tags = postData?.listOfSupportsProvided || postData?.whatGiven || [];

  return (
    <div className="w-full bg-[#F0EBFF] rounded-2xl p-5 text-sm font-sans">
      {/* ── Header: person icon + name + badge  |  flag icon ── */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-2">
          <img
            src={postData?.photoUrl || defaultImage}
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-[18px] font-bold font-dmsans">
            {postData?.firstName || "Anonymous User"} {postData?.lastName || ""}
          </span>
          <img src={userBadge} alt="Verified" className="w-5 h-5" />
        </div>

        {/* Flag / report icon (top-right) */}
        {/* <span className="text-gray-400 text-xl">
          <img src={flagIcon} alt="Flag" className="w-7 h-7" />
        </span> */}
      </div>

      {/* ── 2-column Info Grid ── */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-4">
        {/* Date — left column */}
        <div className="flex items-center space-x-2">
          <img alt="calendar" src={calendarIcon} className="w-4 h-4" />
          <span className="text-sm text-[#37168B] font-medium">
            {formattedDate}
          </span>
        </div>

        {/* Location — right column */}
        <div className="flex items-center space-x-2">
          <img alt="location" src={locationIcon} className="w-4 h-4" />
          <span className="text-sm text-[#37168B] font-medium">
            {postData?.location?.city || postData?.city ? (
              <>
                {postData.location?.city || postData.city}
                {postData.stateAbbv || postData.state
                  ? `, ${postData.stateAbbv || postData.state}`
                  : ""}
              </>
            ) : (
              "Unknown City"
            )}
          </span>
        </div>

        {/* Phone — left column */}
        <div className="flex items-center space-x-2">
          <span className="text-[#37168B]">
            <img alt="phone" src={phoneIcon} className="w-4 h-4" />
          </span>
          <span className="text-sm text-[#37168B] font-medium">
            {postData?.phoneNumber || "N/A"}
          </span>
        </div>

        {/* Time range — right column */}
        <div className="flex items-center space-x-2">
          <img alt="clock" src={clockIcon} className="w-4 h-4" />
          <span className="text-sm text-[#37168B] font-medium">
            {postData?.startTimestamp?.seconds &&
            postData?.endTimestamp?.seconds
              ? `${new Date(
                  postData.startTimestamp.seconds * 1000,
                ).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })} - ${new Date(
                  postData.endTimestamp.seconds * 1000,
                ).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`
              : "Unknown Time"}
          </span>
        </div>

        {/* Address — left column */}
        <div className="flex items-center space-x-2">
          <img alt="location" src={locationIcon} className="w-4 h-4" />
          <span className="text-sm text-[#37168B] font-medium">
            {postData?.addr1 || postData?.location?.address || "N/A"}
          </span>
        </div>

        {/* Email — right column */}
        <div className="flex items-center space-x-2">
          <span className="text-[#37168B]">
            <img alt="email" src={emailIcon} className="w-4 h-4" />
          </span>
          <span className="text-sm text-[#37168B] font-medium">
            {postData?.email || "N/A"}
          </span>
        </div>
      </div>

      {/* ── Description with dotted underline (matches reference image) ── */}
      {/* <div className="flex items-start gap-1 text-gray-700 mb-1">
        <span className="font-semibold whitespace-nowrap">Description:</span>
        <span className="text-gray-500 text-xs leading-5 border-b border-dotted border-gray-400 flex-1">
          {postData?.peopleHelpedDescription || postData?.description || ""}
        </span>
      </div> */}
      {/* Second dotted line beneath description */}
      {/* <div className="border-b border-dotted border-gray-300 mb-4" /> */}

      {/* ── Solid divider line ── */}
      {/* <div className="border-t border-gray-300 mb-4" /> */}

      {/* ── Stats Rows ── */}
      {/* <div className="space-y-2 mb-5">
        <div className="flex justify-between">
          <span className="font-semibold text-black">People Joined</span>
          <span className="font-semibold text-black">
            {postData?.numPeopleJoined ?? "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-black">Help Request Count</span>
          <span className="font-semibold text-black">
            {postData?.helpRequestCount ?? "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-black">People Helped</span>
          <span className="font-semibold text-black">
            {postData?.numPeopleHelped ?? "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-black">Items Donated</span>
          <span className="font-semibold text-black">
            {postData?.itemsDonated ?? postData?.numItemsDonated ?? "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-black">
            Care Packages Distributed
          </span>
          <span className="font-semibold text-black">
            {postData?.carePackagesDistributed ?? "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-black">
            Care Package Contents
          </span>
          <span className="font-semibold text-black">
            {postData?.carePackageContents ?? "—"}
          </span>
        </div>
      </div> */}
      {[
        { label: "People Joined", value: postData?.numPeopleJoined },
        {
          label: "Help Request Count",
          value: postData?.helpRequestCount,
        },
        { label: "People Helped", value: postData?.numPeopleHelped },
        { label: "Items Donated", value: postData?.numItemsDonated },
        {
          label: "Care Packages Distributed",
          value: postData?.carePackagesDistributed,
        },
        // {
        //   label: "Care Package Contents",
        //   value: postData?.carePackageContents,
        // },
        {
          label: "Items Donated",
          value: postData?.numItemsDonated,
        },
      ].map(
        ({ label, value }) =>
          value !== undefined && (
            <div
              key={label}
              className="flex flex-row justify-between py-2"
            >
              <span className="font-bold text-[14px] font-dmsans">{label}</span>
              <span className="font-bold text-[14px] font-dmsans">{value}</span>
            </div>
          ),
      )}

      {/* ── Tag Pills ── */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs border border-gray-400 rounded-full text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

const ApprovalCardVisitlogs = ({
  postData,
  onToggleSelect,
  isSelected,
  isVisitLogs,
  selectedButton,
  // onCardClick is called by PostApprovals to know which post was clicked,
  // so it can open its own modal with the expanded view + Reject/Accept buttons
  onCardClick,
  onClick,
}) => {
  // Inline date formatting to handle Firebase Timestamp
  const formattedDate = postData?.lastModifiedTimestamp?.seconds
    ? new Date(
        postData.lastModifiedTimestamp.seconds * 1000,
      ).toLocaleDateString("en-US", {
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

  // useEffect(() => {
  //   console.log("postData:", postData);
  //   console.log("PhotoUrl:", postData?.photoUrl);
  // }, []);

  return (
    <>
      {/* ── Collapsed Card (always visible in the grid) ── */}
      <div
        onClick={() => {
          onCardClick?.(postData, userImage);
          onClick?.(postData.id);
        }}
        className="bg-[#F5EEFE] rounded-[20px] flex flex-col h-full w-full max-w-[320px] p-4 shadow-md cursor-pointer" // old code
        // className="bg-[#F5EEFE] min-w-full max-w-[320px] lg:w-full rounded-[30px] mb-4 flex flex-col justify-between p-6" // Updated code
      >
        {/* Status */}
        {/* <div className="mt-2 text-right mb-2">
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(
              postData.status
            )}`}
          >
            {postData.status || "No Status"}
          </span>
        </div> */}

        {/* UserName Section */}
        {/* <div className="flex items-center space-x-2 mb-3">
          <span className="text-sm text-[#37168B] font-medium">
            {postData?.userName || "Unknown User"}
          </span>
          {userImage && <img alt="" src={userImage} className="w-5 h-5" />}
        </div> */}

        {/* New code */}
        {/* Top Section: User info */}
        <div className="flex items-center justify-between mb-2">
          {/* Left side: User info */}
          <div className="flex items-center space-x-2">
            <img
              src={postData?.photoUrl || defaultImage}
              alt="User"
              className="w-8 h-8 rounded-full"
            />

            <span className="text-[13px] font-normal font-inter">
              {postData?.firstName || "Anonymous User"}{" "}
              {postData?.lastName || ""}
            </span>
            <img src={userImage} alt="Verified" className="w-5 h-5" />
          </div>

          {/* Right side: Status indicator */}
          <div className="relative flex items-center group">
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(
                postData.status,
              )}`}
            >
              {postData.status || "No Status"}
            </span>
            {/* <div
              className="absolute right-10 top-0 bg-gray-800 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-30 whitespace-normal"
              style={{
                minWidth: "150px",
                maxWidth: "200px",
                textAlign: "center",
              }}
            ></div> */}
          </div>
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
                {postData?.location?.city || postData?.city ? (
                  <>
                    {postData.location?.city || postData.city}
                    {postData.stateAbbv || postData.state
                      ? `, ${postData.stateAbbv || postData.state}`
                      : ""}
                  </>
                ) : (
                  "Unknown City"
                )}
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
        {/* <div className="mt-4">
          <h1 className="text-lg font-medium text-[#1F0A58] line-clamp-1">
            {postData.peopleHelpedDescription || "Event Title"}
          </h1>
          <p className="text-sm text-[#444746] mt-2 line-clamp-2">
            {postData.peopleHelpedDescription || "No description available."}
          </p>
        </div> */}

        {/* New Code for middle section */}

        <div className="flex flex-row justify-between mt-4">
          <div className="font-bold text-[14px] font-dmsans line-clamp-1">
            People Helped
          </div>
          <div className="font-bold text-[14px] font-dmsans line-clamp-1">
            {postData?.numPeopleHelped}
          </div>
        </div>

        <div className="flex flex-row justify-between mt-4">
          <div className="font-bold text-[14px] font-dmsans line-clamp-1">
            Items Donated
          </div>
          <div className="font-bold text-[14px] font-dmsans line-clamp-1">
            {postData?.numPeopleJoined}
          </div>
        </div>

        {/* Tags Section */}
        {/* <div className="mt-4 flex flex-wrap gap-2">
          {getTags(postData, isVisitLogs)}
        </div> */}

        {/* New Code for tags section */}
        <div
          className={postData?.listOfSupportsProvided?.length ? "mt-3" : "mt-0"}
        >
          {/* Old code */}
          {/* <CardTags tags={postData?.whatGiven || []} /> */}

          {/* New Code */}
          <CardTags tags={postData?.listOfSupportsProvided || []} />
        </div>

        {/* <h1 className="font-medium text-[15px] font-dmsans mt-2">
          {postData?.peopleHelpedDescription}
        </h1> */}
      </div>
    </>
  );
};

// Export VisitLogExpandedView so PostApprovals can render it inside its modal
export { VisitLogExpandedView };
export default ApprovalCardVisitlogs;
