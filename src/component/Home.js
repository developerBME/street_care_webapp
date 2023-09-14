import React from "react";
import FAQs from "./FAQs";
import Eventcard from "./Eventcard";
import BMEcard from "./BMEcard";
import Landing from "./Landing";
import Success from "./Success";
import News from "./News";
import Map from "./Map";
import Process from "./Process";
import ImageBox from "./ImageBox";
import QuoteBox from "./QuoteBox";

function Home() {
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-fit md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black ">
          {" "}
          <Landing />
        </div>
        <div className="  w-fit md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          <Success />
        </div>

        {/* Vishnu */}

        <div className="w-fit md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
          <div className="items-center justify-center px-4 py-8 lg:p-32 h-full w-full rounded-2xl bg-[#F7F7F7] ">
            <p className=" font-bricolage text-5xl text-[#1F0A58]">
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

    
        <div className="w-fit md:w-[78%] mx-2 mt-8 rounded-2xl bg-[#F7F7F7] text-black">
          <div className="items-center justify-center lg:p-12 h-full w-full rounded-2xl bg-[#F7F7F7] mt-12">
            <p className=" font-bricolage text-5xl text-[#1F0A58] p-4">
                {" "}
                BME Official Gathering
            </p>
            <div className="md:flex md:flex-row flex-col justify-center gap-4 p-4 space-y-4 md:space-y-0">
              <BMEcard />
              <BMEcard />
              <BMEcard />
            </div>
          </div>
        </div>
        {/* Aniket */}
        <div className="w-fit md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8  rounded-2xl bg-white text-black">
          <Process />
        </div>

        {/* Meet */}
        <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
          <div className="relative flex flex-col items-center">
            <div className="mx-2 lg:mx-40 mt-8 mb-16 rounded-2xl bg-white text-black p-8 font-bricolage">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
                Fueled by 100% volunteer passion, Growing with 264 dedicated
                hearts.
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-8">
                Empowered by community support
              </p>
              <div className="flex flex-col lg:flex-row items-start justify-center w-full mx-2 lg:mx-0 mt-8 mb-8 rounded-2xl bg-white text-black">
                <div className="flex flex-row"></div>
                <div className="flex flex-col items-center w-full lg:w-1/2 space-y-4">
                  {/* Image 1 and Image 2 with content box */}
                  <ImageBox />
                </div>
                <div className="flex flex-col items-center w-full lg:w-1/2 h-full">
                  <div className="h-full w-full">
                    <QuoteBox imageHeight="h-[500]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Aniket */}

        <div className="w-fit md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          <Map />
        </div>
        <div className="w-fit md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          <News />
        </div>
        <div className="w-fit md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 mb-8 rounded-2xl bg-white text-black ">
          <FAQs />
        </div>
      </div>
    </div>
  );
}

export default Home;
