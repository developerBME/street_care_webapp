import React from "react";
import FAQs from "./FAQs";

function Home() {
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed ">
      <div className="relative flex flex-col items-center ">
        <div className="  container mt-40 rounded-2xl bg-white w-full h-[819px] pt-40 text-black"></div>
        <div className="  container mt-8 rounded-2xl bg-white w-full h-[819px] pt-40 text-black"></div>

        {/* Vishnu */}
        <div className="  container mt-8 rounded-2xl bg-white w-full h-[819px] pt-40 text-black"></div>
        <div className="  container mt-8 rounded-2xl bg-white w-full h-[819px] pt-40 text-black"></div>
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
