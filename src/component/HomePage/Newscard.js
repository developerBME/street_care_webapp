import React, { useState } from "react";
import CustomButton from "../Buttons/CustomButton";
import News from "../HomePage/News";


const Newscard = ({NewsCardData}) => {
    
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-4 lg:mx-40 mt-32 rounded-2xl bg-white text-black ">
          {" "}
          <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] ">
            
            <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          {/*<News />*/}

          <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
            <p className="font-dmsans font-medium md:text-[30px] text-[25px] lg:text-[45px] text-[#212121]">
              News
            </p>
            <div className=" grid grid-cols-1 gap-x-8 gap-y-8 mt-6 sm:pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {NewsCardData.map((NewsData) => (
                <News key={NewsData.id} NewsCardData={NewsData} />
              ))}
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newscard;
