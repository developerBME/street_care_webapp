import React from "react";
import pic1 from "../../images/pic1.png";
import pic2 from "../../images/pic2.png";
import CustomButton from "../Buttons/CustomButton";

function MoreAboutUs2() {
  return (
    <div className=" justify-center px-4 py-8 lg:p-24  h-full w-full rounded-2xl bg-[#F7F7F7] flex flex-col">
      {/* <div className="font-dmsans font-medium  text-[#212121] text-2xl md:text-[30px] leading-8 md:leading-10 tracking-tight"> */}
      <div className="font-bricolage font-medium  text-[#1F0A58] text-2xl md:text-[30px] leading-8 md:leading-10 tracking-tight">
        <p>
          Fueled by 100% volunteer passion, Growing with 264 dedicated hearts.
        </p>
        <p>Empowered by community support</p>
      </div>
      <div className="flex gap-4 mt-8 flex-col md:flex-row items-center">
        {/* <div className="md:w-1/2 min-[320px]:max-md:w-full min-h-full place-self-stretch min[320px]:max-flex-col gap-2 flex">
          <div className="bg-[#F2F6D8] w-full min-h-full rounded-[30px] flex flex-col">
            <img src={pic1} alt="pic1" className="w-full shrink-0 " />
            <div className="p-6">
              <p className="font-opensans font-normal md:text-[14px] sm:text-xs ">
                NY Attorney General
              </p>
              <p className="font-bricolage font-medium md:text-[20px] sm:text-md mt-2">
                Letitia James
              </p>
            </div>
          </div>

          <div className="bg-[#F2F6D8] w-full min-h-full rounded-[30px] flex flex-col">
            <img src={pic2} alt="pic2" className="w-full shrink-0" />
            <div className="p-6">
              <p className="font-opensans font-normal md:text-[14px] sm:text-xs ">
                NYC Mayor
              </p>
              <p className="font-bricolage font-medium md:text-[20px] sm:text-md mt-2">
                Eric Adams
              </p>
            </div>
          </div>
        </div> */}
        <div className="md:w-1/2  flex place-self-stretch">
          <div className="bg-[#F2F6D8] w-full rounded-[30px] h-full flex flex-col justify-end pb-8">
            <div className="p-7 md:px-8">
              <p className=" font-bricolage font-medium leading-8 text-2xl md:text-[18px] self-stretch grow shrink basis-0 text-center text-[#212121] md:leading-7 ">
              “A Saturday of service at Street Care’s Day of Outreach to
                Homeless Families and Individuals [on behalf of
                GivingTuesdayMilitary] gave this military spouse a big helping
                of much-needed perspective!”
              </p>
            </div>
            <div className=" mt-6 md:mt-9">
              <p className="text-center text-[#212121] text-sm italic font-normal font-lato leading-normal ">
                — Hope Guinn Bradley, Volunteer
              </p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2  flex place-self-stretch">
          <div className="bg-[#F2F6D8] w-full rounded-[30px] h-full flex flex-col justify-end pb-8">
            <div className="p-7 md:px-8">
              <p className=" font-bricolage font-medium leading-8 text-2xl md:text-[18px] self-stretch grow shrink basis-0 text-center text-[#212121] md:leading-7 ">
                “A Saturday of service at Street Care’s Day of Outreach to
                Homeless Families and Individuals [on behalf of
                GivingTuesdayMilitary] gave this military spouse a big helping
                of much-needed perspective!”
              </p>
            </div>
            <div className=" mt-6 md:mt-9">
              <p className="text-center text-[#212121] text-sm italic font-normal font-lato leading-normal ">
                — Hope Guinn Bradley, Volunteer
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mt-2 md:mt-8 flex justify-center md:justify-start min-[320px]:pt-4 ">
        <CustomButton label="Learn More" name="buttondefault" />
      </div> */}
    </div>
  );
}

export default MoreAboutUs2;
