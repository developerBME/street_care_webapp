import React from "react";
import { Link } from "react-router-dom";
import BME_Form from "./BME_Form";
import arrowBack from "../../images/arrowBack.png";

function CreateBME() {
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className="flex flex-col items-center justify-center w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40  mt-32 rounded-2xl text-black ">
          <div className="">
            <Link to="/profile">
                <div className="inline-flex pl-3 lg:pl-40 cursor-pointer pb-[19px]">
                <img src={arrowBack} />
                <p className="font-semibold font-bricolage text-[22px]">
                    Return to Profile
                </p>
                </div>
            </Link>
            <div className="max-w-6xl rounded-2xl mx-2 mb-32 lg:mx-40 bg-[#F8F9F0] p-4 lg:pt-[100px] lg:pb-[100px] lg:pr-[150px] lg:pl-[150px]">
                <BME_Form />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBME;
