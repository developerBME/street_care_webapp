import React, { useState } from "react";
import wavingHand from "../../images/waving_hand2.png";
import help_announcement from "../../images/help_announcement.png";
import help_pending from "../../images/help_pending.png";
import help_received from "../../images/help_received.png";

const HelpRequest = () => {
  const [showLoadBtn, setShowLoadBtn] = useState(true);
  return (
    <div>
      <div className="p-4 lg:px-28 lg:py-12 bg-gradient-to-br from-[#C0F4FF] to-[#DDD] rounded-t-2xl">
        <div className="flex gap-x-4 items-center">
          <div>
            <img
              className="w-12 h-12 lg:w-16 lg:h-16"
              src={wavingHand}
              alt="..."
            ></img>
          </div>
          <div className="text-[#212121] text-2xl lg:text-4xl font-medium font-bricolage lg:leading-[44px]">
            Help Requests
          </div>
          <button className="my-2 bg-[#6840E0] rounded-[100px] flex-col justify-center items-center gap-2 inline-flex text-neutral-100 text-md font-semibold font-inter leading-tight self-stretch px-6 py-2.5">
            Add New Request
          </button>
        </div>
      </div>
      <div className="p-4 lg:px-28 lg:py-12 flex flex-col bg-[#F7F7F7] gap-4 lg:gap-8 rounded-b-2xl">
        <div>
          <div className="p-4 lg:p-8 gap-16 bg-white border-y border-[#C8C8C8] justify-end">
            <div className="flex gap-x-2 md:gap-x-4 lg:gap-x-8">
              <div className="w-fit h-fit flex-col justify-start items-start gap-[15px] inline-flex">
                <div className="w-fit h-8 px-2 py-1 bg-[#FFECF2] rounded-lg justify-start items-start gap-2 inline-flex">
                  <div className="w-6 h-6 relative">
                    <img src={help_announcement}></img>
                  </div>
                  <div className="text-center text-[#7E0025] text-lg font-semibold font-bricolage leading-normal">
                    Need Help
                  </div>
                </div>
                <div className="self-stretch text-[#273164] text-[28px] font-medium font-bricolage leading-9">
                  Childcare Support needed in Brooklyn Bridge.
                </div>
                <div className="justify-start items-start gap-2 inline-flex">
                  <div className="w-fit px-3 py-1 bg-white rounded-xl border border-[#616161] justify-start items-center gap-4 flex">
                    <div className="opacity-90 justify-start items-center gap-1 flex text-[#616161] text-sm font-semibold font-bricolage leading-tight">
                      Childcare
                    </div>
                  </div>
                  <div className="w-fit px-3 py-1 bg-white rounded-xl border border-[#616161] justify-start items-center gap-4 flex">
                    <div className="opacity-90 justify-start items-center gap-1 flex text-[#616161] text-sm font-semibold font-bricolage leading-tight">
                      Counseling and Support
                    </div>
                  </div>
                </div>
                <div className="self-stretch text-[#616161] text-[15px] font-normal font-inter leading-normal">
                  Location: 123 Plaza, New York
                  <br />
                  How to find: She is around 5’3 tall, with blonde long hair and
                  tattoos on her arm.
                </div>
                <div className="self-stretch">
                  <span className="text-[#616161] text-[15px] font-normal font-inter leading-normal">
                    Lucy is 26 years old with a 2 year old daughter seeking for
                    childcare support and general counseling.
                  </span>
                  <a className="text-[#6840E0] text-[15px] font-normal font-inter underline leading-normal cursor-pointer">
                    Show details
                  </a>
                </div>

                <div className="text-[#616161] text-xs font-semibold font-inter leading-[18px]">
                  Posted 30 mins ago by user K
                </div>
              </div>
              <div className="w-1/3 h-fit flex-col justify-start items-end gap-4 inline-flex">
                <button className="w-fit bg-[#E6DCFF] hover:bg-[#6840E0] text-[#181818] hover:text-white rounded-[100px] flex-col justify-start gap-2 flex px-4 py-2 md:px-6 md:py-2.5 text-center text-[12px] font-semibold font-inter leading-tight">
                  I can help
                </button>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="p-4 lg:p-8 gap-16 bg-white border-y border-[#C8C8C8]justify-end">
            <div className="flex gap-x-2 md:gap-x-4 lg:gap-x-8">
              <div className="w-fit h-fit flex-col justify-start items-start gap-[15px] inline-flex">
                <div className="w-fit h-8 px-2 py-1 bg-[#FEF9EF] rounded-lg justify-start items-start gap-2 inline-flex">
                  <div className="w-6 h-6 relative">
                    <img src={help_pending}></img>
                  </div>
                  <div className="text-center text-[#836A00] text-lg font-semibold font-bricolage leading-normal">
                    Help on the way
                  </div>
                </div>
                <div className="self-stretch text-[#273164] text-[28px] font-medium font-bricolage leading-9">
                  Childcare Support needed in Brooklyn Bridge.
                </div>
                <div className="justify-start items-start gap-2 inline-flex">
                  <div className="w-fit px-3 py-1 bg-white rounded-xl border border-[#616161] justify-start items-center gap-4 flex">
                    <div className="opacity-90 justify-start items-center gap-1 flex text-[#616161] text-sm font-semibold font-bricolage leading-tight">
                      Childcare
                    </div>
                  </div>
                  <div className="w-fit px-3 py-1 bg-white rounded-xl border border-[#616161] justify-start items-center gap-4 flex">
                    <div className="opacity-90 justify-start items-center gap-1 flex text-[#616161] text-sm font-semibold font-bricolage leading-tight">
                      Counseling and Support
                    </div>
                  </div>
                </div>
                <div className="self-stretch text-[#616161] text-[15px] font-normal font-inter leading-normal">
                  Location: 123 Plaza, New York
                  <br />
                  How to find: She is around 5’3 tall, with blonde long hair and
                  tattoos on her arm.
                </div>
                <div className="self-stretch">
                  <span className="text-[#616161] text-[15px] font-normal font-inter leading-normal">
                    Lucy is 26 years old with a 2 year old daughter seeking for
                    childcare support and general counseling.
                  </span>
                  <a className="text-[#6840E0] text-[15px] font-normal font-inter underline leading-normal cursor-pointer">
                    Show details
                  </a>
                </div>
                <div className="text-[#616161] text-xs font-semibold font-inter leading-[18px]">
                  Posted 30 mins ago by user K
                </div>
              </div>
              <div className="w-1/3 h-fit flex-col justify-start items-end gap-4 inline-flex">
                <button className="w-fit bg-[#E6DCFF] hover:bg-[#6840E0] text-[#181818] hover:text-white rounded-[100px] flex-col justify-start gap-2 flex px-4 py-2 md:px-6 md:py-2.5 text-center text-[12px] font-semibold font-inter leading-tight">
                  Mark as Help Recieved
                </button>
                <button className="w-fit bg-[#6840E0] hover:bg-[#E6DCFF] text-white hover:text-[#181818] rounded-[100px] flex-col justify-start gap-2 flex px-4 py-2 md:px-6 md:py-2.5 text-center text-[12px] font-semibold font-inter leading-tight">
                  Reopen Help Request
                </button>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="p-4 lg:p-8 gap-16 bg-white border-y border-[#C8C8C8] justify-end">
            <div className="flex gap-x-2 md:gap-x-4 lg:gap-x-8">
              <div className="w-fit h-fit flex-col justify-start items-start gap-[15px] inline-flex">
                <div className="w-fit h-8 px-2 py-1 bg-[#D4FFEC] rounded-lg justify-start items-start gap-2 inline-flex">
                  <div className="w-6 h-6 relative">
                    <img src={help_received}></img>
                  </div>
                  <div className="text-center text-[#004905] text-lg font-semibold font-bricolage leading-normal">
                    Help Received
                  </div>
                </div>
                <div className="self-stretch text-[#273164] text-[28px] font-medium font-bricolage leading-9">
                  Childcare Support needed in Brooklyn Bridge.
                </div>
                <div className="justify-start items-start gap-2 inline-flex">
                  <div className="w-fit px-3 py-1 bg-white rounded-xl border border-[#616161] justify-start items-center gap-4 flex">
                    <div className="opacity-90 justify-start items-center gap-1 flex text-[#616161] text-sm font-semibold font-bricolage leading-tight">
                      Childcare
                    </div>
                  </div>
                  <div className="w-fit px-3 py-1 bg-white rounded-xl border border-[#616161] justify-start items-center gap-4 flex">
                    <div className="opacity-90 justify-start items-center gap-1 flex text-[#616161] text-sm font-semibold font-bricolage leading-tight">
                      Counseling and Support
                    </div>
                  </div>
                </div>
                <div className="self-stretch text-[#616161] text-[15px] font-normal font-inter leading-normal">
                  Location: 123 Plaza, New York
                  <br />
                  How to find: She is around 5’3 tall, with blonde long hair and
                  tattoos on her arm.
                </div>
                <div className="self-stretch">
                  <span className="text-[#616161] text-[15px] font-normal font-inter leading-normal">
                    Lucy is 26 years old with a 2 year old daughter seeking for
                    childcare support and general counseling.
                  </span>
                  <a className="text-[#6840E0] text-[15px] font-normal font-inter underline leading-normal cursor-pointer">
                    Show details
                  </a>
                </div>

                <div className="text-[#616161] text-xs font-semibold font-inter leading-[18px]">
                  Posted 30 mins ago by user K
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="p-4 lg:p-8 gap-16 bg-white border-y border-[#C8C8C8] justify-end">
            <div className="flex gap-x-2 md:gap-x-4 lg:gap-x-8">
              <div className="w-fit h-fit flex-col justify-start items-start gap-[15px] inline-flex">
                <div className="w-fit h-8 px-2 py-1 bg-[#D4FFEC] rounded-lg justify-start items-start gap-2 inline-flex">
                  <div className="w-6 h-6 relative">
                    <img src={help_received}></img>
                  </div>
                  <div className="text-center text-[#004905] text-lg font-semibold font-bricolage leading-normal">
                    Help Received
                  </div>
                </div>
                <div className="self-stretch text-[#273164] text-[28px] font-medium font-bricolage leading-9">
                  Childcare Support needed in Brooklyn Bridge.
                </div>
                <div className="justify-start items-start gap-2 inline-flex">
                  <div className="w-fit px-3 py-1 bg-white rounded-xl border border-[#616161] justify-start items-center gap-4 flex">
                    <div className="opacity-90 justify-start items-center gap-1 flex text-[#616161] text-sm font-semibold font-bricolage leading-tight">
                      Childcare
                    </div>
                  </div>
                  <div className="w-fit px-3 py-1 bg-white rounded-xl border border-[#616161] justify-start items-center gap-4 flex">
                    <div className="opacity-90 justify-start items-center gap-1 flex text-[#616161] text-sm font-semibold font-bricolage leading-tight">
                      Counseling and Support
                    </div>
                  </div>
                </div>
                <div className="self-stretch text-[#616161] text-[15px] font-normal font-inter leading-normal">
                  Location: 123 Plaza, New York
                  <br />
                  How to find: She is around 5’3 tall, with blonde long hair and
                  tattoos on her arm.
                </div>
                <div className="self-stretch">
                  <span className="text-[#616161] text-[15px] font-normal font-inter leading-normal">
                    Lucy is 26 years old with a 2 year old daughter seeking for
                    childcare support and general counseling.
                  </span>
                  <a className="text-[#6840E0] text-[15px] font-normal font-inter underline leading-normal cursor-pointer">
                    Show details
                  </a>
                </div>

                <div className="text-[#616161] text-xs font-semibold font-inter leading-[18px]">
                  Posted 30 mins ago by user K
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="p-4 lg:p-8 gap-16 bg-white border-y border-[#C8C8C8] justify-end">
            <div className="flex gap-x-2 md:gap-x-4 lg:gap-x-8">
              <div className="w-fit h-fit flex-col justify-start items-start gap-[15px] inline-flex">
                <div className="w-fit h-8 px-2 py-1 bg-[#D4FFEC] rounded-lg justify-start items-start gap-2 inline-flex">
                  <div className="w-6 h-6 relative">
                    <img src={help_received}></img>
                  </div>
                  <div className="text-center text-[#004905] text-lg font-semibold font-bricolage leading-normal">
                    Help Received
                  </div>
                </div>
                <div className="self-stretch text-[#273164] text-[28px] font-medium font-bricolage leading-9">
                  Childcare Support needed in Brooklyn Bridge.
                </div>
                <div className="justify-start items-start gap-2 inline-flex">
                  <div className="w-fit px-3 py-1 bg-white rounded-xl border border-[#616161] justify-start items-center gap-4 flex">
                    <div className="opacity-90 justify-start items-center gap-1 flex text-[#616161] text-sm font-semibold font-bricolage leading-tight">
                      Childcare
                    </div>
                  </div>
                  <div className="w-fit px-3 py-1 bg-white rounded-xl border border-[#616161] justify-start items-center gap-4 flex">
                    <div className="opacity-90 justify-start items-center gap-1 flex text-[#616161] text-sm font-semibold font-bricolage leading-tight">
                      Counseling and Support
                    </div>
                  </div>
                </div>
                <div className="self-stretch text-[#616161] text-[15px] font-normal font-inter leading-normal">
                  Location: 123 Plaza, New York
                  <br />
                  How to find: She is around 5’3 tall, with blonde long hair and
                  tattoos on her arm.
                </div>
                <div className="self-stretch">
                  <span className="text-[#616161] text-[15px] font-normal font-inter leading-normal">
                    Lucy is 26 years old with a 2 year old daughter seeking for
                    childcare support and general counseling.
                  </span>
                  <a className="text-[#6840E0] text-[15px] font-normal font-inter underline leading-normal cursor-pointer">
                    Show details
                  </a>
                </div>

                <div className="text-[#616161] text-xs font-semibold font-inter leading-[18px]">
                  Posted 30 mins ago by user K
                </div>
              </div>
            </div>
          </div>
        </div>

        {showLoadBtn ? (
          <button
            className="w-fit rounded-[100px] border border-[#C8C8C8] flex-col justify-center items-center gap-2 flex text-center text-[#1F0A58] hover:bg-[#1F0A58] hover:text-white text-[11px] font-semibold font-inter leading-tight self-stretch px-6 py-2.5"
            onClick={() => {
              setShowLoadBtn(false);
            }}
          >
            Load 5 More
          </button>
        ) : (
          <button
            className="w-fit rounded-[100px] border border-[#C8C8C8] flex-col justify-center items-center gap-2 flex text-center text-[#1F0A58] hover:bg-[#1F0A58] hover:text-white text-[11px] font-semibold font-inter leading-tight self-stretch px-6 py-2.5"
            onClick={() => {
              setShowLoadBtn(true);
            }}
          >
            Hide
          </button>
        )}
        {/* <button
          className="w-fit rounded-[100px] border border-[#C8C8C8] flex-col justify-center items-center gap-2 flex text-center text-[#1F0A58] hover:bg-[#1F0A58] hover:text-white text-[11px] font-semibold font-inter leading-tight self-stretch px-6 py-2.5"
          onClick={() => {}}
        >
          Load 5 More
        </button> */}
      </div>
    </div>
  );
};

export default HelpRequest;
