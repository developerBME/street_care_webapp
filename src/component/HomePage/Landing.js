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
    <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl  grid grid-cols-1 lg:grid-cols-2 gap-3 bg-[#F7F7F7]">
      <div className="  ">
        <p className="font-bricolage font-medium text-4xl md:text-[42px] md:leading-[48px]  text-black ">
          {" "}
          Support homeless people.{" "}
          <p className="font-bricolage font-medium text-4xl md:text-[42px] md:leading-[48px] text-black ">
            Prepare care packages.
          </p>
        </p>
        <p className="font-bricolage font-medium text-4xl md:text-[42px] md:leading-[48px] text-black ">
          Join outreach.{" "}
          <p className="font-bricolage font-medium text-4xl md:text-[42px] md:leading-[48px] text-black ">
            Make a difference.
          </p>
        </p>
        <div className="mt-12 mb-6 lg:mb-0">
          <CustomButton
            label="Browse Outreach Events"
            name="buttondefault"
            onClick={handleOnClick}
          />
        </div>
      </div>
      <div className=" grid grid-cols-1 gap-y-4">
        <div className=" grid grid-cols-5 gap-x-4">
          <img src={one} className=" rounded-2xl h-full w-fit col-span-2"></img>
          <img src={two} className=" rounded-2xl w-fit col-span-3"></img>
        </div>

        <div className="  col-span-2 ">
          <img src={three} className="rounded-2xl"></img>
        </div>
      </div>
    </div>
  );
});

export default Landing;
