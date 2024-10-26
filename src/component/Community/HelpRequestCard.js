import React, { useState } from "react";
import { Timestamp } from "@firebase/firestore";
import { IoLocationSharp } from "react-icons/io5";
import help_announcement from "../../images/help_announcement.png";
import help_pending from "../../images/help_pending.png";
import help_received from "../../images/help_received.png";
import CustomButton from "../Buttons/CustomButton";
import { Modal } from "@mui/material";

const HelpRequestCard = ({ helpRequestCardData }) => {
  const [openModal, setOpenModal] = useState(false);

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
      buttonText = "Offer Help";
      buttonStyleClass = "buttondefaultwide";
      break;
    case "Help on the way":
      buttonText = "Mark Received";
      buttonStyleClass = "buttonInprogressWide";
      break;
    case "Help Received":
      buttonText = "Reopen Request";
      buttonStyleClass = "buttonClosedWide";
      break;
    default:
      buttonText = "Take Action";
      buttonStyleClass = "bg-gray-600 text-white hover:bg-gray-500";
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      {/* Card */}
      <div
        onClick={handleOpenModal}
        className="bg-white border rounded-xl shadow-lg p-6 w-full max-w-xs mx-auto flex flex-col justify-between cursor-pointer"
      >
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

        <p className="text-xs text-gray-500 mb-4">
          Posted {timeSincePosted()} by <span className="text-indigo-600">{helpPostingUser}</span>
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{helpTitle}</h3>

        <div className="flex items-center text-sm text-indigo-600 mb-4">
          <IoLocationSharp className="w-5 h-5 mr-1" />
          <span>
            {helpLocation.street}, {helpLocation.city}, {helpLocation.state} {helpLocation.zipcode}
          </span>
        </div>

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

        <div className="text-sm text-gray-600 mb-4">
          {helpDescription.length < 100
            ? helpDescription
            : `${helpDescription.substring(0, 100)}...`}
        </div>

        <p className="text-sm text-gray-700 font-medium">
          Outreaches: <span className="font-normal">No outreaches created</span>
        </p>
      </div>

      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm p-4">
          <div className="bg-[#F8F9F0] rounded-lg shadow-2xl p-10 max-h-[80vh] max-w-[60vw] mx-auto overflow-y-auto border border-black">
            <div className="bg-[#F5EDFA] rounded-lg p-6 shadow-inner">
              <h2 className="text-2xl font-bold mb-6 text-[#6840E0]">{helpTitle}</h2>

              <p className="text-sm text-gray-500 mb-4">
                Posted {timeSincePosted()} by{" "}
                <span className="text-indigo-600">{helpPostingUser}</span>
              </p>

              <div className="flex items-center text-sm text-indigo-600 mb-4">
                <IoLocationSharp className="w-5 h-5 mr-1" />
                <span>
                  {helpLocation.street}, {helpLocation.city}, {helpLocation.state}{" "}
                  {helpLocation.zipcode}
                </span>
              </div>

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

              <p className="text-sm text-gray-700 mb-6 leading-relaxed">{helpDescription}</p>
            </div>
            {/* Buttons outside the modal card */}
            <div className="flex justify-center mt-4 space-x-4">
              <CustomButton
                label={buttonText}
                name="buttondefault"
              />
              <CustomButton
                label="Close"
                name="close"
                onClick={handleCloseModal}
              />

            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HelpRequestCard;
