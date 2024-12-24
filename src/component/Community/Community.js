import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import HelpRequest from "./HelpRequest";
import CommunityOutreachEvent from "./CommunityOutreachEvent";
import CommunityVisitLog from "./CommunityVisitLog";
import CommunityOutreachEventsPast from "./CommunityOutreachEventsPast";


function Community({ loggedIn, setLoggedIn }) {
  const [activeTab, setActiveTab] = useState("outreach");
  const [helpRequests, setHelpRequests] = useState([]);

  useEffect(() => {
    document.title = "Community - Street Care";
  }, []);

  // Function to update help requests (you might fetch this data or update it based on user actions)
  const updateHelpRequests = (newRequests) => {
    setHelpRequests(newRequests);
  };

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black mb-16">
          <Banner  updateHelpRequests={updateHelpRequests}/>
        </div>

        <div className="w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-8 mb-8 rounded-2xl bg-white text-black">
        <CommunityOutreachEvent loggedIn={loggedIn} />
        </div>


        {/* <div className="w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-8 mb-8 rounded-2xl bg-white text-black">
          <CommunityOutreachEventsPast />
        </div> */}

        { <div className="w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-8 mb-8 rounded-2xl bg-white text-black">
          <CommunityVisitLog />
        </div> }

        {/* <div className="w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 mb-8 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
          <HelpRequest updateHelpRequests={updateHelpRequests} />
        </div> */}

        <div className="w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-8 mb-8 rounded-2xl bg-white text-black">
          <CommunityVisitLog loggedIn={loggedIn}/>
        </div>

        <div className="w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 mb-8 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
          <HelpRequest loggedIn={loggedIn}/>
        </div>

      </div>
    </div>
  );
}

export default Community;
