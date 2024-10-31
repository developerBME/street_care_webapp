import React, { useState } from "react";
import { Timestamp } from "@firebase/firestore";
import { IoLocationSharp } from "react-icons/io5"; // For location icon
import help_announcement from "../../images/help_announcement.png";
import CustomButton from "../Buttons/CustomButton";
import help_pending from "../../images/help_pending.png";
import help_received from "../../images/help_received.png";

const HelpRequestCard = ({
  helpRequestCardData,
  onClick = () => {},
  isProfileHelpCard = false,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const {
    status: helpStatus,
    title: helpTitle,
    skills: helpTags,
    location: helpLocation,
    description: helpDescription,
    userName: helpPostingUser,
    createdAt,
  } = helpRequestCardData;

  const createdAtDate =
    createdAt instanceof Timestamp ? createdAt.toDate() : new Date(createdAt);

  // Button text and style based on status
  let buttonText;
  let buttonStyleClass;

  switch (helpStatus) {
    case "Need Help":
      buttonText = "Offer Help";
      buttonStyleClass = "buttondefaultwide"; //"bg-purple-600 text-white hover:bg-purple-500";
      break;
    case "Help on the way":
      buttonText = "Mark Received";
      buttonStyleClass = "buttondInprogressWide"; //"bg-yellow-500 text-white hover:bg-yellow-400";
      break;
    case "Help Received":
      buttonText = "Reopen Request";
      buttonStyleClass = "buttonClosedWide"; //"border border-gray-400 text-gray-700 hover:bg-gray-100";
      break;
    default:
      buttonText = "Take Action";
      buttonStyleClass = "bg-gray-600 text-white hover:bg-gray-500";
  }

  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs mx-auto flex flex-col justify-between"
      onClick={onClick}
    >
      {/* Status Badge */}
      <div className="mb-4">
        {helpStatus === "Need Help" && (
          <div className="bg-red-100 text-red-600 rounded-xl px-4 py-2 text-xs inline-flex items-center mb-2">
            <img
              className="w-5 h-5 mr-2"
              src={help_announcement}
              alt="Status"
            />
            <span className="font-semibold">Needs Help</span>
          </div>
        )}
        {helpStatus === "Help on the way" && (
          <div className="bg-yellow-100 text-yellow-600 rounded-xl px-4 py-2 text-xs inline-flex items-center mb-2">
            <img className="w-5 h-5 mr-2" src={help_pending} alt="Status" />
            <span className="font-semibold">Help on the Way</span>
          </div>
        )}
        {helpStatus === "Help Received" && (
          <div className="bg-green-100 text-green-600 rounded-xl px-4 py-2 text-xs inline-flex items-center mb-2">
            <img className="w-5 h-5 mr-2" src={help_received} alt="Status" />
            <span className="font-semibold">Help Received</span>
          </div>
        )}
      </div>

      {/* Posted Info */}
      <p className="text-xs text-gray-500 mb-4">
        Posted {Math.floor((new Date() - createdAtDate) / 60000)} mins ago by{" "}
        <span className="text-indigo-600">{helpPostingUser}</span>
      </p>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{helpTitle}</h3>

      {/* Location */}
      <div className="flex items-center text-sm text-indigo-600 mb-4">
        <IoLocationSharp className="w-5 h-5 mr-1" />
        <span>
          {helpLocation.street}, {helpLocation.city}, {helpLocation.state}{" "}
          {helpLocation.zipcode}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {helpTags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-100 text-sm px-3 py-1 rounded-full text-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <div className="text-sm text-gray-600 mb-4">
        {showDetails || helpDescription.length < 100
          ? helpDescription
          : `${helpDescription.substring(0, 100)}...`}
        {helpDescription.length > 100 && (
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-indigo-500 ml-1"
          >
            {showDetails ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      {/* Outreaches */}
      <p className="text-sm text-gray-700 font-medium">
        Outreaches: <span className="font-normal">No outreaches created</span>
      </p>

      {/* Button */}
      {!isProfileHelpCard && (
        <CustomButton label={buttonText} name={buttonStyleClass} />
      )}

      {/* <button
        //className={`mt-4 w-full py-2 rounded-full text-sm font-medium ${buttonStyleClass}`}
      >
        {buttonText}
      </button> */}
    </div>
  );
};

export default HelpRequestCard;
