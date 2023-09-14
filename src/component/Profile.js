import React from "react";

import Landing from "./Landing";
import Success from "./Success";

function Profile() {
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        {/* Aniket */}
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black ">
          <Landing />{" "}
          {/* Remove this component and create a new one for your code  */}
        </div>

        {/* Vishnu and Meet */}
        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black mb-10">
          <Success />{" "}
          {/* Remove this component and create a new one for your code  */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
