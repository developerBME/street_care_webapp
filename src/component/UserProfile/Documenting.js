import React from "react";
import { useRef, useState } from "react";

import Rating from "@mui/material/Rating";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { AiOutlineStar, AiTwotoneStar, AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const starStyle = {
  width: 60,
  height: 60,
};

function Documenting() {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const [value, setValue] = useState(0);
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-fit md:w-[930px] mx-2    mt-48 mb-16 rounded-2xl bg-[#F8F9F0] text-black ">
          <div className="items-center justify-center  h-full w-full mx-auto rounded-2xl ">
            {/*  */}
            <div className=" absolute flex mt-[-50px] items-center">
              <IoIosArrowBack className=" w-6 h-6" />{" "}
              <Link
                to={"/profile"}
                className=" font-bricolage text-xl font-bold leading-7"
              >
                Return to Profile
              </Link>
            </div>
            {/*  */}
            <div className="w-fit h-fit md:px-[150px] md:py-[100px] flex-col justify-start items-start gap-16 inline-flex">
              <div className="flex-col justify-start items-start gap-16 flex">
                <div className="w-fit text-neutral-800 text-[57px] font-medium font-bricolage leading-[64px]">
                  Are you documenting this log for a Personal Outreach?
                </div>
                <div className=" ">
                  <div className="w-fit h-14 px-8 py-4 bg-violet-700 rounded-[100px] justify-center items-center gap-2.5 inline-flex">
                    <Link
                      to={"/profile/personaloutform"}
                      className="text-center text-stone-100 text-lg font-semibold font-open-sans leading-normal"
                    >
                      Yes
                    </Link>
                  </div>
                  <div className="w-fit h-14 px-8 py-4 ml-4 bg-white rounded-[100px] border border-stone-300 justify-center items-center gap-2.5 inline-flex">
                    <Link
                      to={"/profile/commoutform"}
                      className="text-center text-slate-700 text-lg font-semibold font-open-sans leading-normal"
                    >
                      No, this is for a Community Outreach
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Documenting;
