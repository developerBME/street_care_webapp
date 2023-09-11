import React from "react";
import FAQs from "./FAQs";
import Eventcard from "./Eventcard";
import BMEcard from "./BMEcard";
import Landing from "./Landing";
import Success from "./Success";

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
        <div className="container mt-8 rounded-2xl bg-white w-full pt-20 text-black">
          <h1 className="text-2xl font-semibold mb-4 pl-8">
            Upcoming Outreach Events
          </h1>
          <div className="container md:flex md:flex-row flex-col p-6 justify-between space-y-4 md:space-y-0">
            <Eventcard />
            <Eventcard />
            <Eventcard />
          </div>
        </div>
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
        <div className="  container mt-8 rounded-2xl bg-white w-full h-[819px] pt-40 text-black"></div>

        {/* Meet  */}
        <div className="  container mt-8 rounded-2xl bg-white w-full h-[819px] pt-40 text-black"></div>

        {/* Aniket */}
        <div className="  container mt-8 rounded-2xl bg-white w-full h-[750px] text-black"></div>
        <div className="  container mt-8 rounded-2xl bg-white w-full h-[550px] text-black"></div>
        <div className="  container mt-8 rounded-2xl bg-white w-full h-fit mb-12 text-black">
          <FAQs />
        </div>
      </div>
    </div>
  );
}

export default Home;
