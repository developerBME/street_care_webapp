import React from "react";
import ChipSuperpower from "../Community/ChipSuperpower";

const chipList = [
  "Childcare",
  "Clothing",
  "Education",
  "Personal Care",
  "Employment and Training",
  "Food and Water",
  "Healthcare",
  "Chinese",
  "Spanish",
  "Legal",
  "Shelter",
  "Transportation",
  "LGBTQ Support",
  "Technology Access",
  "Social Integration",
  "Pet Care",
];

const SuperpowerModal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-800 z-50">
      <div className="w-[350px] sm:w-[550px] md:w-[650px] lg:w-[800px] bg-white rounded-2xl sm:p-12 p-6">
        <div className="w-fit h-fit flex-col justify-start items-start gap-16 inline-flex">
          <div className="self-stretch h-fit flex-col justify-start items-start gap-6 flex">
            <div className="justify-self-end items-start gap-20 sm:gap-6 inline-flex">
              <div className="sm:w-[400px] md:w-[500px] lg:w-[650px] text-[#212121] text-4xl font-medium font-bricolage leading-[44px]">
                Specialized Volunteers
              </div>
              <div className="flex w-8 h-12 m-auto">
                <button className="text-5xl" onClick={closeModal}>
                  &times;
                </button>
              </div>
            </div>
            <div className="self-stretch text-[#616161] text-lg font-semibold font-['Open Sans'] leading-normal">
              Used your Superpower to help us build the community.
            </div>
            <div className="w-fit space-y-2">
              {chipList.map((value, index) => (
                <ChipSuperpower key={index} val={value} />
              ))}
            </div>
          </div>
          <div className="w-fit justify-start items-start gap-4 inline-flex">
            <div className="h-10 bg-[#6840E0] rounded-[100px] flex-col justify-center items-center gap-2 inline-flex self-stretch px-6 py-2.5 text-[#F7F7F7] hover:bg-[#36295E] cursor-pointer">
              <button className="text-center text-[15px] font-semibold font-inter leading-tight">
                Save
              </button>
            </div>
            <div
              className="h-10 rounded-[100px] border border-[#C8C8C8] flex-col justify-center items-center gap-2 inline-flex self-stretch px-6 py-2.5 text-[#6840E0] hover:text-[#36295E] cursor-pointer"
              onClick={closeModal}
            >
              <button className="text-center text-[15px] font-semibold font-inter leading-tight">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperpowerModal;
