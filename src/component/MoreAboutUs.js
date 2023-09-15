import React from "react";
import pic1 from "../images/pic1.png";
import pic2 from "../images/pic2.png";

function MoreAboutUs() {
  return (
    <div className=" justify-center px-4 py-8 lg:p-32 h-full w-full rounded-2xl bg-[#F7F7F7] flex flex-col">
      <div className="mb-4 md:mb-8">
        <p className=" font-bricolage font-medium text-2xl md:text-4xl text-[#1F0A58]">
          Fueled by 100% volunteer passion, Growing with 264 dedicated hearts.
        </p>
        <p className="font-bricolage font-medium text-2xl md:text-4xl text-[#1F0A58]">
          Empowered by community support
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="relative mb-4 md:mb-0 flex-1">
          <img src={pic1} alt="pic1" className="w-full h-auto" />
          <div className="bg-[#F2F6D8] rounded-b-[30px] p-2 md:p-4 flex flex-col items-center">
            <p className="text-open-sans text-sm md:text-base">
              NY Attorney General
            </p>
            <p className="text-bricolage text-md md:text-xl mt-2">
              Letitia James
            </p>
          </div>
        </div>
        <div className="relative mb-4 md:mb-0 flex-1">
          <img src={pic2} alt="pic2" className="w-full h-auto" />
          <div className="bg-[#F2F6D8] rounded-b-[30px] p-2 md:p-4 flex flex-col items-center">
            <p className="text-open-sans text-sm md:text-base">NYC Mayor</p>
            <p className="text-bricolage text-md md:text-xl mt-2">Eric Adams</p>
          </div>
        </div>
        <div className="flex-1 grow-[2]">
          <div className="bg-[#F2F6D8] rounded-[30px] p-2 md:p-4 mt-4 md:mt-0 h-full flex flex-col justify-center">
            <div className="mb-4 md:mb-8">
              <p className="text-lg md:text-2xl font-bricolage text-center">
                “A Saturday of service at Street Care’s Day of Outreach to
                Homeless Families and Individuals [on behalf of
                GivingTuesdayMilitary] gave this military spouse a big helping
                of much-needed perspective!”
              </p>
            </div>
            <p className="text-bricolage text-md md:text-xl text-center">
              — Hope Guinn Bradley, Volunteer
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 md:mt-8 flex justify-center">
        <button className="bg-[#5F36D6] hover:bg-blue-700 text-white font-bold py-2 px-4 md:py-2 md:px-4 rounded-full sm:mx-auto sm:w-[186px] md:w-[186px]">
          More About Us
        </button>
      </div>
    </div>
  );
}

export default MoreAboutUs;
