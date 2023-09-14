import React from "react";
import FAQs from "./FAQs";

import Eventcard from "./Eventcard";

import BMEcard from "./BMEcard";
import Landing from "./Landing";
import Success from "./Success";
import News from "./News";
import Map from "./Map";
import Process from "./Process";
import pic1 from "../images/pic1.png";
import pic2 from "../images/pic2.png";

function Home() {
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
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
            <div className=" grid grid-cols-1 lg:grid-cols-3 pt-9 gap-5 ">
              <Eventcard />
              <Eventcard />
              <Eventcard />
            </div>
          </div>
        </div>
      

        

        <div className="w-fit md:w-[78%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-[#F7F7F7] text-black">
        <div className="items-center justify-center px-4 py-8 lg:p-12 h-full w-full rounded-2xl bg-[#F7F7F7] mt-12">
        <p className=" font-bricolage text-5xl text-[#1F0A58] pl-28 md:pl-8">
            {" "}
            BME Official Gathering
          </p>
          <div className="md:flex md:flex-row flex-col justify-center gap-4 p-8 space-y-4 md:space-y-0">
            <BMEcard />
            <BMEcard />
            <BMEcard />
          </div>
        </div>
        </div>
        {/* <div className="  container mt-8 rounded-2xl bg-white w-full h-[300px] text-black">
          <Process />
        </div> */}
        <div className="  w-fit mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          <Process />
        </div>

        {/* Meet */}
        <div className="container mt-8 rounded-2xl bg-white w-full h-[819px] pt-20 text-black relative">
          <div className="flex justify-start items-start h-full px-12 py-6 space-x-2">
            <div className="text-left">
              <p className="font-bricolage text-3xl font-normal mb-2 text-on-surface">
                Fueled by 100% volunteer passion, Growing with 264 dedicated
                hearts.
              </p>
              <p className="font-bricolage text-3xl font-normal mb-8 text-on-surface">
                Empowered by community support
              </p>
              <div className="flex justify-between items-start">
                {/* Container for Image 1 and Content Box */}
                <div className="flex flex-col items-center">
                  <div style={{ padding: "16px" }}>
                    <img src={pic1} alt="Pic 1" />

                    <div className="p-4 bg-[#F2F6D8] rounded-b-[30px] text-center">
                      <p className="text-lg font-open-sans">
                        NY Attorney General
                      </p>
                      <p className="text-xl font-bricolage">Letitia James</p>
                    </div>

                    <div style={{ padding: "36px" }}>
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "12px 24px",
                          background: "#5F36D6",
                          border: "none",
                          borderRadius: "30px",
                          cursor: "pointer",
                        }}
                      >
                        <span className="text-white font-bricolage text-lg">
                          More About Us
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Container for Image 2 and Content Box */}
                <div className="flex flex-col items-center">
                  <div style={{ padding: "16px" }}>
                    <img src={pic2} alt="Pic 2" />

                    <div className="p-4 bg-[#F2F6D8] rounded-b-[30px] text-center">
                      <p className="text-lg font-open-sans">NYC Mayor</p>
                      <p className="text-xl font-bricolage">Eric Adams</p>
                    </div>
                  </div>
                </div>

                {/* New Quote Box */}
                <div className="flex flex-col items-center mt-8">
                  <div className="p-4 bg-[#F2F6D8] rounded-[30px] text-center max-w-[400px]">
                    <div className="p-16 pt-6">
                      {" "}
                      {/* Added pt-4 */}
                      <p className="text-lg font-bricolage mb-4">
                        “A Saturday of service at Street Care’s Day of Outreach
                        to Homeless Families and Individuals [on behalf of
                        GivingTuesdayMilitary] gave this military spouse a big
                        helping of much-needed perspective!”
                      </p>
                      <p className="mb-2 text-base font-lato">
                        {" "}
                        {/* Added space and author's name */}— Hope Guinn
                        Bradley, Volunteer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Aniket */}

        {/* <div className="  container mt-8 rounded-2xl bg-white w-full h-[750px] text-black">
          <Map />
        </div>
        <div className="  container mt-8 rounded-2xl bg-white w-full h-[550px] text-black">
          <News />
        </div>
        <div className="  container mt-8 rounded-2xl bg-white w-full h-fit mb-12 text-black">
          <FAQs />
        </div> */}

        <div className="  w-fit mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          <Map />
        </div>
        <div className="  w-fit mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          <News />
        </div>
        <div className="  w-fit mx-2 lg:mx-40 mt-8 mb-8 rounded-2xl bg-white text-black ">
          <FAQs />
        </div>
      </div>
    </div>
  );
}

export default Home;
