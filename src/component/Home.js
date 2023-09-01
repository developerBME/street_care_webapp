import React from "react";
import Navbar from "./Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <div className=" relative bg-gradient-to-tr from-white to-yellow-100 h-auto flex flex-col  items-center">
        <div className="  container mt-40 rounded-2xl bg-white w-full h-[819px] pt-40 text-black"></div>
        <div className="  container mt-8 rounded-2xl bg-white w-full h-[819px] pt-40 text-black"></div>

        {/* Vishnu */}
        <div className="  container mt-8 rounded-2xl bg-white w-full h-[819px] pt-40 text-black"></div>
        <div className="  container mt-8 rounded-2xl bg-white w-full h-[819px] pt-40 text-black"></div>
        <div className="  container mt-8 rounded-2xl bg-white w-full h-[819px] pt-40 text-black"></div>
        {/* Aniket */}
        <div className="  container mt-8 rounded-2xl bg-white w-full h-[819px] pt-40 text-black"></div>
        <div className="  container mt-8 rounded-2xl bg-white w-full h-[819px] pt-40 text-black"></div>
        <div className="  container mt-8 rounded-2xl bg-white w-full h-[819px] pt-40 text-black"></div>
      </div>
    </div>
  );
}

export default Home;
