import React from "react";
import CustomButton from "./Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import Banner from "./Community/Banner";

function CommunityComingSoon() {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div class="relative flex flex-col items-center">
        <div className=" w-[95%] md:w-[90%] lg:w-[50%] mx-2 lg:mx-40 mt-32 mb-4 px-[8px] py-6 lg:px-24 lg:pb-[55px] lg:pt-[40px] md:px-[25px] md:py-[25px] rounded-2xl bg-white text-black text-center">
          <h1 className="font-sans font-medium lg:text-[44px] sm:text-[38px] text-[36px] mb-4">Upcoming Features:</h1>
          <ul className="text-left text-lg px-4 md:px-0 mb-8 inline-table">
            <li className="list-disc">You can create Help Request</li>
            <li className="list-disc">You can create Outreach</li>
            <li className="list-disc">You can provide help</li>
            <li className="list-disc">You can RSVP to any Outreach</li>
          </ul>
          <div className=" flex justify-center space-x-2">
            <CustomButton
              name="buttondefault"
              class="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2  rounded transition duration-150"
              label="Go back"
              onClick={() => {
                navigate(-1);
              }}
            ></CustomButton>

            <CustomButton
              name="buttondefault"
              class="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2  rounded transition duration-150"
              label="Home"
              onClick={() => {
                navigate("/");
              }}
            ></CustomButton>
          </div>
        </div>
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 mb-16 rounded-2xl bg-white text-black ">
          {" "}
          <Banner />
        </div>
      </div>
    </div>
  );
}

export default CommunityComingSoon;
