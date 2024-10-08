import React, { useState } from "react";
import help_announcement from "../../images/help_announcement.png";
import help_pending from "../../images/help_pending.png";
import help_received from "../../images/help_received.png";
import CustomButton from "../Buttons/CustomButton";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  handleUpdateHelpRequestStatus,
} from "../HelpRequestService";
import { Timestamp } from "@firebase/firestore";

const HelpRequestCard = ({ helpRequestCardData, refresh }) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const fAuth = getAuth();

  const {
    id,
    status: helpStatus,
    title: helpTitle,
    skills: helpTags,
    location: helpLocation,
    identification: helpHowToFind,
    description: helpDescription,
    userName: helpPostingUser,
    uid: helpUid,
    createdAt,
  } = helpRequestCardData;

  const createdAtDate =
    createdAt instanceof Timestamp ? createdAt.toDate() : new Date(createdAt);

  const currentTimestamp = new Date().getTime();
  const timeDifference = currentTimestamp - createdAtDate.getTime();
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
      <div className=" md:grid md:grid-cols-3 md:gap-4">
        <div className="w-full md:w-fit h-fit flex-col justify-start items-start gap-[15px] inline-flex col-span-2 md:mb-0 mb-4">
          {helpStatus === "Need Help" && (
            <div className="w-fit h-8 px-2 py-1 bg-[#FFECF2] rounded-lg justify-start items-start gap-2 inline-flex">
              <div className="w-6 h-6 relative">
                <img alt="" src={help_announcement}></img>
              </div>
              <div className="text-center text-[#7E0025] text-lg font-semibold font-opensans leading-normal">
                {helpStatus}
              </div>
            </div>
          )}

          {helpStatus === "Help on the way" && (
            <div className="w-fit h-8 px-2 py-1 bg-[#FEF9EF] rounded-lg justify-start items-start gap-2 inline-flex">
              <div className="w-6 h-6 relative">
                <img alt="" src={help_pending}></img>
              </div>
              <div className="text-center text-[#836A00] text-lg font-semibold font-opensans leading-normal">
                {helpStatus}
              </div>
            </div>
          )}

          {helpStatus === "Help Received" && (
            <div className="w-fit h-8 px-2 py-1 bg-[#D4FFEC] rounded-lg justify-start items-start gap-2 inline-flex">
              <div className="w-6 h-6 relative">
                <img alt="" src={help_received}></img>
              </div>
              <div className="text-center text-[#004905] text-lg font-semibold font-opensans leading-normal">
                {helpStatus}
              </div>
            </div>
          )}

          <div className="self-stretch text-[#273164] text-[28px] font-medium font-bricolage leading-9">
            {helpTitle}
          </div>
          <div className="w-full overflow-x-auto">
            <div className="justify-start items-start gap-2 inline-flex">
              {helpTags.map((item, index) => (
                <div
                  className="w-fit px-3 py-1 bg-white rounded-xl border border-[#616161] justify-start items-center gap-4 flex"
                  key={item}
                >
                  <div className="opacity-90 justify-start items-center gap-1 flex text-[#616161] text-sm font-semibold font-opensans leading-tight">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="self-stretch text-[#616161] text-[15px] font-normal font-dmsans leading-normal">
            Location: {helpLocation.street}, {helpLocation.city},{" "}
            {helpLocation.state}, {helpLocation.zipcode}
            <br />
            How to find: {helpHowToFind}
          </div>
          <div className="self-stretch" style={{ width: "150%" }}>
            <span className="text-[#616161] text-[15px] font-normal font-dmsans leading-normal">
              {showDetails || helpDescription.length < 250
                ? helpDescription
                : `${helpDescription.substring(0, 250)}...`}
            </span>{" "}
            {helpDescription.length > 250 && (
              <button
                className="text-[#6840E0] text-[15px] font-normal font-dmsans underline leading-normal cursor-pointer"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? "Hide details" : "Show details"}
              </button>
            )}
          </div>

          <div className="text-[#616161] text-xs font-medium font-dmsans leading-[18px]">
            Posted
            {days > 0 ? (
              <span>
                {" "}
                {days} {days === 1 ? "day" : "days"}
              </span>
            ) : remainingHours > 0 ? (
              <span>
                {" "}
                {remainingHours} {remainingHours === 1 ? "hour" : "hours"}
              </span>
            ) : remainingMinutes > 0 ? (
              <span>
                {" "}
                {remainingMinutes}{" "}
                {remainingMinutes === 1 ? "minute" : "minutes"}
              </span>
            ) : (
              <span>
                {" "}
                {remainingSeconds}{" "}
                {remainingSeconds === 1 ? "second" : "seconds"}
              </span>
            )}{" "}
            ago by user {helpPostingUser}
          </div>
        </div>

        {helpStatus === "Need Help" && (
          <div className="col-span-1 h-fit">
            <button
              onClick={
                !fAuth?.currentUser?.uid
                  ? () => {
                      navigate(`/login`);
                    }
                  : () => {
                      navigate(`/community/icanhelp/${id}`);
                    }
              }
              className="w-fit bg-[#E6DCFF] hover:bg-[#6840E0] text-[#181818] hover:text-white rounded-[100px] flex-col justify-start gap-2 flex px-4 py-2 md:px-6 md:py-2.5 text-center text-[12px] font-semibold font-inter leading-tight md:float-right"
            >
              I can help
            </button>
          </div>
        )}
        {helpStatus === "Help on the way" &&
          fAuth.currentUser === helpPostingUser && (
            <div className="col-span-1 h-fit">
              <button
                className="w-fit bg-[#E6DCFF] hover:bg-[#6840E0] text-[#181818] hover:text-white rounded-[100px] flex-col justify-start gap-2 flex px-4 py-2 md:px-6 md:py-2.5 text-center text-[12px] font-semibold font-inter leading-tight md:float-right"
                onClick={
                  !fAuth?.currentUser?.uid
                    ? () => {
                        navigate(`/login`);
                      }
                    : (e) =>
                        handleUpdateHelpRequestStatus(e, id, "Help Received", refresh)
                }
              >
                Mark as Help Recieved
              </button>
            </div>
          )}
        {helpStatus === "Help on the way" &&
          fAuth.currentUser !== helpPostingUser && (
            <div className="col-span-1 h-fit">
              <button
                onClick={
                  !fAuth?.currentUser?.uid
                    ? () => {
                        navigate(`/login`);
                      }
                    : () => {
                        navigate(`/community/icanhelp/${id}`);
                      }
                }
                className="w-fit bg-[#E6DCFF] hover:bg-[#6840E0] text-[#181818] hover:text-white rounded-[100px] flex-col justify-start gap-2 flex px-4 py-2 md:px-6 md:py-2.5 text-center text-[12px] font-semibold font-inter leading-tight md:float-right"
              >
                I can help
              </button>
            </div>
          )}
        {helpStatus === "Help Received" && (
          <div className="col-span-1 h-fit">
            {helpUid === fAuth?.currentUser?.uid && (
              <div className="w-fit flex-col justify-start gap-2 flex text-center text-[12px] font-semibold font-inter leading-tight md:float-right mt-2.5">
                <CustomButton
                  label="Reopen Help Request"
                  name="buttonborder"
                  onClick={(e) =>
                    handleUpdateHelpRequestStatus(e, id, "Need Help", refresh)
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpRequestCard;
