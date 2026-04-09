import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import dateIcon from "../../images/date.png";
import flagIcon from "../../images/flag.svg";
import infoIcon from "../../images/info_icon.png"; // Add an info icon image
import locationIcon from "../../images/location.png";
import calendarIcon from "../../images/calendar_month.svg";
import emailIcon from "../../images/email.png";
import phoneIcon from "../../images/phone.png";
import clockIcon from "../../images/ic_outline-access-time.svg";
import defaultImage from "../../images/default_avatar.svg";
import { formatDate } from "../helper";
import CardTags from "./CardTags";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton.js";
import InteractionLogCardSkeleton from "./InteractionLogCardSkeleton.js";

import verifiedPurple from "../../images/verified_purple.png";
import verifiedGreen from "../../images/verified.png";
import verifiedBlue from "../../images/verified_blue.png";
import verifiedYellow from "../../images/verified_yellow.png";
import { useUserContext } from "../../context/Usercontext.js";
import { formatTimeStampDate } from "../../utils/helperFns.js";

import collectionMapping from "../../utils/firestoreCollections.js";

const visitLogs_collection = collectionMapping.visitLogs;
const users_collection = collectionMapping.users; // User collection

const DisplayInteractionLogCard = ({
  interactionLogCardData,
  openPopUpModal,
}) => {
  const navigate = useNavigate();

  // Fetch flag info when component mounts
  const [isFlagged, setIsFlagged] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Change this back to true

  const currentUserType = interactionLogCardData?.userType;
  const { user } = useUserContext();
  //UnComment the below when ready to plug the flag interaction functionality.
  {
    /* 
    Need to Plug the fetchFlagStatus again after the field is added.
    useEffect(() => {
        const fetchFlagStatus = async () => {
            try {
                if (interactionLogCardData?.id) {
                    const docRef = doc(db, visitLogs_collection, interactionLogCardData.id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
            setIsFlagged(docSnap.data().isFlagged || false);
          }
        }
    } catch (error) {
        console.error("Error fetching flag status:", error);
    } finally {
        setIsLoading(false);
    }
};

fetchFlagStatus();
}, [interactionLogCardData?.id]);
*/
  }
  //TODO: Add popup functionality for viewing additional details.

  const handleViewDetails = () => {
    navigate(`/VisitLogDetails/${interactionLogCardData.id}`);
  };

  // useEffect(() => {
  //   console.log("This is Working.");
  // }, []);

  let verifiedImg;
  switch (currentUserType) {
    case "Chapter Leader":
      verifiedImg = verifiedGreen;
      break;
    case "Chapter Member":
      verifiedImg = verifiedPurple;
      break;
    case "Street Care Hub Leader":
      verifiedImg = verifiedBlue;
      break;
    default:
      verifiedImg = verifiedYellow;
      break;
  }

  const handleFlag = async (e) => {
    e.stopPropagation(); // Prevent triggering parent click events
    if (!user) {
      alert("Please log in to flag or unflag the interaction log.");
      console.error("User is not logged in.");
      return;
    }
    try {
      if (!interactionLogCardData?.id) {
        console.error("Invalid interactionLogCardData.id");
        return;
      }

      const userRef = doc(db, users_collection, user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        console.error("User document does not exist:", user.uid);
        return;
      }

      const { Type: userType } = userDoc.data();
      const docRef = doc(db, visitLogs_collection, interactionLogCardData?.id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.error("Document does not exist:", user.uid);
        return;
      }
      console.log("user:", userType);
      const { isFlagged: currentStatus, flaggedByUser } = docSnap.data();
      const canUnflag =
        flaggedByUser === user.uid || userType === "Street Care Hub Leader";
      const currentIsFlagged = docSnap.data().isFlagged;

      // Restrict unflagging to specific user types
      if (currentIsFlagged && !canUnflag) {
        alert(
          "Only Street Care Hub Leader or User who flagged it can unflag this post.",
        );
        return;
      }

      if (currentStatus) {
        if (!canUnflag) {
          console.error(
            "Only the user who flagged this event or a Street Care Hub Leader can unflag it.",
          );
          return;
        }

        await updateDoc(docRef, { isFlagged: false, flaggedByUser: null });
        setIsFlagged(false);
      } else {
        await updateDoc(docRef, { isFlagged: true, flaggedByUser: user.uid });
        setIsFlagged(true);
      }
    } catch (error) {
      console.error("Error toggling flag status:", error);
    }
  };

  if (isLoading) {
    return <InteractionLogCardSkeleton />; // Placeholder Skeleton while loading flag status
  }

  // To calculate items Donated
  // num of care Packages donated(num) * items in care packages(string -> num)
  // possible user left items in care packages blank, also possible items donated is null , undefined, NaN.

  //This needs to be more readable and clean. Remove unnecessary conditional Chaining.
  let donatedItemsNum;

  if (!Array.isArray(interactionLogCardData?.carePackageContents)) {
    donatedItemsNum =
      interactionLogCardData?.carePackageContents?.split(",")?.length ?? 1;
  } else {
    donatedItemsNum = interactionLogCardData?.carePackageContents?.length ?? 1;
  }
  const itemsDonated =
    interactionLogCardData?.carePackagesDistributed * donatedItemsNum || 1;

  return (
    <div
      className="bg-[#F5EEFE] w-full min-w-0 max-w-full rounded-2xl mb-4 flex flex-col p-3 sm:p-5 md:p-6 h-auto cursor-pointer border-b-[1px] border-gray-200"
      onClick={openPopUpModal}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 mb-1">
        {/* User name block: fixed left half */}
        <div className="inline-flex min-w-0 items-center space-x-2 pr-2">
          <img
            alt=""
            src={interactionLogCardData?.photoUrl || defaultImage}
            className="w-7 h-7 rounded-full flex-shrink-0 sm:w-8 sm:h-8"
          />
          <div className="min-w-0 truncate font-normal font-inter text-[12px] sm:text-[13px]">
            {interactionLogCardData?.firstName ||
              interactionLogCardData?.userName ||
              "Anonymous User"}
          </div>
          <img
            alt=""
            src={verifiedImg}
            className="w-4 h-4 flex-shrink-0 sm:w-5 sm:h-5"
          />
        </div>

        {/* Flag block: fixed right half with divider to avoid visual collision */}
        <div className="group relative min-w-0 flex items-center justify-end pl-1">
          <img
            onClick={handleFlag}
            src={flagIcon}
            alt="flag"
            className={`w-7 h-7 cursor-pointer rounded-full p-1 sm:w-8 sm:h-8 ${
              isFlagged ? "bg-red-500" : "bg-transparent hover:bg-gray-200"
            }`}
          />
          <div
            className="pointer-events-none absolute right-0 top-full mt-1 z-10 bg-gray-800 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-[30ms] whitespace-normal"
            style={{ minWidth: "150px", maxWidth: "200px", textAlign: "center" }}
          >
            {!isFlagged
              ? "Flag the Interaction Log?"
              : "Unflag the Interaction Log?"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="min-w-0 flex items-center">
          <img className="w-4 h-4 flex-shrink-0" src={dateIcon} alt="Date" />
          <span
            className="ml-2 block min-w-0 truncate text-xs sm:text-sm"
            title={
              formatTimeStampDate(
                interactionLogCardData?.interactionDate ||
                  interactionLogCardData?.startTimestamp ||
                  interactionLogCardData?.endTimestamp,
              ) || "N/A"
            }
          >
            {formatTimeStampDate(
              interactionLogCardData?.interactionDate ||
                interactionLogCardData?.startTimestamp ||
                interactionLogCardData?.endTimestamp,
            ) || "N/A"}
          </span>
        </div>

        <div className="min-w-0 flex items-center justify-end">
          <img className="w-3 h-4 flex-shrink-0" src={locationIcon} alt="Location" />
          <span
            className="ml-2 block min-w-0 truncate text-right text-xs sm:text-sm"
            title={`${interactionLogCardData?.city || "N/A"}, ${interactionLogCardData?.state || ""}`}
          >
            {`${interactionLogCardData?.city || "N/A"}, ${interactionLogCardData?.state || ""}`}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="min-w-0 pr-2 truncate text-xs sm:text-sm font-bold">People Helped</div>
        <div className="text-lg sm:text-xl font-bold flex-shrink-0">
          {interactionLogCardData?.numPeopleHelped}
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="min-w-0 pr-2 truncate text-xs sm:text-sm font-bold">Items Donated</div>
        <div className="text-lg sm:text-xl font-bold flex-shrink-0">{donatedItemsNum}</div>
      </div>

      <div className="mt-3">
        <CardTags tags={interactionLogCardData?.listOfSupportsProvided || []} />
      </div>

      {/* <p className="text-sm mt-2 line-clamp-2">
        {interactionLogCardData?.peopleHelpedDescription || ""}
      </p> */}
    </div>
  );
};

export const ExpandedInteractionLogCard = ({ postData }) => {
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
            {postData?.firstName || postData?.userName || "Anonymous User"}
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
          <span className="text-[#37168B] flex-shrink-0">
            <img alt="email" src={emailIcon} className="w-4 h-4" />
          </span>

          <span className="text-sm text-[#37168B] font-medium break-all">
            {postData?.email || "N/A"}
          </span>
        </div>
      </div>

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
        {
          label: "Items Donated",
          value: postData?.numItemsDonated,
        },
      ].map(
        ({ label, value }) =>
          value !== undefined && (
            <div key={label} className="flex flex-row justify-between py-2">
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

export default DisplayInteractionLogCard;
