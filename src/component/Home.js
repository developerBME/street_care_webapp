import React from "react";
import FAQs from "./FAQs";
import Eventcard from "./Eventcard";
import BMEcard from "./BMEcard";
import Landing from "./Landing";
import Success from "./Success";
import News from "./News";
import Map from "./Map";
import Process from "./Process";
import MoreAboutUs from "./MoreAboutUs";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque&display=swap');
</style>;

function Home() {
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" sm:w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black ">
          {" "}
          <Landing />
        </div>
        <div className="  sm:w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          <Success />
        </div>

        {/* Vishnu */}

        <div className="sm:w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
          <div className="items-center justify-center px-4 py-8 lg:p-32 h-full w-full rounded-2xl bg-[#F7F7F7] ">
            <p className=" font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
              {" "}
              Upcoming outreach events
            </p>
            <div className=" w-full h-fit grid grid-cols-1 lg:grid-cols-3 pt-9 gap-5">
              <Eventcard />
              <Eventcard />
              <Eventcard />
            </div>
          </div>
        </div>

        <div className="sm:w-[95%] md:w-[90%] lg:w-[80%] mx-2 mt-8 rounded-2xl bg-[#F7F7F7] text-black">
          <div className="items-center justify-center px-4 py-8 lg:p-32 h-full w-full rounded-2xl bg-[#F7F7F7]">
            <p className=" font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58] ">
              {" "}
              BME Official Gathering
            </p>
            <div className="md:flex md:flex-row flex-col justify-center gap-4 pt-9 space-y-4 md:space-y-0">
              <BMEcard />
              <BMEcard />
              <BMEcard />
            </div>
          </div>
        </div>
        {/* Aniket */}
        <div className="sm:w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8  rounded-2xl bg-white text-black ">
          <Process />
        </div>

        {/* Meet */}
        <div className="sm:w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 mb-8 rounded-2xl bg-white text-black">
          <MoreAboutUs />
        </div>
        {/* Aniket */}

        <div className="sm:w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          <Map />
        </div>
        <div className="sm:w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          <News />
        </div>
        <div className="sm:w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 mb-16 rounded-2xl bg-white text-black ">
          <FAQs />
        </div>
      </div>
    </div>
  );
}

export default Home;
