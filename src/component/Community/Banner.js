import "../../App.css";
import React, { useState, useEffect } from "react";
import banner from "../../images/community_banner.png";
import one from "../../images/community_bg1.png";
import two from "../../images/community_bg3.png";

function Spinner() {
  return (
    <div className="spinner"></div>
  );
}

function Metrics() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-white rounded-3xl lg:text-[18px] md:text-[18px] text-[12px] relative z-[9] md:mx-24 -bottom-16">
      <style>
        {`
          .spinner {
            margin: 0 auto;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-top-color: #3498db;
            animation: spin 1s infinite linear;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div className="flex flex-wrap h-fit">
        {/* Column 1 */}
        <div className="w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 lg:px-[28px] lg:p-[20px] md:p-[18px] p-[18px] lg:text-left md:text-center sm:text-center text-center">
          {/* Column content */}
          <p className="font-bold text-violet-800 lg:mb-[24px] md:mb-[10px] sm:mb-[15px] text-center">
            We Helped
          </p>
          <p className="text-center">
            <span className="text-xl font-bold lg:text-[38px] md:text-[28px] sm:text-[38px] lg:inline-block md:block block sm:mb-[10px]">
              1000+
            </span>{" "}
          </p>
          <p className="text-[#1F0A58] text-center">homeless people</p>
        </div>

        {/* Column 2 */}
        <div className="w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 lg:px-[28px] lg:py-[20px] md:p-[18px] p-[18px] relative border-[#F2F2F2] lg:text-left md:text-center sm:text-center text-center before:content-[''] before:absolute before:border-[1px] before:border-[#F2F2F2] before:border-solid before:top-[30%] before:left-0 lg:before:h-[60px] md:before:h-[60px] before:h-[40px] after:content-[''] after:absolute after:border-[1px] after:border-[#F2F2F2] after:border-solid after:top-[30%] after:right-0 lg:after:h-[60px] md:after:h-[60px] after:h-[40px]">
          {/* Column content */}
          <p className="font-bold text-violet-800 lg:mb-[24px] md:mb-[10px] sm:mb-[15px] text-center">
            Helped By
          </p>
          <p className="text-center">
            <span className="text-xl font-bold lg:text-[38px] md:text-[28px] sm:text-[38px] lg:inline-block md:block block sm:mb-[10px]">
              400+
            </span>{" "}
          </p>
          <p className="text-[#1F0A58] text-center">volunteers</p>
        </div>

        {/* Column 3 */}
        <div className="w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 lg:px-[28px] lg:py-[20px] md:p-[18px] p-[18px] relative border-[#F2F2F2] lg:text-left md:text-center sm:text-center text-center after:content-[''] after:absolute after:border-[#F2F2F2] after:border-solid after:top-[30%] after:right-0 lg:after:h-[60px] md:after:h-[60px] after:h-[40px]">
          {/* Column content */}
          <p className="font-bold text-violet-800 lg:mb-[24px] md:mb-[10px] sm:mb-[15px] text-center">
            Donated
          </p>
          <p className="text-center">
            <span className="text-xl mt-auto font-bold lg:text-[38px] md:text-[28px] sm:text-[38px] lg:inline-block md:block block sm:mb-[10px]">
              11,752
            </span>{" "}
          </p>
          <p className="text-[#1F0A58] text-center">items</p>
        </div>
      </div>
    </div>
  );
}

function Banner() {
  return (
    <div className="items-center justify-center h-full w-full rounded-2xl bg-pattern sm:bg-[url('images/community_bg2.png')] bg-[url('images/community_bg4.png')] sm:bg-[left_bottom_-200px] bg-[left_bottom_0] sm:bg-[left_bottom_-100px] bg-no-repeat relative">
      <div className="absolute bottom-0 right-0 z-[9]">
        <img src={one} alt="" className="hidden sm:block rounded-br-2xl" />
        <img src={two} alt="" className="block sm:hidden rounded-br-2xl" />
      </div>
      <div className="px-[8px] pt-6 lg:px-24 lg:pt-[15px] md:px-[25px] md:pt-[15px] bg-[right_bottom_-150px] bg-no-repeat relative">
        <div className="lg:items-start md:items-center justify-center h-full w-full grid md:grid-cols-4 lg:grid-cols-5 gap-2">
          <div className="lg:col-span-2 md:col-span-2 lg:mt-[30px]">
            <p className="font-sans font-medium lg:text-[44px] sm:text-[38px] text-[36px] text-[#6840E0]">
              Community
            </p>
            <p className="text-[#181818] lg:text-[24px] leading-8">
              Participate in our outreaches to help those in need to become our
              superhero!
            </p>
            <p className="text-[#181818] lg:text-[24px] leading-8 mt-4 pr-5">
              Or, know someone in need? Create a help request for others to
              help.
            </p>
          </div>
          <div className="lg:col-span-3 md:col-span-2 z-10">
            <img
              src={banner}
              alt=""
              className=" h-full lg:max-w-[120%] lg:w-[120%] lg:mt-0 md:mt-[30px] mt-[0px] lg:-ml-[50px] md:w-fit mx-auto"
            ></img>
          </div>
        </div>
      </div>
      <Metrics  />
    </div>
  );
}

export default Banner;