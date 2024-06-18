import React, { forwardRef, useImperativeHandle } from "react";
import one from "../../images/one.png";
import two from "../../images/two.png";
import three from "../../images/three.png";
import CustomButton from "../Buttons/CustomButton";

const Landing = forwardRef(({ scorllFuntion }, ref) => {
  const handleOnClick = () => {
    // Do something in the child component
    scorllFuntion(); // Call the parent function
  };
  useImperativeHandle(ref, () => ({
    // Expose parent function to parent component
    callParentFunction: handleOnClick,
  }));
  return (
    <div className="items-center justify-center px-4 py-8 lg:px-12 lg:py-15 xl:p-16 h-full w-full rounded-3xl   gap-5 lg:gap-9 bg-[#F7F7F7] text-[#181818] xl:flex xl:flex-row">
      <div className="flex-col xl:w-2/3 xl:mt-2">
        <p className="font-dmsans font-medium text-4xl text-[#212121] lg:text-[57px] xl:text-[45px] lg:leading-[64px] lg:text-[#181818]">
          <span className="block lg:inline">
             Support the homeless people.   
           </span>{" "}
           <span className="block lg:inline">
             Prepare care packages.   
           </span>{" "}
           <span className="block lg:inline">
             Join outreach.   
           </span>{" "}
           <span className="block lg:inline">
             Make a difference.
           </span>
        </p>
        <div className="mt-10 mb-5 text-[#181818]">
           <CustomButton
             label="Join Community Outreach"
             name="buttonlight"
             onClick={handleOnClick}
          /></div>
      </div>
      <div className=" grid grid-row-2 gap-y-2 lg:gap-y-3 mt-9 xl:mt-0">
        <div className=" grid grid-cols-2 gap-x-2 lg:grid-cols-4 lg:gap-x-4 xl:grid-cols-5">
          <img src={one} className=" rounded-3xl h-36 w-fit col-span-1 lg:h-40 lg:col-span-1 lg:w-full xl:col-span-2"></img>
          <img src={two} className=" rounded-3xl h-36 w-fit col-span-1 lg:h-40 lg:col-span-3 lg:w-full xl:col-span-3"></img>
        </div>
        <div className=" ">
          <img src={three} className="rounded-3xl h-fit w-fit lg:h-52 lg:w-full"></img>
        </div>
      </div>
    </div>
  );
});

export default Landing;
