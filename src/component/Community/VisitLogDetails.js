import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import profilePic from "../../images/avatar.jpg";
import wavingHand from "../../images/waving_hand.png";
import { fetchVisitLogById } from "../VisitLogCardService"

const VisitLogDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const details = new URLSearchParams(location.search);
  const categories = details.getAll("categories");

  return (
    <div className="relative flex flex-col items-center ">
      <div className=" mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl bg-white text-black ">
        {/*  */}
        <div className="px-[150px] py-[100px]">
          <div className="space-y-[64px]">
            <div className="font-medium font-dmsans text-[45px] text-neutral-800 leading-[52px]">
              Visit Log Details
            </div>

            <div className="bg-[#F5EEFE] rounded-2xl ">
              <div className="inline-flex gap-2 items-center px-4 pt-6 py-2">
                <img src={profilePic} className="w-6 h-6 rounded-full" />
                <div>{details.get("name")}</div>
              </div>
              <div className="px-6 py-2">
                <div className="flex flex-col space-y-4">
                  <div class="text-violet-900 text-sm font-medium font-['DM Sans'] leading-tight">
                    {details.get("date")} {details.get("date")}
                  </div>
                  <div class="text-zinc-700 text-[10px] font-normal font-['DM Sans'] leading-snug">
                    {details.get("description")}
                  </div>
                  <div className="inline-flex items-center gap-2">
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className="py-1 px-3 border border-[#C8C8C8] w-fit rounded-xl text-[10px] text-[#444746]"
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                  <div className="inline-flex items-center bg-white px-4 py-1 space-x-2.5 rounded-2xl">
                    <img src={wavingHand} />
                    <div className="font-normal font-['Inter'] text-[10px] text-[#181818]">
                      {details.get("need")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-[32px]">
              <div className="text-neutral-800 text-[22px] font-bold font-['Bricolage Grotesque'] leading-7">Would you like to type a note you would like to share ?</div>
              <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
                <div className=" absolute w-fit bg-white ml-3 mt-[-5px]  px-1 justify-start items-center inline-flex">
                  <div className="text-zinc-700 text-xs font-normal font-roboto leading-none">
                    Notes
                  </div>
                </div>
                <div className="self-stretch h-fit  border-collapse     ">
                  <div className=" h-14  justify-center items-start ">
                    <input
                      type="notes"
                      id="notes"
                      placeholder="Anything"
                      className="text-zinc-900 w-full h-full pl-4 rounded-[4px] text-base  font-normal font-roboto leading-normal tracking-wide"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-x-[15px]">
              <button className="px-8 py-4 border rounded-full bg-violet-700 text-[#F8F9F0]">
                Share
              </button>
              <button
                className="px-8 py-4 border border-[#5F35D5] rounded-full text-violet-700"
                onClick={() => {
                  navigate("/");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitLogDetails;
