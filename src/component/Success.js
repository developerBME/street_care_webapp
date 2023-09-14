import React from "react";

import Campaign from "../images/campaign.svg";

function Success() {
  return (
    <div className="items-center justify-center px-4 py-8 lg:p-32 h-full w-full rounded-2xl bg-[#F7F7F7] ">
      <p className=" font-bricolage text-4xl text-[#1F0A58]">
        {" "}
        Highlights of our success
      </p>
      <div className="w-fit h-fit my-9 p-7 bg-white rounded-[30px] justify-start items-start lg:gap-5 lg:inline-flex">
        <div className="w-20 h-20 p-4 bg-gradient-to-br from-yellow-100 to-neutral-200 rounded-3xl justify-start items-start gap-2.5 flex">
          <div className="w-12 h-12 relative">
            <img src={Campaign} className=""></img>
          </div>
        </div>

        <div className="grow  basis-0 flex-col justify-start items-start gap-8 inline-flex">
          <div className="self-stretch text-violet-800 text-[20px] font-bold leading-7">
            Great News!!
          </div>
          <div className="self-stretch">
            <span className="text-neutral-900 text-[24px] font-medium leading-10">
              We've recently achieved the 2023 Platinum Seal from{" "}
            </span>
            <span className="text-violet-600 text-[24px] font-medium leading-10">
              Candid
            </span>
            <span className="text-neutral-900 text-[24px] font-medium leading-10">
              ! This is our commitment to transparency and accountability in all
              we do.
            </span>
          </div>
          <div className="self-stretch">
            <span className="text-neutral-900 text-lg font-normal leading-normal">
              We are excited to share the work our nonprofit does through our{" "}
            </span>
            <span className="text-violet-600 text-lg font-normal underline leading-normal">
              Nonprofit Profile
            </span>
            <span className="text-neutral-900 text-lg font-normal leading-normal">
              .{" "}
            </span>
          </div>
        </div>
      </div>
      {/* Grid */}

      <div className="w-full h-fit justify-start items-start  grid grid-cols-1 lg:grid-cols-3 font-bricolage">
        {/*  */}
        <div className="grow rounded-t-2xl  lg:rounded-tr-none lg:rounded-l-2xl shrink basis-0 h-fit p-8 bg-gradient-to-br from-emerald-100 to-neutral-200 justify-start items-end gap-6 flex">
          <div className="flex-col justify-start items-start gap-6 inline-flex">
            <div className="text-violet-950 text-2xl font-medium leading-loose">
              We helped
            </div>
            <div className="px-6 py-2 bg-white rounded-[100px] inline-flex">
              <div className="text-violet-950 font-bricolage text-[48px] font-normal leading-[64px]">
                1031
              </div>
            </div>
          </div>
          <div className="w-fit text-violet-950 text-2xl font-medium py-2 inline-flex">
            homeless people
          </div>
        </div>
        {/*  */}
        <div className="grow shrink basis-0 h-fit p-8 bg-gradient-to-br from-purple-300 to-zinc-200 justify-start items-end gap-6 flex">
          <div className="flex-col justify-start items-start gap-6 inline-flex">
            <div className="text-violet-950 text-2xl font-medium leading-loose">
              Helped by{" "}
            </div>
            <div className="px-6 py-2 bg-white rounded-[100px] inline-flex">
              <div className="text-violet-950 font-bricolage text-[48px] font-normal leading-[64px]">
                264
              </div>
            </div>
          </div>
          <div className="w-fit text-violet-950 text-2xl font-medium py-2 ">
            volunteers
          </div>
        </div>
        {/*  */}
        <div className="grow rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none shrink basis-0 h-fit p-8 bg-gradient-to-br from-sky-200 to-neutral-200 justify-start items-end gap-6 flex">
          <div className="flex-col justify-start items-start gap-6 inline-flex">
            <div className="text-violet-950 text-2xl font-medium leading-loose">
              Donated
            </div>
            <div className="px-6 py-2 bg-white rounded-[100px] inline-flex">
              <div className="text-violet-950 font-bricolage text-[48px] font-normal leading-[64px]">
                11752{" "}
              </div>
            </div>
          </div>
          <div className="w-fit text-violet-950 text-2xl font-medium py-2">
            items
          </div>
        </div>
        {/*  */}
      </div>
      {/* grid over */}
    </div>
  );
}

export default Success;
