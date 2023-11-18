import React, { useState, useEffect } from "react";
import News from "../HomePage/News";
import { NewsCardData } from "../../NewsData";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Newscard = () => {
  const navigate = useNavigate();
  const [newsevents, setnewsevents] = useState([]);

  useEffect(() => {
    const fetchnewsData = async () => {
      const eventsData = NewsCardData;
      setnewsevents(eventsData);
    };

    fetchnewsData();
  }, []);

  return (
    <div className="relative flex flex-col items-center ">
      <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl bg-white text-black ">
        {/*  */}
        <div
          className=" absolute flex mt-[-50px] items-center cursor-pointer "
          onClick={() => {
            navigate("/");
          }}
        >
          <IoIosArrowBack className=" w-6 h-6" />{" "}
          <p className=" font-bricolage text-xl font-bold leading-7">
            Return to Home
          </p>
        </div>
        {/*  */}

        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] ">
          <p className=" text-[25px] lg:text-[45px] font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
            {" "}
            Past Events
          </p>
          {/*<div className=" w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              <Eventcard />
              <Eventcard />
              <div className=" md:col-span-2 lg:col-span-1">
                <Eventcard />
              </div>
  </div> */}
          <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
            {newsevents.map((eventData) => (
              <News key={eventData.id} NewsCardData={eventData} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newscard;
