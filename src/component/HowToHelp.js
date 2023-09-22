import React from "react";

function HowToHelp() {
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
                Remember that homeless individuals have diverse needs, so it's
                important to tailor your outreach efforts to their specific
                situations. <br />
                Building genuine connections and fostering trust is key to
                making a positive impact.
              </div>
              <div className="px-8 py-4 bg-white rounded-[100px] border border-stone-300 justify-center items-center gap-2.5 inline-flex">
                <div className="text-center text-slate-700 text-lg font-semibold font-open-sans leading-normal">
                  How to prepare the Care Package? ↓
                </div>
              </div>
              <div className="px-8 py-4 bg-white rounded-[100px] border border-stone-300 justify-center items-center gap-2.5 inline-flex">
                <div className="text-center text-slate-700 text-lg font-semibold font-open-sans leading-normal">
                  How to prepare for the outreach? ↓
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
        <div className="  w-[95%] md:w-[90%] lg:w-[75%] mx-2 lg:mx-40 mt-8 mb-20 rounded-2xl bg-white text-black ">
          {/* section 2 */}
          <div className="items-center justify-center p-8 lg:py-24 lg:px-36 h-full w-full rounded-2xl bg-[#F7F7F7] ">
            <div className="text-neutral-800 text-2xl font-medium font-bricolage leading-loose">
              Next...
            </div>
            <div className="w-fit my-16  text-gray-800 text-[57px] font-medium font-bricolage leading-[64px]">
              "I Learned, Now I'll Share."
            </div>
            <button className="px-8 py-4 bg-violet-700 rounded-[100px] justify-center items-center gap-2.5 inline-flex ">
              <div className="text-center text-neutral-100 text-lg font-semibold font-open-sans leading-normal">
                Send the guide to a friend
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowToHelp;
