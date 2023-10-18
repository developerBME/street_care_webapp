import React, { useState } from "react";

import Landing from "../HomePage/Landing";
import Success from "../HomePage/Success";
import OutreachEventCard from "./OutreachEventCard";
import arrowDown from "../../images/arrowDown.png";
import CommunityOutreachEvent from "./CommunityOutreachEvent";
import HelpRequest from "./HelpRequest";
import Banner from "./Banner";

function Community() {
  const [activeTab, setActiveTab] = useState("outreach");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        {/* Shivani */}
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black ">
          {" "}
          <Banner />
          {/* Remove this component and create a new one for your code  */}
        </div>

        {/* Vishnu */}
        <div className="block sm:hidden w-full p-4">
          <div
            className={`inline-flex w-full rounded-full ${
              activeTab === "outreach" ? "bg-violet-50" : "bg-[#E2FAFF]"
            }`}
          >
            <button
              className={`${
                activeTab === "outreach"
                  ? "bg-[#1F0A58] text-white"
                  : "bg-[#E2FAFF] text-[#005363]"
              } px-4 py-2 w-1/2 rounded-full `}
              onClick={() => handleTabClick("outreach")}
            >
              Outreach
            </button>
            <button
              className={`${
                activeTab === "helpRequest"
                  ? "bg-[#005363] text-[#E2FAFF] rounded-full"
                  : "bg-violet-50 text-violet-950 rounded-r-2xl "
              } px-4 py-2 w-1/2 `}
              onClick={() => handleTabClick("helpRequest")}
            >
              Help Request
            </button>
          </div>
        </div>
        <div className="block sm:hidden">
          {activeTab === "outreach" ? (
            <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
              <CommunityOutreachEvent />
            </div>
          ) : (
            <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-8 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
              <HelpRequest />
            </div>
          )}
        </div>

        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black hidden md:block">
          <CommunityOutreachEvent />
        </div>
        {/* Aniket */}
        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-8 lg:mx-40 mt-8 rounded-2xl bg-white text-black hidden md:block">
          <HelpRequest />
        </div>
      </div>
    </div>
  );
}

export default Community;
