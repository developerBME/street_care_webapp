import React from "react";
import pic1 from "../images/pic1.png";
import pic2 from "../images/pic2.png";

function MoreAboutUs() {
    return (
        <div className=" justify-center px-4 py-8 lg:p-28  h-full w-full rounded-2xl bg-[#F7F7F7] flex flex-col">
            <div className="font-bricolage  font-medium  text-[#212121] font-[500] lg:text-[20px] md:text-[16px] min-[320px]:text-[24px] leading-tight">
                <p >
                    Fueled by 100% volunteer passion, Growing with 264 dedicated hearts.
                </p>
                <p>
                    Empowered by community support
                </p>
            </div>
            <div className="flex gap-4 mt-4 flex-col md:flex-row items-center">
                <div className="md:w-1/2 min-[320px]:max-md:w-full min-h-full place-self-stretch min[320px]:max-flex-col gap-2 flex">
                        <div className="bg-[#F2F6D8] w-full min-h-full rounded-[30px] flex flex-col">
                        <img src={pic1} alt="pic1" className="w-full shrink-0 " />
                            <div className="p-4">
                            <p className="font-open-sans sm:text-xs ">NY Attorney General</p>
                            <p className="font-bricolage sm:text-md mt-2">Letitia James</p>
                            </div>
                        </div>
                    
                       
                        <div className="bg-[#F2F6D8] w-full min-h-full rounded-[30px] flex flex-col">
                        <img src={pic2} alt="pic2" className="w-full shrink-0" />
                        <div className="p-4">
                            <p className="font-open-sans sm:text-sm ">NYC Mayor</p>
                            <p className="font-bricolage sm:text-md mt-2">Eric Adams</p>
                        </div>
                        </div>

                </div>
                <div className="md:w-1/2 min-[320px]:max-md:w-full flex place-self-stretch">
                    <div className="bg-[#F2F6D8] w-full rounded-[30px] h-full flex flex-col justify-center">
                        <div className="p-4 md:p-4 md:pb-0">
                            <p className="text-sm lg:text-[16px] font-bricolage text-center mt-1 lg:max-pt-4 lg:text-xs md:mt-4  ">
                                “A Saturday of service at Street Care’s Day of Outreach to
                                Homeless Families and Individuals [on behalf of
                                GivingTuesdayMilitary] gave this military spouse a big helping
                                of much-needed perspective!”
                            </p>
                        
                        <p className="font-bricolage text-sm  lg:text-xs md:text-xs font-thin text-center lg:pt-10 md:pt-12 lg:pb-2" >
                            — Hope Guinn Bradley, Volunteer
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="mt-2 md:mt-4 flex justify-center md:justify-start ">
                    <button className="bg-[#5F36D6] hover:bg-blue-700 text-white font-bold rounded-full py-2 px-4 text-sm md:text-xs md:w-[122px]">
                        More About Us
                    </button>
                </div>
            </div>
            );
}

            export default MoreAboutUs;
