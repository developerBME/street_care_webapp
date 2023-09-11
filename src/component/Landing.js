import React from "react";
import one from "../images/one.png";
import two from "../images/two.png";
import three from "../images/three.png";

function Landing() {
  return (
    <div className="items-center justify-center px-4 py-8 lg:p-32 h-full w-full rounded-2xl bg-[#F7F7F7] grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="  ">
        <p className="text-5xl font-bricolage font-medium">
          {" "}
          Support the homeless. Prepare care packages. Join outreach. Make a
          difference.
        </p>
        <button class="bg-[#36295e]  text-white font-bold py-4 px-8 mt-12 rounded-full">
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
