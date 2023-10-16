import React from "react";
import userImg from "../../images/user.jpeg";
import verifiedImg from "../../images/verified_purple.png";
import wavingHand from "../../images/waving_hand.png";
import CustomButton from "../Buttons/CustomButton";
import { handleRsvp } from "../EventCardService";


const OutreachEventCard = ({ cardData, isProfilePage }) => {
    const { id, label, userName, title, eventDate, location, helpType, totalSlots, interests } = cardData
    console.log("what is label",label)
  return (
    <div className="bg-[#F5EEFE] w-[350px] lg:w-full rounded-2xl mb-4">
      {!isProfilePage ? (
        <div className="inline-flex items-center px-5 pt-6 pb-3 space-x-2">
          <img src={userImg} className="w-8 h-8 rounded-full" />
          <div className="font-normal font-['Inter'] text-[13px] ">
            {userName}
          </div>
          <img src={verifiedImg} className="w-5 h-5" />
        </div>
      ) : (
        <div></div>
      )}

      {isProfilePage?
        <div className="px-5 py-2 space-y-4 pt-4 w-full">
      <div className="font-medium text-[22px] font-bricolage">{title}</div>
      <div className="font-semibold font-['Inter'] text-[13px] text-[#37168B]">
        {eventDate}
      </div>
      <div className="font-normal font-['Inter'] text-[#444746] text-[13px]">
        {location.add1}, {location.add2}, {location.state}, {location.zipcode}
      </div>
      <div className="w-full inline-flex items-center bg-white px-4 py-2 space-x-2.5 rounded-2xl">
        <img src={wavingHand} />
        <div className="font-normal font-['Inter'] text-[13px] text-[#181818]">
          {helpType}
        </div>
      </div>
    </div>:

      <div className="px-5 py-2 space-y-2 w-full">
        <div className="font-medium text-[16px] font-bricolage">{title}</div>
        <div className="font-semibold font-['Inter'] text-[12px] text-[#37168B]">
          {eventDate}
        </div>
        <div className="font-normal font-['Inter'] text-[#444746] text-[12px]">
          {location.add1}, {location.add2}, {location.state}, {location.zipcode}
        </div>
        <div className="w-full inline-flex items-center bg-white px-4 py-2 space-x-2.5 rounded-2xl">
          <img src={wavingHand} />
          <div className="font-normal font-['Inter'] text-[12px] text-[#181818]">
            {helpType}
          </div>
        </div>
      </div>}
      <div className="flex items-center justify-between px-5 pt-2 pb-4 gap-16">
        {isProfilePage ? (
          <CustomButton label="Edit" name="buttonlight" />
        ) : (
            <CustomButton label={label} name="buttonlight" onClick = {(e) => handleRsvp(e, id, label)} />

        )}

        {!isProfilePage ? (
          <div className="font-normal font-['Inter'] text-[12px]">
            Open Spots: {totalSlots - interests}/{totalSlots}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default OutreachEventCard;
