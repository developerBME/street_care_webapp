import React from "react";
import OutreachEventCard from "./OutreachEventCard";
import arrowDown from "../../images/arrowDown.png";
import arrowRight from "../../images/arrowRight.png";

const CommunityOutreachEvent = () => {
  return (
    <div>
      <div className="w-full flex justify-between rounded-t-xl items-center space-x-2 bg-gradient-to-br from-purple-300 to-zinc-200 p-4 lg:px-28 lg:py-12">
        <div className="inline-flex items-center">
          <p className="font-medium text-[12px] lg:text-3xl text-[#212121] font-bricolage">
            Upcoming events in
          </p>
          <div className="relative inline-block ">
            <select className="appearance-none py-1 px-3 pr-8 text-[#181818] text-[12px] lg:text-3xl font-bricolage border-b border-[#181818] bg-transparent ">
              <option value="location1">New York, USA</option>
              <option value="location2">Location 2</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#181818] gap-4">
              <img src={arrowDown} />
            </div>
          </div>
        </div>

        <div className="inline-flex cursor-pointer gap-3 items-center">
          <div className="font-medium text-[8px] lg:text-[13px] font-bricolage">View all</div>
          <img src={arrowRight} className="w-2 h-2 lg:w-4 lg:h-4 " />
        </div>
      </div>
      <div className="p-6 lg:px-28 lg:py-12 space-y-9"> {/* Changed the padding here*/}
        <div className="inline-flex gap-4">
          <div className="font-medium text-[15px] lg:text-[28px] text-[#1F0A58] font-bricolage">
            Upcoming Outreach Events
          </div>
          <button className=" text-[8px] lg:text-[12px] text-white bg-[#6840E0] px-4 py-1 lg:px-6 lg:py-2.5 rounded-full">
            Create an Outreach
          </button>
        </div>
        <div className="w-full inline-flex flex-col items-center sm:inline-flex sm:flex-row sm:space-x-4">
            <OutreachEventCard />
            <OutreachEventCard />
            <OutreachEventCard />
        </div>

      </div>
    </div>
  );
};

export default CommunityOutreachEvent;
