import React, { useState, useEffect } from "react";
import OutreachVisitLogCard from "./Community/OutreachVisitLogCard";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import CustomButton from "./Buttons/CustomButton";


const AllOutreachVisitLog = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center ">
      <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl bg-white text-black ">
        {/*  */}
        <div
          className=" absolute flex mt-[-50px] items-center cursor-pointer "
          onClick={() => {
            navigate("/Community");
          }}
        >
          <IoIosArrowBack className=" w-6 h-6" />{" "}
          <p className=" font-bricolage text-xl font-bold leading-7">
            Return to Community
          </p>
        </div>

        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] ">
          <p className=" font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
            {" "}
            All Outreach Visit Logs
          </p>
          <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
            <OutreachVisitLogCard/>
            <OutreachVisitLogCard/>
            <OutreachVisitLogCard/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOutreachVisitLog;
