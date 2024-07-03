import React from "react";
import CustomButton from "../Buttons/CustomButton";
import defaultImage from "../../images/default_avatar.svg";
import { useNavigate } from "react-router-dom";
import date from "../../images/date.png";
import locate from "../../images/location.png";
import userSlots from "../../images/userSlots.png";
import verifiedImg from "../../images/verified_purple.png";
import { formatDate } from "../helper";
import CardTags from "./CardTags";

const OutreachVisitLogCard = ({ visitLogCardData }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F5EEFE] min-w-full max-w-[320px] lg:w-full rounded-[30px] mb-4 flex flex-col justify-between p-6">
      <div className="inline-flex items-center space-x-2 ">
        <img
          src={visitLogCardData.photoUrl || defaultImage}
          className="w-8 h-8 rounded-full"
        />
        <div>{visitLogCardData.userName || "not defined"}</div>
        <img src={verifiedImg} className="w-5 h-5" />
      </div>

      <div className="my-3 space-y-3 w-full h-full flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row justify-normal space-x-2">
            <img className="w-[13px] h-[15px] my-[3px]" src={date} />
            <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
              {visitLogCardData && visitLogCardData.eventDate
                ? formatDate(visitLogCardData.eventDate)
                : null}
            </div>
          </div>
          <div className="flex flex-row justify-normal space-x-2">
            <img className="w-[12px] h-[15px] my-[3px]" src={locate} />
            <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
              {`${visitLogCardData?.location?.city}, ${
                visitLogCardData?.location?.stateAbbv ||
                visitLogCardData?.location?.state
              }`}
            </div>
          </div>
        </div>

        <h1 className="font-medium text-[24px] font-dmsans text-[#444746] line-clamp-1">
          {visitLogCardData?.description || ""}
        </h1>

        <div className="flex flex-row justify-between">
          <div className="font-bold text-[14px] font-dmsans text-[#444746] line-clamp-1">
            People Helped
          </div>
          <div className="font-bold text-[14px] font-dmsans text-[#444746] line-clamp-1">
            {visitLogCardData?.numberPeopleHelped}
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <div className="font-bold text-[14px] font-dmsans text-[#444746] line-clamp-1">
            Items Donated
          </div>
          <div className="font-bold text-[14px] font-dmsans text-[#444746] line-clamp-1">
            {visitLogCardData?.itemQty}
          </div>
        </div>

        <CardTags tags={visitLogCardData?.whatGiven || []} />
      </div>

      <div className=" flex flex-col justify-end">
        <div className="flex items-center justify-between gap-16 my-1">
          <div class="group relative">
            <CustomButton
              label="View Details"
              name="buttonlightsmall"
              onClick={() => {
                navigate(`/VisitLogDetails/${visitLogCardData.id}`);
              }}
            />
          </div>
          {/* <div className="flex flex-row space-x-2">
            <img className="w-[20px] h-[14px] my-1" src={userSlots}></img>
            <div className="font-normal font-dmsans text-[14px]">
              {visitLogCardData?.filledSlots}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default OutreachVisitLogCard;
