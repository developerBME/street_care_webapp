import React from "react";
import wavingHand from "../../images/waving_hand.png";
import CustomButton from "../Buttons/CustomButton";
import defaultImage from "../../images/default_avatar.svg";
import { useNavigate } from "react-router-dom";
import date from "../../images/date.png";
import locate from "../../images/location.png";
import userSlots from "../../images/userSlots.png";
import verifiedImg from "../../images/verified_purple.png";

const OutreachVisitLogCard = ({ visitLogCardData }) => {
  const navigate = useNavigate();

  return (
    // <div className="bg-[#F5EEFE] rounded-[30px] flex flex-col h-full">
    <div className="bg-[#F5EEFE] min-w-full max-w-[320px] lg:w-full rounded-[30px] mb-4 flex flex-col justify-between p-6">
      {console.log(visitLogCardData)}
      {/* <div className="inline-flex gap-2 items-center px-4 pt-6 py-2">
        <img
          src={visitLogCardData.photoUrl || defaultImage}
          className="w-6 h-6 rounded-full"
        />
        <div>{visitLogCardData.userName || "not defined"}</div>
      </div> */}

      <div className="inline-flex items-center space-x-2 ">
        <img
          src={visitLogCardData.photoUrl || defaultImage}
          className="w-8 h-8 rounded-full"
        />
        <div>{visitLogCardData.userName || "not defined"}</div>
        <img src={verifiedImg} className="w-5 h-5" />
      </div>

      {/* <div className="flex-1 px-4 xl:py-1.5 lg:py-4 py-3">
        <div className="space-y-4">
          <div className="flex flex-col justify-between space-y-3">
            <div className="flex flex-row justify-normal space-x-2">
              <img className="w-[13px] h-[15px] my-[3px]" src={date} />
              <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
                {visitLogCardData?.eventDate}
              </div>
            </div>
            <div className="flex flex-row justify-normal space-x-2">
              <img className="w-[12px] h-[15px] my-[3px]" src={locate} />
              <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
                {visitLogCardData?.location?.city},{" "}
                {visitLogCardData?.location?.state}
              </div>
            </div>
          </div>

          <div class="text-[20px] font-medium font-dmsans">
            {visitLogCardData.description || ""}
          </div>
          <div className="">
            <div className="inline-flex items-center gap-2 flex-wrap">
              {visitLogCardData?.whatGiven.map((item, index) => (
                <div className="py-1 px-3 border border-[#C8C8C8] w-fit rounded-xl text-[10px] text-[#444746]">
                  {item}
                </div>
              ))}
            </div>
          </div>
       
        </div>
      </div> */}

      <div className="my-3 space-y-3 w-full h-full flex flex-col">
        <div className="flex flex-col justify-between space-y-3">
          <div className="flex flex-row justify-normal space-x-2">
            <img className="w-[13px] h-[15px] my-[3px]" src={date} />
            <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
              {visitLogCardData?.eventDate}
            </div>
          </div>
          <div className="flex flex-row justify-normal space-x-2">
            <img className="w-[12px] h-[15px] my-[3px]" src={locate} />
            <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
              {visitLogCardData?.location?.city},{" "}
              {visitLogCardData?.location?.state}
            </div>
          </div>
        </div>
        {/* <div className="font-medium text-[20px] font-dmsans">{title}</div> */}

        <div className="font-medium text-[20px] font-dmsans text-[#444746] line-clamp-1">
          {visitLogCardData.description || ""}
        </div>

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

        <div className="inline-flex items-center gap-2 flex-wrap">
          {visitLogCardData?.whatGiven.map((item, index) => (
            <div className="py-1 px-3 border border-[#C8C8C8] w-fit rounded-xl text-[12px] text-[#444746]">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* <div className="pt-2 px-4 pb-6 space-x-2">
        <CustomButton
          label="View Details"
          name="buttonlightsmall"
          onClick={() => {
            navigate(`/VisitLogDetails/${visitLogCardData.id}`);
          }}
        />
        <CustomButton label="Share" name="buttonsmallborder2" />
      </div> */}

      <div className=" flex flex-col justify-end">
        <div className="flex items-center justify-between gap-16 my-1">
          <div class="group relative">
            <CustomButton
              label="View Details"
              name="buttonlightsmall"
              onClick={() => {
                navigate(
                  `/VisitLogDetails/${visitLogCardData.outreachEventId}`
                );
              }}
            />
          </div>
          <div className="flex flex-row space-x-2">
            <img className="w-[20px] h-[14px] my-1" src={userSlots}></img>
            <div className="font-normal font-dmsans text-[14px]">
              {visitLogCardData?.filledSlots}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutreachVisitLogCard;
