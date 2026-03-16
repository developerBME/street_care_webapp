
import calendarIcon from "../../../../images/calendar_month.svg";
import defaultImage from "../../../../images/default_avatar.svg";
import emailIcon from "../../../../images/email.png";
import clockIcon from "../../../../images/ic_outline-access-time.svg";
import locationIcon from "../../../../images/location_on.svg";
import phoneIcon from "../../../../images/phone.png";
import verifiedGreen from "../../../../images/verified.png";
import verifiedBlue from "../../../../images/verified_blue.png";
import verifiedPurple from "../../../../images/verified_purple.png";
import verifiedYellow from "../../../../images/verified_yellow.png";

// ─── Expanded Detail View ─────────────────────────────────────────────────────
// Shown inside the modal when the user clicks an outreach event card.
// Layout exactly matches VisitLogExpandedView:
//   • Header  : photo + name + verified badge
//   • 2-col info grid : date | location, phone | time, address | email
//   • Stats rows : Event Title, Description, User Name
//   • Tag pills (skills)
// NOTE: Accept / Reject buttons are NOT here — they live in PostApprovals.
const OutreachExpandedView = ({ postData }) => {
  // Format event date from Firebase Timestamp — prefer eventDate, fallback to lastModifiedTimestamp
  const formattedDate = postData?.eventDate?.seconds
    ? new Date(postData.eventDate.seconds * 1000).toLocaleDateString("en-US", {
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
  switch (postData?.userType) {
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

  // Support tags — outreach uses "skills"
  const tags = postData?.skills || [];

  return (
    <div className="w-full bg-[#F0EBFF] rounded-2xl p-5 text-sm font-sans">
      {/* ── Header: person icon + name + badge ── */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-2">
          <img
            src={postData?.photoUrl || defaultImage}
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-[18px] font-bold font-dmsans">
            {postData?.firstName || postData?.userName || "Anonymous User"}{" "}
            {postData?.lastName || ""}
          </span>
          <img src={userBadge} alt="Verified" className="w-5 h-5" />
        </div>
      </div>

      {/* ── 2-column Info Grid ── */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-4">
        {/* Event Date — left column */}
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
                {postData.location?.stateAbbv ||
                postData.stateAbbv ||
                postData.state
                  ? `, ${
                      postData.location?.stateAbbv ||
                      postData.stateAbbv ||
                      postData.state
                    }`
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
            {postData?.startTimestamp?.seconds && postData?.endTimestamp?.seconds
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

      {/* ── Stats Rows (outreach-specific fields) ── */}
      {[
        { label: "Event Title", value: postData?.title },
        { label: "Description", value: postData?.description },
        { label: "User Name", value: postData?.userName },
      ].map(
        ({ label, value }) =>
          value !== undefined && (
            <div
              key={label}
              className="flex flex-row justify-between py-2"
            >
              <span className="font-bold text-[14px] font-dmsans">{label}</span>
              <span className="font-bold text-[14px] font-dmsans text-right max-w-[55%] break-words">
                {value}
              </span>
            </div>
          ),
      )}

      {/* ── Tag Pills (skills) ── */}
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

export { OutreachExpandedView };
export default OutreachExpandedView;