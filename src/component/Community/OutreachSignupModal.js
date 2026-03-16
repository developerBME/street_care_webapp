import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import verifiedImg from "../../images/verified_purple.png";
import CustomButton from "../Buttons/CustomButton";
import defaultImage from "../../images/default_avatar.svg";
import userSlots from "../../images/userSlots.png";
import date from "../../images/date.png";
import locate from "../../images/location.png";
import EditModal from "./EditModal";
import { handleRsvp } from "../EventCardService";
import { formatDate } from "../helper";

const OutreachSignupModal = ({ data, closeModal, onSignUp, onEventWithdraw}) => {
  const navigate = useNavigate();
  const [label2, setLabel2] = useState("RSVP");
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="lg:w-[887px] md:w-[90%] mx-2 lg:mx-40 mt-32 mb-32 md:mb-[55px] rounded-3xl bg-white text-black">
        <div className="items-center justify-center px-12 py-8 lg:px-32 lg:py-24 h-full w-full rounded-3xl bg-[#F8F9F0] grid grid-cols-1">
          <div className="w-full flex-col justify-start items-start gap-16 inline-flex">
            <div className="self-stretch h-fit bg-[#F5EDFA] rounded-[30px] flex-col justify-start items-start flex">
              <div className="self-stretch h-fit px-6 pt-9 pb-3 flex-col justify-start items-start gap-2.5 flex">
                <div className="justify-start items-center gap-2 inline-flex">
                  <img
                    className="w-9 h-9 rounded-full"
                    src={data .photoUrl || defaultImage}
                  />
                  <div className="justify-start items-center gap-1 flex">
                    {data ? (
                      <div className="text-[#000] text-sm font-normal font-inter leading-snug">
                        {data.userName}
                      </div>
                    ) : (
                      <div className="text-[#000] text-sm font-normal font-inter leading-snug">
                        Loading...
                      </div>
                    )}
                    <img src={verifiedImg} className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <div className="self-stretch h-fit px-6 py-2 flex-col justify-start items-start gap-2 flex">
                <div className="flex flex-col justify-between space-y-3">
                  <div className="flex flex-row justify-normal space-x-2">
                    <img className="w-[13px] h-[15px] my-[3px]" src={date} />
                    {data ? (
                      <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
                        {formatDate(data.eventDate)}
                      </div>      
                    ) : (
                      <div className="self-stretch text-[#37168B] text-sm font-medium font-inter leading-tight">
                        Loading...
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row justify-normal space-x-2">
                    <img className="w-[12px] h-[15px] my-[3px]" src={locate} />
                    {data ? (
                      <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
                        {data.location.city}, {data.location.state}
                      </div>
                    ) : (
                      <div className="self-stretch text-[#444746] text-sm font-normal font-inter leading-snug">
                        Loading...
                      </div>
                    )}
                  </div>
                </div>

                {data ? (
                  <div className="self-stretch text-[#212121] text-2xl font-medium font-inter leading-loose">
                    {data.title}
                  </div>
                ) : (
                  <div className="self-stretch text-[#212121] text-2xl font-medium font-inter leading-loose">
                    Loading...      
                  </div>
                )}

                {data ? (
                  <div className="self-stretch text-[#444746] text-[14px] font-medium font-dmsans leading-loose">
                    {data.description}
                  </div>
                ) : (
                  <div className="self-stretch text-[#444746] text-[14px] font-medium font-dmsans leading-loose">
                    Loading...
                  </div>
                )}

                {data ? (
                  <div className="inline-flex items-center gap-2 flex-wrap">
                    {data.skills.map((item, index) => (
                      <div key={index} className="py-1 px-3 border border-[#C8C8C8] w-fit rounded-xl text-[12px] text-[#444746]">
                        {item}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="self-stretch text-[#444746] text-[14px] font-medium font-dmsans leading-loose">
                    Loading...
                  </div>
                )}
              </div>
              <div className="self-stretch px-6 pt-4 pb-6 justify-between items-center inline-flex">
                {data ? (
                  <div className="flex flex-row space-x-2">
                    <img
                      className="w-[20px] h-[14px] my-1"
                      src={userSlots}
                    ></img>
                    <div className="font-normal font-dmsans text-[14px]">
                      {data.nop}/{data.totalSlots}
                    </div>
                  </div>
                ) : (
                  <div className="text-[#444746] text-sm font-normal font-inter leading-snug">
                    Loading...
                  </div>
                )}
              </div>
            </div>

            <div className="justify-start items-start gap-[15px] inline-flex">
              <div className="h-10 bg-[#6840E0] rounded-[100px] flex-col justify-center items-center gap-2 inline-flex">
                {data.label === "EDIT" ? (
                  <>
                    <CustomButton
                      label="Withdraw"
                      name="buttondefault"
                      onClick={handleEditClick}
                    />
                    {showEditModal && (
                      <EditModal
                        handleClose={handleCloseEditModal}
                        id={data.id}
                        label={data.label}
                        navigate={navigate}
                        label2={'EDIT'}
                        setLabel2={setLabel2}
                        title={data.title}
                        eventDate={data.eventDate}
                        location={data.location}
                        onEventWithdraw={onEventWithdraw}
                      />
                    )}
                  </>
                ) : (
                  <CustomButton
                    label="Sign Up"
                    name="buttondefault"
                    onClick={(e) => {
                      handleRsvp(
                        e,
                        data.id,
                        "RSVP",
                        navigate,
                        "RSVP",
                        setLabel2,
                        false
                      );
                      onSignUp(true);
                    }}
                  />
                )}
              </div>

              <div
                className="h-10 bg-[#000]] rounded-[100px] border border-[#C8C8C8] flex-col justify-center items-center gap-2 inline-flex"
                onClick={closeModal}
              >
                <div className="self-stretch grow shrink basis-0 px-6 py-2.5 justify-center items-center gap-2 inline-flex">
                  <button className="text-center text-[#1F0A58] text-sm font-medium font-inter leading-tight">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutreachSignupModal;
