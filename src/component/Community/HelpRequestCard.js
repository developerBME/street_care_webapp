import React from "react";
import help_announcement from "../../images/help_announcement.png";
import help_pending from "../../images/help_pending.png";
import help_received from "../../images/help_received.png";
import CustomButton from "../Buttons/CustomButton";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const HelpRequestCard = ({ helpRequestCardData }) => {
  const navigate = useNavigate();

  const fAuth = getAuth();
  onAuthStateChanged(fAuth, (user) => {
    if (user) {
      console.log(user);
    } else {
      console.log("USER NOT FOUND!");
    }
  });

  const {
    status : helpStatus,
    title : helpTitle,
    skills : helpTags,
    location : helpLocation,
    identification : helpHowToFind,
    description : helpDescription,
    userName : helpPostingUser,
    uid: helpUid,
    createdAt: createdAt,
  } = helpRequestCardData;

  const currentTimestamp = new Date().getTime();
  const timeDifference = currentTimestamp - Date.parse(createdAt);
  // Convert the time difference to seconds, minutes, hours, and days
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  // Calculate the remaining hours, minutes, and seconds
  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;


  return (

    // Updated
    <div className="p-4 sm:p-4 lg:p-8 gap-16 bg-white border-y border-[#C8C8C8] sm:justify-end">
      <div className="flex-row sm:flex sm:gap-x-2 md:gap-x-4 lg:gap-x-8">
        <div className="w-fit h-fit flex-col justify-start items-start gap-[15px] inline-flex">
          {helpStatus === "Need Help" && (
            <div className="w-fit h-8 px-2 py-1 bg-[#FFECF2] rounded-lg justify-start items-start gap-2 inline-flex">
              <div className="w-6 h-6 relative">
                <img src={help_announcement}></img>
              </div>
              <div className="text-center text-[#7E0025] text-lg font-semibold font-opensans leading-normal">
                {helpStatus}
              </div>
            </div>
          )}

          {helpStatus === "Help on the way" && (
            <div className="w-fit h-8 px-2 py-1 bg-[#FEF9EF] rounded-lg justify-start items-start gap-2 inline-flex">
              <div className="w-6 h-6 relative">
                <img src={help_pending}></img>
              </div>
              <div className="text-center text-[#836A00] text-lg font-semibold font-opensans leading-normal">
                {helpStatus}
              </div>
            </div>
          )}

          {helpStatus === "Help Received" && (
            <div className="w-fit h-8 px-2 py-1 bg-[#D4FFEC] rounded-lg justify-start items-start gap-2 inline-flex">
              <div className="w-6 h-6 relative">
                <img src={help_received}></img>
              </div>
              <div className="text-center text-[#004905] text-lg font-semibold font-opensans leading-normal">
                {helpStatus}
              </div>
            </div>
          )}

          <div className="self-stretch text-[#273164] text-[28px] font-medium font-bricolage leading-9">
            {helpTitle}
          </div>
          <div className="justify-start items-start gap-2 inline-flex">
            {helpTags.map((item, index) => (
              <div className="w-fit px-3 py-1 bg-white rounded-xl border border-[#616161] justify-start items-center gap-4 flex">
                <div className="opacity-90 justify-start items-center gap-1 flex text-[#616161] text-sm font-semibold font-opensans leading-tight">
                  {item}
                </div>
              </div>
            ))}
          </div>
          <div className="self-stretch text-[#616161] text-[15px] font-normal font-dmsans leading-normal">
            Location: {helpLocation.street}, {helpLocation.city}, {helpLocation.state},{" "}
            {helpLocation.zipcode}
            <br />
            How to find: {helpHowToFind}
          </div>
          <div className="self-stretch">
            <span className="text-[#616161] text-[15px] font-normal font-dmsans leading-normal">
              {helpDescription}
            </span>{" "}
            <a className="text-[#6840E0] text-[15px] font-normal font-dmsans underline leading-normal cursor-pointer">
              Show details
            </a>
          </div>

          <div className="text-[#616161] text-xs font-medium font-dmsans leading-[18px]">
            Posted 
            {days > 0 ? (
              <span> {days} {days === 1 ? 'day' : 'days'}</span>
            ) : remainingHours > 0 ? (
              <span> {remainingHours} {remainingHours === 1 ? 'hour' : 'hours'}</span>
            ) : remainingMinutes > 0 ? (
              <span> {remainingMinutes} {remainingMinutes === 1 ? 'minute' : 'minutes'}</span>
            ) : (
              <span> {remainingSeconds} {remainingSeconds === 1 ? 'second' : 'seconds'}</span>
            )} ago by user {helpPostingUser}
          </div>
        </div>

        {helpStatus === "Need Help" && (
          <div className="w-fit pt-[15px] sm:py-0 sm:w-1/3 h-fit flex-col justify-start sm:items-end gap-4 inline-flex">
            <button onClick={() => {navigate("/icanhelp");}} className="w-fit bg-[#E6DCFF] hover:bg-[#6840E0] text-[#181818] hover:text-white rounded-[100px] flex-col justify-start gap-2 flex px-4 py-2 md:px-6 md:py-2.5 text-center text-[12px] font-semibold font-inter leading-tight">
              I can help
            </button>
            {/* <div className="w-fit flex-col justify-start gap-2 flex px-4 py-2 md:px-6 md:py-2.5 text-center text-[12px] font-semibold font-inter leading-tight">
              <CustomButton label="I can help" name="buttonlight" />
            </div> */}
          </div>
        )}
        {helpStatus === "Help on the way" && (
          <div className="w-fit pt-[15px] sm:py-0 sm:w-1/3 h-fit flex-row sm:flex-col justify-start sm:items-end gap-4 inline-flex">
            <button className="w-fit bg-[#E6DCFF] hover:bg-[#6840E0] text-[#181818] hover:text-white rounded-[100px] flex-col justify-start gap-2 flex px-4 py-2 md:px-6 md:py-2.5 text-center text-[12px] font-semibold font-inter leading-tight">
              Mark as Help Recieved
            </button>
            {/* <button className="w-fit bg-[#6840E0] hover:bg-[#E6DCFF] text-white hover:text-[#181818] rounded-[100px] flex-col justify-start gap-2 flex px-4 py-2 md:px-6 md:py-2.5 text-center text-[12px] font-semibold font-inter leading-tight">
              Reopen Help Request
            </button>
            <div className="w-fit flex-col justify-start gap-2 flex px-4 py-2 md:px-6 md:py-2.5 text-center text-[12px] font-semibold font-inter leading-tight">
              <CustomButton label="Mark as Help Received" name="buttonlight" />
            </div> */}
            {helpUid === fAuth.currentUser.uid && (
            <div className="w-fit flex-col justify-start gap-2 flex text-center text-[12px] font-semibold font-inter leading-tight">
              <CustomButton label="Reopen Help Request" name="buttonborder" />
            </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpRequestCard;
