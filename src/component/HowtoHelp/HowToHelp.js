import React, { useRef, useEffect } from "react";
import CustomButton from "../Buttons/CustomButton";
import howtohelp from "../../images/howtohelp.png"

import CarePackage from "./CarePackage";

function HowToHelp() {
  const howToHelp = useRef();
  useEffect(() => {
    document.title = "How to help - Street Care";
  }, []);
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black ">
          {/*  */}
          <div className="items-center justify-center p-8 lg:p-16 h-full w-full rounded-2xl bg-[#F7F7F7] ">
            <div className="flex-col justify-start items-start gap-10 inline-flex">
              <div className="w-fit text-neutral-800 text-[57px] font-medium font-bricolage leading-[64px]">
                Make a Difference,
                <br />
                <span className="text-[#6840E0]">
                  Your Support Transforms Lives
                </span>
              </div>
              <div className="w-fit text-zinc-600 text-lg font-normal font-open-sans leading-normal">
                Getting involved in addressing homelessness brings positive
                change to individuals, communities, and society. By joining the
                cause, you contribute to meaningful impact and personal
                fulfillment.
              </div>
              <div className="flex w-full ">
                <div className="bg-gradient-to-br from-[#D3F2CE] to-[#E7E7E7] p-8 w-full rounded-l-2xl">
                  <span className="font-dmsans text-[45px]">650k+</span>
                  <br />
                  <span className="font-dmsans text-[12px]">
                    Total homeless population in United States
                  </span>
                </div>
                <div className="bg-gradient-to-br from-[#D3C3FF] to-[#DEDCE4] p-8 w-full rounded-r-2xl">
                  <span className="font-dmsans text-[45px]">24%</span>
                  <br />
                  <span className="font-dmsans text-[12px]">
                    Homeless due to health conditions
                  </span>
                </div>
              </div>
              <div className="w-full">
                <img src={howtohelp} className="w-full"/>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
        <div
          ref={howToHelp}
          className=" w-[95%] md:w-[90%] lg:w-[75%] mx-2 lg:mx-40 mt-8 rounded-2xl text-black scroll-m-16  "
        >
          {" "}
          <CarePackage />
          {/* Remove this component and create a new one for your code  */}
        </div>
        <div className="  w-[95%] md:w-[90%] lg:w-[75%] mx-2 lg:mx-40 mt-8 mb-20 rounded-2xl bg-white text-black ">
          {/* section 2 */}
          {/* <div className="items-center justify-center p-8 lg:py-24 lg:px-36 h-full w-full rounded-2xl bg-[#F7F7F7] ">
            <div className="text-neutral-800 text-2xl font-medium font-bricolage leading-loose">
              Next...
            </div>
            <div className="w-fit my-16  text-gray-800 text-[57px] font-medium font-bricolage leading-[64px]">
              "I Learned, Now I'll Share."
            </div>
            <CustomButton
              label="Send the guide to a friend"
              name="buttondefault"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default HowToHelp;
