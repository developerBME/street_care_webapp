import React, { useState } from "react";
import { Timestamp } from "@firebase/firestore";
import { IoLocationSharp } from "react-icons/io5";
import help_announcement from "../../images/help_announcement.png";
import help_pending from "../../images/help_pending.png";
import help_received from "../../images/help_received.png";
import CustomButton from "../Buttons/CustomButton";
import { Modal, Box } from "@mui/material"; // Import Modal and Box from MUI
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  handleHelpRecieved,
  handleReopenHelpRequest,
} from "../HelpRequestService";

const HelpRequestCard = ({
  helpRequestCardData,
  isProfileHelpCard = false,
  refresh,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate();
  const fAuth = getAuth();

  const {
    id,
    status: helpStatus,
    title: helpTitle,
    skills: helpTags,
    location: helpLocation,
    description: helpDescription,
    userName: helpPostingUser,
    uid: helpUid,
    createdAt,
  } = helpRequestCardData;

  const createdAtDate =
    createdAt instanceof Timestamp ? createdAt.toDate() : new Date(createdAt);

  const timeSincePosted = () => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - createdAtDate) / 60000);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} mins ago`;
    } else if (diffInMinutes < 1440) {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours} hrs ago`;
    } else {
      const diffInDays = Math.floor(diffInMinutes / 1440);
      return `${diffInDays} days ago`;
    }
  };

  // Button text and style based on status
  let buttonText;
  let buttonStyleClass;

  switch (helpStatus) {
    case "Need Help":
      buttonText = "I can help";
      buttonStyleClass = "buttondefaultwide";
      break;
    case "Help on the way":
      buttonText = "Mark as Help Received";
      buttonStyleClass = "buttondInprogressWide";
      break;
    case "Help Received":
      buttonText = "Reopen Help Request";
      buttonStyleClass = "buttonClosedWide";
      break;
    default:
      buttonText = "Take Action";
      buttonStyleClass = "bg-gray-600 text-white hover:bg-gray-500";
  }

  const handleButtonClick = () => {
    if (!fAuth?.currentUser?.uid) {
      navigate("/login"); // Redirect to login if user is not authenticated
      return;
    }

    switch (helpStatus) {
      case "Need Help":
        navigate(`/community/icanhelp/${id}`);
        break;
      case "Help on the way":
        if (fAuth.currentUser.uid === helpUid) {
          handleHelpRecieved(id, refresh); // Mark as Help Received
        }
        break;
      case "Help Received":
        if (fAuth.currentUser.uid === helpUid) {
          handleReopenHelpRequest(id, refresh); // Reopen Help Request
        }
        break;
      default:
        break;
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      {/* Card that opens the modal on click */}
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs mx-auto flex flex-col justify-between cursor-pointer"
        onClick={handleOpenModal} // Open modal when card is clicked
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
          Posted {timeSincePosted()} by{" "}
          <span className="text-indigo-600">{helpPostingUser}</span>
        </p>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{helpTitle}</h3>

        {/* Location */}
        <div className="flex items-center text-sm text-indigo-600 mb-4">
          <IoLocationSharp className="w-5 h-5 mr-1" />
          <span>
            {helpLocation?.street ?? ""}, {helpLocation?.city ?? ""}, {helpLocation?.state ?? ""}{" "}
            {helpLocation?.zipcode ?? ""}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {helpTags?.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-sm px-3 py-1 rounded-full text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        {helpDescription && <div className="text-sm text-gray-600 mb-4">
          {helpDescription?.length < 100
            ? helpDescription
            : `${helpDescription?.substring(0, 100)}...`}
        </div>}
      </div>

      {/* Modal Overlay */}
      <Modal
        open={isModalOpen} // Control modal visibility
        onClose={handleCloseModal} // Close modal when clicking outside or pressing ESC
        aria-labelledby="help-request-modal"
        aria-describedby="help-request-details"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "600px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "12px",
            outline: "none",
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
          >
            ✖
          </button>

          {/* Modal Content */}
          <div className="flex flex-col gap-4">
            {/* Status Badge */}
            <div className="mb-4">
              {helpStatus === "Need Help" && (
                <div className="bg-red-100 text-red-600 rounded-xl px-4 py-2 text-xs inline-flex items-center mb-2">
                  <img className="w-5 h-5 mr-2" src={help_announcement} alt="Status" />
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
              Posted {timeSincePosted()} by{" "}
              <span className="text-indigo-600">{helpPostingUser}</span>
            </p>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">{helpTitle}</h3>

            {/* Location */}
            <div className="flex items-center text-sm text-indigo-600 mb-4">
              <IoLocationSharp className="w-5 h-5 mr-1" />
              <span>
                {helpLocation?.street ?? ""}, {helpLocation?.city ?? ""},{" "}
                {helpLocation?.state ?? ""} {helpLocation?.zipcode ?? ""}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {helpTags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-sm px-3 py-1 rounded-full text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            {helpDescription && (
              <div className="text-sm text-gray-600 mb-4">{helpDescription}</div>
            )}

            {/* Button */}
            {!isProfileHelpCard && (
              <CustomButton
                label={buttonText}
                name={buttonStyleClass}
                onClick={handleButtonClick}
              />
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default HelpRequestCard;