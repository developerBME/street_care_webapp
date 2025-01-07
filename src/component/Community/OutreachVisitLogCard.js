import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore"; // Firestore functions
import { db } from "../firebase";
import { fetchUserTypeDetails } from "../EventCardService"; // Import fetchUserTypeDetails
import dateIcon from "../../images/date.png";
import flagIcon from "../../images/flag.png";
import locationIcon from "../../images/location.png";
import verifiedImg from "../../images/verified_purple.png";
import defaultImage from "../../images/default_avatar.svg";
import { formatDate } from "../helper";
import CardTags from "./CardTags";

const PERSONAL_VISIT_LOG_COLLECTION = "personalVisitLog"; // Collection name

const OutreachVisitLogCard = ({ visitLogCardData }) => {
  const navigate = useNavigate();
  const [isFlagged, setIsFlagged] = useState(visitLogCardData?.status === "flagged");

  const handleViewDetails = () => {
    navigate(`/VisitLogDetails/${visitLogCardData.id}`);
  };

  const handleFlag = async (e) => {
    e.stopPropagation(); // Prevent triggering parent click events

    try {
      // Validate visitLogCardData.id
      if (!visitLogCardData?.id) {
        console.error("Invalid visitLogCardData.id:", visitLogCardData?.id);
        return;
      }

      // Create a proper document reference for the visit log
      const docRef = doc(db, PERSONAL_VISIT_LOG_COLLECTION, visitLogCardData.id);

      // Fetch the current document data to check its status
      const currentDoc = await getDoc(docRef);
      if (!currentDoc.exists()) {
        console.error("Document does not exist:", visitLogCardData.id);
        return;
      }

      const currentStatus = currentDoc.data().isFlagged;

      // Toggle the status between "flagged" and "unflagged"
      const newStatus = currentStatus === "flagged" ? "unflagged" : "flagged";

      // Update the status field in Firestore
      await updateDoc(docRef, { isFlagged: newStatus });

      console.log(`Document ${visitLogCardData.id} updated to ${newStatus}`);

      // Update local state to reflect the change
      setIsFlagged(newStatus === "flagged");
    } catch (error) {
      console.error("Error toggling document flag status:", error);
    }
  };

  return (
    <div
      className="bg-[#F5EEFE] w-[320px] rounded-[30px] mb-4 flex flex-col p-[24px] h-auto cursor-pointer border-b-[1px] border-gray-200"
      onClick={handleViewDetails}
    >
      <div className="relative">
        <img
          onClick={handleFlag}
          src={flagIcon}
          alt="flag"
          className={`absolute right-4 w-8 h-8 cursor-pointer rounded-full p-1 ${
            isFlagged ? "bg-red-500" : "bg-transparent hover:bg-gray-200"
          }`}
        />
      </div>
      <div className="inline-flex items-center space-x-2">
        <img
          alt=""
          src={visitLogCardData.defaultImage || defaultImage}
          className="w-8 h-8 rounded-full"
        />
        <div className="font-normal font-inter text-[13px]">
          {visitLogCardData.userName}
        </div>
        <img alt="" src={verifiedImg} className="w-5 h-5" />
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <img className="w-4 h-4" src={dateIcon} alt="Date" />
          <span className="ml-2 text-sm">
            {visitLogCardData && visitLogCardData.eventDate
              ? formatDate(visitLogCardData.eventDate)
              : null}
          </span>
        </div>
        <div className="flex items-center">
          <img className="w-3 h-4" src={locationIcon} alt="Location" />
          <span className="ml-2 text-sm">
            {`${visitLogCardData?.location?.city || visitLogCardData?.city}, ${
              visitLogCardData?.location?.stateAbbv ||
              visitLogCardData?.stateAbbv ||
              visitLogCardData?.location?.state
            }`}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm font-bold">People Helped</div>
        <div className="text-xl font-bold">
          {visitLogCardData?.numberPeopleHelped}
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="text-sm font-bold">Items Donated</div>
        <div className="text-xl font-bold">{visitLogCardData?.itemQty}</div>
      </div>
      <div className="mt-3">
        <CardTags tags={visitLogCardData?.whatGiven || []} />
      </div>
      <p className="text-sm mt-2 line-clamp-2">
        {visitLogCardData?.description || ""}
      </p>
    </div>
  );
};

export default OutreachVisitLogCard;
