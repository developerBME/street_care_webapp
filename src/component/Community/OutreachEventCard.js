import React, { useState, useEffect } from "react";
import defaultImage from "../../images/default_avatar.svg";
import verifiedImg from "../../images/verified_purple.png";
import wavingHand from "../../images/waving_hand.png";
import CustomButton from "../Buttons/CustomButton";
import { handleRsvp } from "../EventCardService";
import { useNavigate } from "react-router-dom";
import EditModal from "./EditModal";
import userSlots from "../../images/userSlots.png";
import date from "../../images/date.png";
import locate from "../../images/location.png";

const OutreachEventCard = ({
  cardData,
  isProfilePage,
  refresh,
  isPastEvent,
}) => {
  const {
    id,
    label,
    userName,
    title,
    eventDate,
    location,
    helpType,
    totalSlots,
    interests,
    nop,
    photoUrl,
    description,
    skills,
  } = cardData;
  const navigate = useNavigate();
  const [label2, setLabel2] = useState(label);
  console.log(label2);

  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-[#F5EEFE] min-w-fit max-w-[320px] lg:w-full rounded-[30px] mb-4 flex flex-col justify-between p-6">
      {!isProfilePage && !isPastEvent ? (
        <div className="inline-flex items-center space-x-2 ">
          <img
            src={photoUrl || defaultImage}
            className="w-8 h-8 rounded-full"
          />
          <div className="font-normal font-inter text-[13px] ">{userName}</div>
          <img src={verifiedImg} className="w-5 h-5" />
        </div>
      ) : (
        <div className="mt-3"></div>
      )}

      {isProfilePage ? (
        // <div className="px-5 py-2 space-y-4 pt-4 w-full">
        //   <div className="font-medium text-[22px] font-bricolage">{title}</div>
        //   <div className="font-semibold font-inter text-[13px] text-[#37168B]">
        //     {eventDate}
        //   </div>
        //   <div className="font-normal font-inter text-[#444746] text-[13px]">
        //     {location.street}, {location.city}, {location.state},{" "}
        //     {location.zipcode}
        //   </div>
        //   <div className="w-full inline-flex items-center bg-white px-4 py-2 space-x-2.5 rounded-2xl">
        //     <img src={wavingHand} />
        //     <div className="font-normal font-inter text-[13px] text-[#181818]">
        //       {helpType}
        //     </div>
        //   </div>
        // </div>
        <div className="my-3 space-y-3 w-full h-full flex flex-col">
          <div className="flex flex-col justify-between space-y-3">
            <div className="flex flex-row justify-normal space-x-2">
              <img className="w-[13px] h-[15px] my-[3px]" src={date} />
              <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
                {eventDate}
              </div>
            </div>
            <div className="flex flex-row justify-normal space-x-2">
              <img className="w-[12px] h-[15px] my-[3px]" src={locate} />
              <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
                {location.city}, {location.state}
              </div>
            </div>
          </div>

          <div className="font-medium text-[20px] font-dmsans">{title}</div>

          <div className="font-medium text-[14px] font-dmsans text-[#444746]">
            {description}
          </div>

          <div className="inline-flex items-center gap-2 flex-wrap">
            {skills.map((item, index) => (
              <div className="py-1 px-3 border border-[#C8C8C8] w-fit rounded-xl text-[12px] text-[#444746]">
                {item}
              </div>
            ))}
          </div>
        </div>
      ) : (
        // <div className="px-5 py-2 space-y-2 w-full  h-full flex flex-col justify-between">
        //   <div className="font-medium text-[16px] font-bricolage">{title}</div>
        //   <div className="font-semibold font-inter text-[12px] text-[#37168B]">
        //     {eventDate}
        //   </div>
        //   {isPastEvent ? (
        //     <div className="font-normal font-inter text-[#444746] text-[12px]">
        //       {location.city}, {location.state}
        //     </div>
        //   ) : (
        //     <div className="font-normal font-inter text-[#444746] text-[12px]">
        //       {location.street}, {location.city}, {location.state},{" "}
        //       {location.zipcode}
        //     </div>
        //   )}
        //   <div className="">
        //     <div className="w-full inline-flex items-center bg-white px-4 py-2 space-x-2.5 rounded-2xl">
        //       <img src={wavingHand} />
        //       <div className="font-normal font-inter text-[12px] text-[#181818]">
        //         {helpType}
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <div className="my-3 space-y-3 w-full h-full flex flex-col">
          {isPastEvent ? (
            <div className="flex flex-col justify-between space-y-3">
              <div className="flex flex-row justify-normal space-x-2">
                <img className="w-[13px] h-[15px] my-[2px]" src={date} />
                <div className="font-medium font-dmsans text-[12px] text-[#37168B]">
                  {eventDate}
                </div>
              </div>
              <div className="flex flex-row justify-normal space-x-2">
                <img className="w-[12px] h-[15px] my-[2px]" src={locate} />
                <div className="font-medium font-dmsans text-[12px] text-[#37168B]">
                  {location.city}, {location.state}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-between space-y-3">
              <div className="flex flex-row justify-normal space-x-2">
                <img className="w-[13px] h-[15px] my-[3px]" src={date} />
                <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
                  {eventDate}
                </div>
              </div>
              <div className="flex flex-row justify-normal space-x-2">
                <img className="w-[12px] h-[15px] my-[3px]" src={locate} />
                <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
                  {location.city}, {location.state}
                </div>
              </div>
            </div>
          )}
          <div className="font-medium text-[20px] font-dmsans">{title}</div>

          <div className="font-medium text-[14px] font-dmsans text-[#444746] line-clamp-2">
            {description}
          </div>

          {/* <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
            {helpType}
          </div> */}

          <div className="inline-flex items-center gap-2 flex-wrap">
            {skills.map((item, index) => (
              <div className="py-1 px-3 border border-[#C8C8C8] w-fit rounded-xl text-[12px] text-[#444746]">
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
      {!isPastEvent ? (
        <div className=" flex flex-col justify-end">
          <div className="flex items-center justify-between gap-16 my-1">
            {isProfilePage || label2 === "EDIT" ? (
              <div class="group relative">
                <CustomButton
                  label="Edit"
                  name="buttonlight"
                  onClick={handleEditClick}
                ></CustomButton>

                {showModal && (
                  <EditModal
                    handleClose={handleCloseModal}
                    id={id}
                    label={label}
                    navigate={navigate}
                    label2={label2}
                    setLabel2={setLabel2}
                    refresh={refresh}
                    title={title}
                    eventDate={eventDate}
                    location={location}
                  />
                )}
              </div>
            ) : (
              <div class="group relative">
                <CustomButton
                  label={label2}
                  name="buttonlight"
                  onClick={() => {
                    navigate(`/outreachsignup/${id}`);
                  }}
                />
              </div>
            )}

            {!isProfilePage ? (
              <div className="flex flex-row space-x-2">
                <img className="w-[20px] h-[14px] my-1" src={userSlots}></img>
                <div className="font-normal font-dmsans text-[14px]">
                  {/* Open Spots: {totalSlots - nop}/{totalSlots} */}
                  {totalSlots - nop}/{totalSlots}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-5 "></div>
      )}
    </div>
  );
};

export default OutreachEventCard;
