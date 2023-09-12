import React from "react";
import FAQs from "./FAQs";

import Eventcard from "./Eventcard";
import BMEcard from "./BMEcard";
import Landing from "./Landing";
import Success from "./Success";
import News from "./News";
import Map from "./Map";
import Process from "./Process";


function Home() {
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed ">
      <div className="relative flex flex-col items-center ">
        <div className=" w-fit mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black ">
          {" "}
          <Landing />
        </div>
        <div className="  w-fit mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          <Success />
        </div>

        {/* Vishnu */}
        <div className="w-fit mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
          <div className="items-center justify-center px-4 py-8 lg:p-32 h-full w-full rounded-2xl bg-[#F7F7F7] ">
            <p className=" font-bricolage text-5xl text-[#1F0A58]">
              {" "}
              Upcoming outreach events
            </p>
            <div className=" md:flex md:flex-row flex-col pt-9 justify-between ">
              <Eventcard />
              <Eventcard />
              <Eventcard />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="container mt-8 rounded-2xl bg-white w-full h-auto md:h-[819px] pt-20 text-black">
          <h1 className="text-2xl font-semibold mb-4 pl-8">
            BME Official Gathering
          </h1>
          <div className="container md:flex md:flex-row flex-col gap-4 p-6 space-y-4 md:space-y-0">
            <BMEcard />
            <BMEcard />
            <BMEcard />
          </div>
        </div>
        <div className="  container mt-8 rounded-2xl bg-white w-full h-[300px] text-black">
          <Process />
        </div>


        {/* Meet  */}
        <div className="  container mt-8 rounded-2xl bg-white w-full h-[819px] pt-40 text-black"></div>

        {/* Aniket */}

        <div className="  container mt-8 rounded-2xl bg-white w-full h-[750px] text-black">
          <Map />
        </div>
        <div className="  container mt-8 rounded-2xl bg-white w-full h-[550px] text-black">
          <News />
        </div>

        <div className="  container mt-8 rounded-2xl bg-white w-full h-fit mb-12 text-black">
          <FAQs />
        </div>
      </div>
    </div>
  );
}

export default Home;
