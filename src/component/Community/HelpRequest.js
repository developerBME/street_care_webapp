import React, { useState } from "react";
import wavingHand from "../../images/waving_hand2.png";
import HelpRequestCard from "./HelpRequestCard";
import CustomButton from "../Buttons/CustomButton";

const HelpRequest = () => {
  const [visibleItems, setVisibleItems] = useState(5);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 5);
  };
  const helpRequestData = [
    {
      helpStatus: "Need Help",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Help on the way",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Help Received",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Need Help",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Need Help",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Help on the way",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Need Help",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Help on the way",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Help Received",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Need Help",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Need Help",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Help on the way",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Help on the way",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Help Received",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Need Help",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Need Help",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Help on the way",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
  ];

  return (
    // <div>
    //   <div className="p-4 lg:px-28 lg:py-12 bg-gradient-to-br from-[#C0F4FF] to-[#DDD] rounded-t-2xl">
    //     <div className="flex gap-x-4 items-center">
    //       <div>
    //         <img
    //           className="w-12 h-12 lg:w-16 lg:h-16"
    //           src={wavingHand}
    //           alt="..."
    //         ></img>
    //       </div>
    //       <div className="text-[#212121] text-2xl lg:text-4xl font-medium font-bricolage lg:leading-[44px]">
    //         Help Requests
    //       </div>
    //       <button className="my-2 bg-[#6840E0] hover:bg-[#36295E] rounded-[100px] flex-col justify-center items-center gap-2 inline-flex text-neutral-100 text-md font-semibold font-inter leading-tight self-stretch px-6 py-2.5">
    //         Add New Request
    //       </button>
    //     </div>
    //   </div>
    //   <div className="p-4 lg:px-28 lg:py-12 flex flex-col bg-[#F7F7F7] gap-4 lg:gap-8 rounded-b-2xl">
    //     <div>
    //       {helpRequestData.slice(0, visibleItems).map((item, index) => (
    //         <HelpRequestCard key={index} helpRequestCardData={item} />
    //       ))}
    //     </div>
    //     {visibleItems < helpRequestData.length && (
    //       <button
    //         className="w-fit rounded-[100px] border border-[#C8C8C8] flex-col justify-center items-center gap-2 flex text-center text-[#1F0A58] hover:bg-[#1F0A58] hover:text-white text-[11px] font-semibold font-inter leading-tight self-stretch px-6 py-2.5"
    //         onClick={loadMore}
    //       >
    //         Load 5 More
    //       </button>
    //     )}
    //   </div>
    // </div>

    // Updated
    <div>
      <div className="sm:p-4 lg:px-28 lg:py-12 bg-gradient-to-br from-[#C0F4FF] to-[#DDD] rounded-t-2xl sm:flex-row px-2 py-6 flex-col justify-start items-center gap-4 inline-flex w-full">
        <div className="flex gap-x-4 items-center">
          <div>
            <img
              className="w-12 h-12 lg:w-16 lg:h-16"
              src={wavingHand}
              alt="..."
            ></img>
          </div>
          <div className="text-[#212121] text-2xl lg:text-4xl font-medium font-dmsans lg:leading-[44px]">
            Help Requests
          </div>
        </div>
        <div className="flex-col">
          {/* <button className="my-2 bg-[#6840E0] hover:bg-[#36295E] rounded-[100px] flex-col justify-center items-center gap-2 inline-flex text-neutral-100 text-md font-semibold font-inter leading-tight self-stretch px-6 py-2.5">
            Add New Request
          </button> */}
          <div className="my-2 flex-col justify-center items-center gap-2 inline-flex font-medium font-dmsans leading-tight self-stretch">
            <CustomButton label="Add New Request" name="buttondefault" />
          </div>
        </div>
      </div>
      <div className="p-4 lg:px-28 lg:py-12 flex flex-col bg-[#F7F7F7] gap-4 lg:gap-8 rounded-b-2xl">
        <div>
          {helpRequestData.slice(0, visibleItems).map((item, index) => (
            <HelpRequestCard key={index} helpRequestCardData={item} />
          ))}
        </div>
        {visibleItems < helpRequestData.length && (
          <button
            className="w-fit rounded-[100px] border border-[#C8C8C8] flex-col justify-center items-center gap-2 flex text-center text-[#1F0A58] hover:bg-[#1F0A58] hover:text-white text-[13px] font-medium font-dmsans leading-tight self-stretch px-6 py-2.5"
            onClick={loadMore}
          >
            Load 5 More
          </button>
        )}
      </div>
    </div>
  );
};

export default HelpRequest;
