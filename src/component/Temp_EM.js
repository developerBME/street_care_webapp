import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckEmailBlock = ({ emailForDisplay }) => {
    const navigate = useNavigate();

    return (
        <div className="flex-col justify-start items-start gap-8 inline-flex" >
            <div className="text-neutral-800 text-6xl font-medium font-bricolage leading-10">
                Check your email
            </div>
            <div className="lg:w-[67%] flex-col justify-start items-start gap-6 flex">
                <div className="w-fit">
                    <span className="text-black text-base font-normal font-['DM Sans'] leading-normal tracking-wide">
                        Follow the instructions sent to
                    </span>
                    <span className="text-black text-base font-bold font-['DM Sans'] leading-normal">
                        {" "}
                        {emailForDisplay}{" "}
                    </span>
                    <span className="text-black text-base font-normal font-['DM Sans'] leading-normal tracking-wide">
                        to reset your password. If it doesn't arrive, be sure to check your
                        spam folder.
                    </span>
                </div>
            </div>

            <div
                className="justify-start items-start gap-2 inline-flex cursor-pointer"
                onClick={() => {
                    navigate("/Login");
                }}
            >
                <div className="w-6 h-6 relative origin-top-left">
                    <svg>                                                                   
                        <path
                            d="M12 20L13.41 18.59L7.83 13H20V11H7.83L13.41 5.41L12 4L4 12L12 20Z"
                            fill="#6840E0"
                        />
                    </svg>
                </div>
                <div className="text-violet-600 text-base font-bold font-['DM Sans'] leading-normal">
                    Back to login
                </div>
            </div>
        </div>
    );
};

const Temp_EM = () => {
    const [emailForDisplay] = useState("trialmail@gmail.com");

    return (
        <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to  -[#EAEEB5] to-90% bg-fixed">
            <div className="relative flex flex-col items-center ">
                <div className="w-[95%] md:w-[90%] lg:w-[75%] mx-2 mt-36 mb-20 rounded-2xl bg-white text-black ">
                    <div className="justify-center items-center inline-flex p-8 lg:py-20 lg:px-32 h-full w-full rounded-2xl bg-[#F7F7F7]">
                        <CheckEmailBlock emailForDisplay={emailForDisplay} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Temp_EM;