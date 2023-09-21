import React from "react";

const BMEcard = () => {
  return (
    <div className=" w-fit mx-auto bg-[#F5EEFE] rounded-3xl p-7 font-inter">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 md:w-9 relative ">
          <div className="w-8 h-8  left-0 top-0 bg-[#E5FF7F] rounded-full">
            <div className=" text-center p-1.5 text-black text-[7px] font-bold">
              Street Care
            </div>
          </div>
        </div>

        <div className="text-black lg:text-[12px] md:text-[10px]  font-normal">
          Street Care Official{" "}
        </div>
      </div>
      <div className="mt-6">
        <div className="text-neutral-800 text-xl font-medium leading-normal font-bricolage">
          Volunteer Meetup
        </div>
        <div className="text-zinc-700 my-4  text-[17px] font-semibold leading-normal">
          Sept 9, 2023 SAT 12:00pm
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
      <div className="mt-3">
        <div className="pt-3 flex items-center gap-2.5">
          <button className=" border-2 border-[#1F0A58] text-[#1F0A58] py-2 px-4 rounded-full text-base ">
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default BMEcard;
