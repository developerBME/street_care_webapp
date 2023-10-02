import React from "react";

import Landing from "../HomePage/Landing";
import Success from "../HomePage/Success";
import OutreachEventCard from "./OutreachEventCard";
import arrowDown from "../../images/arrowDown.png";
import CommunityOutreachEvent from "./CommunityOutreachEvent";
import HelpRequest from "./HelpRequest";
import Banner from "./Banner";

function Community() {
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
        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          <CommunityOutreachEvent />
        </div>
        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          <Success />
          {/* Remove this component and create a new one for your code  */}
        </div>
        {/* Aniket */}
        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-8 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          <HelpRequest />
        </div>
      </div>
    </div>
  );
}

export default Community;
