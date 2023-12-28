import React, { useRef, useEffect } from "react";
import CustomButton from "../Buttons/CustomButton";

import CarePackage from "./CarePackage";

function HowToHelp() {
  const howToHelp = useRef();
  useEffect(() => {
    document.title = "How to help - Street Care";
  }, []);
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-[95%] md:w-[90%] lg:w-[75%] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black ">
          {/*  */}
          <div className="items-center justify-center p-8 lg:py-24 lg:px-36 h-full w-full rounded-2xl bg-[#F7F7F7] ">
            <div className="flex-col justify-start items-start gap-6 inline-flex">
              <div className="w-fit text-neutral-800 text-[57px] font-medium font-bricolage leading-[64px]">
                How To Help
              </div>
              <div className="w-fit text-zinc-600 text-lg font-normal font-open-sans leading-normal">
                Remember that homeless people have diverse needs, and it is
                vital to tailor outreach efforts to their specific
                situations. <br />
                Building genuine connections and fostering trust is key to
                making a positive impact.
              </div>
              <div
                className=" cursor-pointer px-8 py-4 bg-white rounded-[100px] border border-stone-300 justify-center items-center gap-2.5 inline-flex text-center text-slate-700 text-lg font-semibold font-open-sans leading-normal"
                onClick={() =>
                  howToHelp.current.scrollIntoView({ behavior: "smooth" })
                }
              >
                How to prepare the Care Package? ↓
              </div>
              {/* <div className="px-8 py-4 bg-white rounded-[100px] border border-stone-300 justify-center items-center gap-2.5 inline-flex">
                <div className="text-center text-slate-700 text-lg font-semibold font-open-sans leading-normal">
                  How to prepare for the outreach? ↓
                </div>
              </div> */}
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
