import React, { useState, useEffect } from "react";
import Landing from "../HomePage/Landing";
import Success from "../HomePage/Success";
import OutreachEventCard from "./OutreachEventCard";
import arrowDown from "../../images/arrowDown.png";
import CommunityOutreachEvent from "./CommunityOutreachEvent";
import HelpRequest from "./HelpRequest";
import Banner from "./Banner";
import CommunityVisitLog from "./CommunityVisitLog";

function Community() {
  const [activeTab, setActiveTab] = useState("outreach");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    document.title = "Community - Street Care";
  }, []);

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        {/* Shivani */}
        <div className=" w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black mb-16">
          <Banner />
          {/* Remove this component and create a new one for your code  */}
        </div>
        {/* Vishnu */}
        {/* <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl">
          <div
            className={`h-[63px] inline-flex w-full rounded-2xl ${
              activeTab === "outreach" ? "bg-violet-50" : "bg-[#E2FAFF]"
            }`}
          >
            <button
              className={`${
                activeTab === "outreach"
                  ? "bg-[#1F0A58] text-white"
                  : "bg-[#E2FAFF] text-[#005363]"
              } text-xl font-medium px-4 py-2 w-1/2 rounded-2xl `}
              onClick={() => handleTabClick("outreach")}
            >
              Outreach
            </button>
            <button
              className={`${
                activeTab === "helpRequest"
                  ? "bg-[#005363] text-[#E2FAFF] rounded-2xl"
                  : "bg-violet-50 text-violet-950 rounded-r-2xl "
              } text-xl font-medium px-4 py-2 w-1/2 `}
              onClick={() => handleTabClick("helpRequest")}
            >
              Help Request
            </button>
          </div>
        </div> */}
        {/* <div className="block sm:hidden">
          {activeTab === "outreach" ? (
            <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
              <CommunityOutreachEvent />
            </div>
          ) : (
            <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-8 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
              <HelpRequest />
            </div>
          )}
          </div>*/}
        {/* {activeTab === "outreach" ? (
          <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 mb-8 rounded-2xl bg-white text-black">
            <CommunityOutreachEvent />
          </div>
        ) : (
          <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-8 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
            <HelpRequest />
          </div>
        )} */}

        {/* <div className="w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 mb-8 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
          <HelpRequest />
        </div> */}

        <div className="w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-8 mb-8 rounded-2xl bg-white text-black">
          <CommunityOutreachEvent />
        </div>

        <div className="w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-8 mb-8 rounded-2xl bg-white text-black">
          <CommunityVisitLog />
        </div>

        {/* <div className="w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 mb-8 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
          <HelpRequest />
        </div> */}

        {/*<div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black hidden md:block">
          <CommunityOutreachEvent />
        </div>

        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-8 lg:mx-40 mt-8 rounded-2xl bg-white text-black hidden md:block">
          <HelpRequest />
        </div>*/}
      </div>
    </div>
  );
}

export default Community;
