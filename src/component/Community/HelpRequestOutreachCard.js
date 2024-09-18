import React from "react";
import { useNavigate } from "react-router-dom";
import userSlots from "../../images/userSlots.png";
import date from "../../images/date.png";
import locate from "../../images/location.png";
import defaultImage from "../../images/default_avatar.svg";
import verifiedImg from "../../images/verified_purple.png";
import CustomButton from "../Buttons/CustomButton";

const HelpRequestOutreachCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-[#F5EEFE] min-w-[40%] md:min-w-[200px] max-w-[320px] lg:w-full rounded-[30px] mb-4 flex flex-col justify-between p-6">
        {/* <div className="inline-flex items-center space-x-2 ">
          <img src={defaultImage} className="w-8 h-8 rounded-full" />
          <div className="font-normal font-inter text-[13px] ">Username</div>
          <img src={verifiedImg} className="w-5 h-5" />
        </div> */}
        <div className="my-3 space-y-3 w-full h-full flex flex-col">
          <div className="flex flex-col justify-between space-y-3">
            <div className="flex flex-row justify-normal space-x-2">
              <img className="w-[13px] h-[15px] my-[3px]" src={date} />
              <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
                {/* 18 May, 2024 */}
                {data.eventDate}
              </div>
            </div>
            <div className="flex flex-row justify-normal space-x-2">
              <img className="w-[12px] h-[15px] my-[3px]" src={locate} />
              <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
                {/* San Jose, CA */}
                {data.location.city}, {data.location.state}
              </div>
            </div>
          </div>

          <div className="font-medium text-[20px] font-dmsans">
            {/* Sample Title */}
            {data.title}
          </div>

          <div className="font-medium text-[14px] font-dmsans text-[#444746]">
            {/* Sample Description */}
            {data.helpType}
          </div>

          <div className="inline-flex items-center gap-2 flex-wrap">
            {data.skills.map((item, index) => (
              <div
                className="py-1 px-3 border border-[#C8C8C8] w-fit rounded-xl text-[12px] text-[#444746]"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row space-x-2 ml-1">
          <img className="w-[20px] h-[14px] my-1" src={userSlots}></img>
          <div className="font-normal font-dmsans text-[14px]">
            0/{data.totalSlots}
          </div>
        </div>
        <div className="group relative mt-2">
          <CustomButton
            label="View Details"
            name="buttonlight"
            onClick={() => {
              navigate(`/outreachsignup/${data.id}`);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default HelpRequestOutreachCard;
