import React from "react";

import CustomButton from "../Buttons/CustomButton";
import { useNavigate } from "react-router-dom";

const RSVPConfirmationModal = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-800 z-50">
      <div className="w-[350px] sm:w-[550px] md:w-[650px] lg:w-[800px] bg-[#F8F9F0] rounded-2xl p-14">
        <div className="w-fit h-fit flex-col justify-start items-start gap-12 inline-flex">
          <div className="self-stretch h-fit flex-col justify-start items-start gap-6 flex">
            <div className="justify-self-end items-start gap-20 sm:gap-6 inline-flex w-full">
              <div className="w-fit text-[#212121] text-4xl font-medium font-bricolage leading-[44px]">
                You have successfully signed up for the event!
              </div>
            </div>
            <div className="self-stretch text-[#616161] text-lg font-semibold font-['Open Sans'] leading-normal">
              Thank you for joining us!
            </div>
          </div>
          <div className="w-fit justify-start items-start gap-4 inline-flex">
            <CustomButton
              label="Back to home"
              name="buttondefault"
              onClick={() => {
                navigate("/");
              }}
            />
            <CustomButton
              label="Back to my Profile"
              name="buttonborder"
              onClick={() => {
                navigate("/profile");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSVPConfirmationModal;
