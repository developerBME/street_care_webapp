import React from "react";
import verifiedImg from "../images/verified.png";
import userImg from "../images/avatar.jpg";
import wavingHand from "../images/waving_hand.png";

const Eventcard = () => {
  return (

    <div className=" w-fit mx-auto bg-[#DEF6EB] rounded-3xl p-7 font-inter">
      <div class="flex items-center gap-2">
        <img class="w-9 h-9 rounded-full" src={userImg} alt="User Avatar" />
        <div class="text-black text-xs font-normal">William Smith</div>
        <div class="bg-emerald-100 rounded-lg border border-stone-300 flex items-center px-2 py-1 gap-1">
          <img class="w-5 h-5" src={verifiedImg} alt="Verified" />

          <div class="text-zinc-700 text-xs  font-semibold leading-tight ">
            Certified Lead
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="text-neutral-800 text-xl font-medium leading-normal font-bricolage">
          BK Fort Green Outreach
        </div>
        <div className="text-zinc-700  text-[17px] font-semibold leading-normal">
          Sept 9, 2023 SAT 12:00pm
        </div>
        <div className=" w-fit my-5 px-2 py-4 pr-8 bg-white rounded-2xl flex items-center gap-2.5">
          <img src={wavingHand} alt="Waving Hand" />
          <div className="text-neutral-900  text-sm font-normal leading-snug">
            Childcare specialist needed
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          <div className="text-zinc-700 text-[15px] md:text-[14px] font-normal">
            200 Eastern Pkwy, Brooklyn, NY 11238
          </div>
          <div className="text-zinc-700 text-[15px] md:text-[14px] font-normal">

            Open Spots: 8/20
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div className="pt-3 flex items-center gap-2.5">
          <button className=" border-2 border-[#1F0A58] text-[#1F0A58] py-2 px-4 rounded-full text-base ">

            Join
          </button>
        </div>
      </div>
    </div>
  );
};
export default Eventcard;
