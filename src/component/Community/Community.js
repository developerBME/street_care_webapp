import React, { useEffect } from "react";
import Banner from "./Banner";
import CommunityOutreachEvent from "./CommunityOutreachEvent";
import CommunityVisitLog from "./CommunityVisitLog";

function Community({ loggedIn }) {
  useEffect(() => {
    document.title = "Community - Street Care";
  }, []);

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black mb-16">
          <Banner />
        </div>

        <div className="w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-8 mb-8 rounded-2xl bg-white text-black">
        <CommunityOutreachEvent loggedIn={loggedIn} />
        </div>

        <div className="w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-8 mb-8 rounded-2xl bg-white text-black">
          <CommunityVisitLog loggedIn={loggedIn}/>
        </div>
      </div>
    </div>
  );
}

export default Community;
