import React from "react";

import Landing from "../Landing";

function Community() {
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black ">
          {" "}
          {/* Remove this component and create a new one for your code  */}
          <Landing />
        </div>
      </div>
    </div>
  );
}

export default Community;
