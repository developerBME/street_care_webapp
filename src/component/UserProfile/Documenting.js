import React from "react";
import { useRef, useState } from "react";
// import Rating from "@mui/material/Rating";
import { IoIosArrowBack } from "react-icons/io";
// import { AiOutlineStar, AiTwotoneStar, AiFillStar } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../Buttons/CustomButton";

const starStyle = {
  width: 60,
  height: 60,
};

function Documenting() {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const navigate = useNavigate();

  const [value, setValue] = useState(0);
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className="flex flex-col w-[95%] md:w-[90%] lg:w-[80%] mx-2 xl:mx-40 mt-32 rounded-2xl text-black">
          {/* <div className=" w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-32 mb-16 rounded-2xl bg-[#f7f7f7] text-black "> */}
          <div>
            <Link to="/profile">
              <div className="flex items-center pl-3 xl:pl-40 cursor-pointer pb-[19px] gap-1">
                
                <IoIosArrowBack className=" w-6 h-6" />
                <p className="font-semibold font-bricolage text-[22px]">
                  Return to Profile
                </p>
              </div>
            </Link>
          </div>
          <div className="max-w-6xl mx-auto rounded-2xl mb-32 xl:mx-40 bg-[#F8F9F0] p-4 lg:pt-[100px] lg:pb-[100px] lg:pr-[150px] lg:pl-[150px] md:pt-[80px] md:pb-[80px] md:pr-[120px] md:pl-[120px] pt-[40px] pb-[40px] pr-[40px] pl-[40px]">
            {/* <div className="w-full h-full px-4 py-6 lg:px-12 lg:py-16 xl:p-16 bg-[#f7f7f7] rounded-[32px] flex-col justify-start items-start gap-6 inline-flex"> */}
            <div className="flex-col justify-start items-start gap-16 flex">
              <div className="w-fit text-neutral-800 lg:text-[57px] md:text-4xl text-3xl font-medium font-bricolage lg:leading-[64px] md:leading-[56px] leading-[48px]">
                Are you documenting this log for a Personal Outreach?
              </div>
              <div className="flex sm:flex-row flex-col sm:gap-4 gap-2">
                <CustomButton
                  label="Yes"
                  name="buttondefault"
                  onClick={() => {
                    navigate("/profile/visitlogform");
                  }}
                />
                <CustomButton
                  label="No, this is for a Community Outreach"
                  name="buttonborder"
                  onClick={() => {
                    navigate("/profile/visitlogform");
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Old design */}
        {/* <div className=" w-fit md:w-[930px] mx-2    mt-48 mb-16 rounded-2xl bg-[#F8F9F0] text-black">
          <div className="items-center justify-center  h-full w-full mx-auto rounded-2xl ">
          
            <div
              className=" absolute flex mt-[-50px] items-center cursor-pointer"
              onClick={() => {
                navigate("/profile");
              }}
            >
              <IoIosArrowBack className=" w-6 h-6" />{" "}
              <span className=" font-bricolage text-xl font-bold leading-7">
                Return to Profile
              </span>
            </div>
            
            <div className="w-fit h-fit md:px-[150px] md:py-[100px] flex-col justify-start items-start gap-16 inline-flex">
              <div className="flex-col justify-start items-start gap-16 flex">
                <div className="w-fit text-neutral-800 text-[57px] font-medium font-bricolage leading-[64px]">
                  Are you documenting this log for a Personal Outreach?
                </div>
                <div className=" space-x-4">
                  <CustomButton
                    label="Yes"
                    name="buttondefault"
                    onClick={() => {
                      navigate("/profile/visitlogform");
                    }}
                  />

                  <CustomButton
                    label="No, this is for a Community Outreach"
                    name="buttonborder"
                    onClick={() => {
                      navigate("/profile/commoutform");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>  */}
      </div>
    </div>
  );
}

export default Documenting;
