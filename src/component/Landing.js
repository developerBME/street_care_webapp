import React from "react";
import one from "../images/one.png";
import two from "../images/two.png";
import three from "../images/three.png";

function Landing() {
  return (
    <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] grid grid-cols-1 lg:grid-cols-2 gap-2">
      <div className="  ">
        <p className="font-bricolage font-medium text-4xl md:text-[44px] md:leading-[48px]  text-black ">
          {" "}
          Support the homeless.{" "}
          <p className="font-bricolage font-medium text-4xl md:text-[44px] md:leading-[48px] text-black ">
            Prepare care packages.
          </p>
        </p>
        <p className="font-bricolage font-medium text-4xl md:text-[44px] md:leading-[48px] text-black ">
          Join outreach.{" "}
          <p className="font-bricolage font-medium text-4xl md:text-[44px] md:leading-[48px] text-black ">
            Make a difference.
          </p>
        </p>

        <button class=" bg-violet-700 text-base text-white font-normal py-3 px-6 mt-12 mb-6 lg:mb-0 rounded-full">

          Browse Outreach Events
        </button>
      </div>
      <div className=" grid grid-cols-1 gap-y-4">
        <div className=" grid grid-cols-5 gap-x-4">
          <img src={one} className=" rounded-2xl h-full w-fit col-span-2"></img>
          <img src={two} className=" rounded-2xl w-fit col-span-3"></img>
        </div>

        <div className="  col-span-2 ">
          <img src={three} className="rounded-2xl"></img>
        </div>
      </div>
    </div>
  );
}

export default Landing;
