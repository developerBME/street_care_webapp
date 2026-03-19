import React, { useEffect, useState } from "react";
import arrowBack from "../../images/arrowBack.png";
import dateIcon from "../../images/date.png";
import locationIcon from "../../images/location.png";
import CardTags from "../Community/CardTags";
import { formatDate } from "../HelperFunction";

const HelpRequestCardContent = ({ helpRequest, isExpanded = false }) => {
  const primaryDate =
    helpRequest?.lastModifiedTimestamp || helpRequest?.followUpTimestamp;
  const formattedDate = primaryDate ? formatDate(primaryDate) : "";
  const helpProvided = helpRequest?.helpProvidedCategory || [];
  const furtherHelp = helpRequest?.furtherHelpCategory || [];
  const status = String(helpRequest?.status || "").toLowerCase();
  const showStatusBadge = helpRequest?.isCompleted || status !== "approved";

  return (
    <div
      className={`bg-[#F5EEFE] rounded-[30px] flex flex-col p-[24px] h-auto border-b-[1px] border-gray-200 ${
        isExpanded ? "w-full mb-0" : "w-[320px] mb-4"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">
          {helpRequest?.firstName || "Anonymous"}
        </div>
        {showStatusBadge &&
          (helpRequest?.isCompleted ? (
            <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
              Completed
            </span>
          ) : (
            <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
              {helpRequest?.status || "Open"}
            </span>
          ))}
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <img className="w-4 h-4" src={dateIcon} alt="Date" />
          <span className="ml-2 text-sm">{formattedDate}</span>
        </div>
        <div className="flex items-center">
          <img className="w-3 h-4 flex-shrink-0" src={locationIcon} alt="Location" />
          <span className="ml-2 text-sm">
            {helpRequest?.locationLandmark || "Location not specified"}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-bold">Help Provided</div>
        <div className="mt-2">
          <CardTags tags={helpProvided} />
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-bold">Further Help Needed</div>
        <div className="mt-2">
          <CardTags tags={furtherHelp} />
        </div>
      </div>

      <p className={`text-sm mt-3 ${isExpanded ? "whitespace-pre-wrap" : "line-clamp-2"}`}>
        {helpRequest?.additionalDetails || "No additional details."}
      </p>
    </div>
  );
};

const HelpRequestCard = ({ helpRequest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const previousOverflow = document.body.style.overflow;
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isModalOpen]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCardKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpenModal();
    }
  };

  return (
    <>
      <div
        className="cursor-pointer transition-transform duration-150 hover:-translate-y-1"
        role="button"
        tabIndex={0}
        onClick={handleOpenModal}
        onKeyDown={handleCardKeyDown}
      >
        <HelpRequestCardContent helpRequest={helpRequest} />
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md p-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center w-full mb-4">
              <img
                src={arrowBack}
                alt="Back"
                className="w-6 h-6 cursor-pointer"
                onClick={handleCloseModal}
              />
              <button
                onClick={handleCloseModal}
                className="ml-2 text-sm text-gray-700 font-medium hover:underline"
              >
                Go Back
              </button>
            </div>

            <HelpRequestCardContent helpRequest={helpRequest} isExpanded />
          </div>
        </div>
      )}
    </>
  );
};

export default HelpRequestCard;
